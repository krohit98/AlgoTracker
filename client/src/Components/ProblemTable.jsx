import * as React from 'react';
import SolutionPopup from './SolutionPopup';
import * as service from '../Service/service';
import * as helper from '../Service/helper';
import ProblemStatus from './shared/ProblemStatus';
import DataTable from './InputComponents/DataTable';
import { ProblemContext } from './shared/context';

const ProblemTable = () => {

    const [popupContent, setPopupContent] = React.useState({})
    const [problems, setProblems] = React.useContext(ProblemContext);
    const [deleteProblemId, setDeleteProblemId] = React.useState(null);

    const flagProblem = (problem) => updateProblem(problem, 'flag');
    const markProblemAsSolved = (problem) => updateProblem(problem, 'markSolved');
    const markProblemAsUnsolved = (problem) => updateProblem(problem, 'markUnsolved');
    const markProblemForRevision = (problem) => updateProblem(problem, 'markRevise');
    const showDeleteProblemPopup = (problem) => setDeleteProblemId(problem.id);
    const hideDeleteProblemPopup = () => setDeleteProblemId(null);

    async function updateProblem(problem, action){
        const problemId = problem?.id || null;
        if(!problemId) return;
        let response = null;
        try{
            switch(action){
                case 'flag':
                    response = await service.flagProblemById(problem.id, {flagged:!(problem.flagged)})
                    break;
                case 'markSolved':
                    response = await service.updateProblemById(problemId, {status:ProblemStatus.SOLVED});
                    break;
                case 'markUnsolved':
                    response = await service.updateProblemById(problemId, {status:ProblemStatus.UNSOLVED});
                    break;
                case 'markRevise':
                    response = await service.updateProblemById(problemId, {status:ProblemStatus.REVISE});
                    break;
                default:
                    return;
            }
            if(response.success){
                const updatedProblems = problems.all.map(p => p.id === problem.id ? {...p, ...response.body} : p);
                setProblems({...problems, all:updatedProblems});
            }
        }catch(error){
            console.error(error);
        }
    }

    function navigateToProblem(link){
        window.open(link,'_target');
    }

    async function deleteProblem(){
        console.log(deleteProblemId)
        service.deleteProblemById(deleteProblemId)
        .then(response => {
            if(response.success){
                const updatedProblems = problems.all.filter(p => p.id !== deleteProblemId);
                setProblems({...problems, all:updatedProblems, display:updatedProblems});
                service.deleteNotesByProblemId(deleteProblemId);
                service.deleteSolutionsByProblemId(deleteProblemId);
                hideDeleteProblemPopup();
                helper.showSuccess("Problem deleted successfully!");
            }
        })
        .catch(error => {
            console.error(error);
            helper.showError("Failed to delete problem! Please try again later.");
        })
    }


    React.useEffect(()=>{
        let updatedProblem = problems.all.find(p => p.id === popupContent?.problem?.id) || null;
        if(updatedProblem) setPopupContent({...popupContent, problem:updatedProblem});
    }, [problems]);

    return(
        <>
            <DataTable id='problemTable'>
                <thead>
                    <tr>
                        <DataTable.StatementHeader />
                        <DataTable.DifficultyHeader />
                        <DataTable.StatusHeader />
                        <DataTable.ActionHeader /> 
                    </tr>
                </thead>
                <tbody>
                    {
                        problems.display.length > 0 ? problems.display?.map((problem)=>{
                            return(
                                <tr key={problem.id} className="problem">
                                    <DataTable.StatementData 
                                        statement={problem.statement} 
                                        problemId={problem.id} 
                                        link={problem.link}
                                        topics={problem.topics} 
                                        onClick={()=>navigateToProblem(problem.link)}
                                    />
                                    <DataTable.DifficultyData difficulty={problem.difficulty}/>
                                    <DataTable.StatusData status={problem.status}/>
                                    <DataTable.ActionData>
                                        {problem.status!==ProblemStatus.SOLVED && <DataTable.MarkSolvedAction onClick={()=>markProblemAsSolved(problem)}/>}
                                        {problem.status!==ProblemStatus.UNSOLVED && <DataTable.MarkUnsolvedAction onClick={()=>markProblemAsUnsolved(problem)}/>}
                                        {problem.status!==ProblemStatus.REVISE && <DataTable.MarkReviseAction onClick={()=>markProblemForRevision(problem)}/>}
                                        <DataTable.FlagAction onClick={()=>flagProblem(problem)} flagged={problem.flagged}/>
                                        <DataTable.ViewProblemAction onClick={()=>setPopupContent({problem, clicked:'Problem'})}/>
                                        <DataTable.NotesAction disabled={!problem.notes} onClick={()=>setPopupContent({problem, clicked:'Notes'})}/>
                                        <DataTable.SolutionAction disabled={!problem.solution} onClick={()=>setPopupContent({problem, clicked:'Solutions'})}/>
                                        <DataTable.DeleteAction onClick={()=>showDeleteProblemPopup(problem)}/>
                                    </DataTable.ActionData>
                                </tr>
                            )
                        })
                        :
                        <tr><td id="empty-table-placeholder" colSpan={5}>Add a new problem to view here.</td></tr>
                    }
                </tbody>
            </DataTable>
            <SolutionPopup data={{...popupContent}} setPopupClick={(clicked)=>setPopupContent({...popupContent, clicked})}/>
            <div id="delete-popup" className={'delete-popup-' + (deleteProblemId ? 'show' : 'hide')}>
                <div className='popup-modal'>
                    <p className='fw-bold'>This problem along with any related notes and solutions will be <span className='text-danger'>deleted</span>, are you sure?</p>
                    <div className='w-100 d-flex justify-content-center'>
                        <button className='btn btn-danger' onClick={deleteProblem}>Confirm</button>
                        <button className='btn btn-secondary ms-3' onClick={hideDeleteProblemPopup}>Cancel</button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default React.memo(ProblemTable);