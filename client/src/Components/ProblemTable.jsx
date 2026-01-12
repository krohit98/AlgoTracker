import * as React from 'react';
import SolutionPopup from './SolutionPopup';
import * as service from '../Service/service';
import ProblemStatus from './shared/ProblemStatus';
import DataTable from './InputComponents/DataTable';
import { ProblemContext } from './shared/context';

const ProblemTable = () => {

    const [popupContent, setPopupContent] = React.useState({})
    const [problems, setProblems] = React.useContext(ProblemContext);

    const flagProblem = (problem) => updateProblem(problem, 'flag');
    const markProblemAsSolved = (problem) => updateProblem(problem, 'markSolved');
    const markProblemAsUnsolved = (problem) => updateProblem(problem, 'markUnsolved');
    const markProblemForRevision = (problem) => updateProblem(problem, 'markRevise');

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
                                        <DataTable.DeleteAction />
                                    </DataTable.ActionData>
                                </tr>
                            )
                        })
                        :
                        <tr><td id="empty-table-placeholder" colSpan={5}>Add a new problem to view here.</td></tr>
                    }
                </tbody>
            </DataTable>
            <SolutionPopup data={{...popupContent}}/>
        </>
    )
}

export default React.memo(ProblemTable);