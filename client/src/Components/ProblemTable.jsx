import * as React from 'react';
import SolutionPopup from './SolutionPopup';
import * as service from '../Service/service';
import * as helper from '../Service/helper';
import { CodeSlash, FileEarmarkText, Flag, Pencil, Trash } from 'react-bootstrap-icons';

const ProblemTable = (props) => {

    const [popupContent, setPopupContent] = React.useState('')

    function flagProblem(e, problem){
        service.flagProblemById(problem.id, !(problem.flagged))
    }

    function navigateToProblem(link){
        window.open(link,'_target');
    }

    return(
        <div id='problemTableWrapper'>
            <table id='problemTable' className='table table-sm align-middle bg-white text-center mb-0'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='w-50'>Statement</th>
                        <th>Difficulty</th>
                        <th>Status</th> 
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {props.problems.length > 0 ? props.problems?.map((problem,index)=>{
                    return(
                        <tr key={problem.id} className="problem">
                            <td className="platformIconWrapper"><img className="platformIcon" src={helper.getIcon(problem.link)} alt="platform icon"/></td>
                            <td className='w-50 problem-item' onClick={()=>navigateToProblem(problem.link)}>
                                <table className='w-100'>
                                    <tbody>
                                        <tr><td className='problemStatement'>{problem.statement}</td></tr>
                                        <tr><td className='problemTopics'>{problem.Topics.map(item=><div className='topicTab'>{item.topic}</div>)}</td></tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className={problem.difficulty}>{problem.difficulty}</td>
                            <td className={problem.status}>{problem.status}</td>
                            <td>
                                <div className='problemAction'>
                                    <Flag title="Flag" onClick={(e)=>{flagProblem(e, problem)}} color={"rgb(0, 110, 255)"}/>
                                    <FileEarmarkText 
                                        title="View Notes" 
                                        disabled={problem.notes?false:true} 
                                        onClick={()=>setPopupContent({Notes:problem.Notes, Solutions:problem.Solutions, Clicked:'Notes'})} 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#solution-modal" 
                                        color={"rgb(0, 110, 255)"}
                                    />
                                    <CodeSlash 
                                        title="View Solution" 
                                        disabled={problem.solution?false:true} 
                                        onClick={()=>setPopupContent({Notes:problem.Notes, Solutions:problem.Solutions, Clicked:'Solutions'})} 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#solution-modal" 
                                        color={"rgb(0, 110, 255)"}
                                    />
                                    <Pencil title="Edit" color={"rgb(0, 110, 255)"}/>
                                    <Trash title="Delete" color={"red"}/>
                                </div>
                            </td>
                        </tr>
                    )
                })
                :
                <tr><td id="empty-table-placeholder" colSpan={5}>Add a new problem to view here.</td></tr>
                }
                </tbody>
            </table>
            <SolutionPopup data={popupContent}/>
        </div>
    )
}

export default React.memo(ProblemTable);