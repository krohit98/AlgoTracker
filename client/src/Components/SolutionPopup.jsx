import * as React from 'react';
import * as helper from '../Service/helper';
import TextEditor from './InputComponents/TextEditor';
import CodeEditor from './InputComponents/CodeEditor';
import ProblemEditor from './InputComponents/ProblemEditor';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';

const SolutionPopup = (props) => {
    const [content, setContent] = React.useState('');
    const [problem, setProblem] = React.useState({});
    const [selectedNote] = React.useState(0);
    const [selectedSolution] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);

    React.useEffect(()=>{
        setContent(props.data.clicked);
        setProblem(props.data.problem);
    },[props.data])

    React.useEffect(()=>setEditMode(false),[content])

    React.useEffect(() => {
        const modal = document.getElementById('solution-modal');
        if (!modal) return;

        const handleHidden = () => {
            console.log("Hidden")
            setContent('');
            setProblem({});
        };

        modal.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            modal.removeEventListener('hidden.bs.modal', handleHidden);
        };
    }, []);

    return(
        <div className='modal' id="solution-modal">
            <div className='modal-dialog modal-xl modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-body'>
                        <div className='modal-side-nav'>
                            <div className={content === "Problem" ? "modal-side-nav-active" : ""} onClick={() => setContent("Problem")}>Problem</div>
                            <div className={content === "Notes" ? "modal-side-nav-active" : ""} onClick={() => setContent("Notes")}>Notes</div>
                            <div className={content === "Solutions" ? "modal-side-nav-active" : ""} onClick={() => setContent("Solutions")}>Solution</div>
                        </div>
                        <div className='modal-main-area'>
                            <div className='modal-main-area-content'>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className='modal-date'>
                                        {content === 'Problem' && Object.keys(problem).length > 0 && 
                                        <>
                                            <small>Created: {helper.getFormatedLocaleDateTime(problem?.createdAt)}</small>
                                            &nbsp;|&nbsp;
                                            <small>Last Updated: {helper.getFormatedLocaleDateTime(problem?.updatedAt)}</small>
                                        </>
                                        }
                                        {content === 'Notes' && problem?.Notes?.length > 0 &&
                                        <>
                                            <small>Created: {helper.getFormatedLocaleDateTime(problem?.Notes?.[selectedNote]?.createdAt)}</small>
                                            &nbsp;|&nbsp;
                                            <small>Last Updated: {helper.getFormatedLocaleDateTime(problem?.Notes?.[selectedNote]?.updatedAt)}</small>
                                        </>
                                        }
                                        {content === 'Solutions' && problem?.Solutions?.length > 0 &&
                                        <>
                                            <small>Created: {helper.getFormatedLocaleDateTime(problem?.Solutions?.[selectedSolution]?.createdAt)}</small>
                                            &nbsp;|&nbsp;
                                            <small>Last Updated: {helper.getFormatedLocaleDateTime(problem?.Solutions?.[selectedSolution]?.updatedAt)}</small>
                                        </>
                                        }
                                    </span>
                                    {!editMode && <PencilSquare onClick={()=>setEditMode(true)} color="rgb(0, 110, 255)" size={20} className='iconbtn' title='Edit Mode'/>}
                                    {editMode && 
                                        <div>
                                            <small className='text-danger'>You are in edit-mode. Save your changes before proceeding!</small>
                                            <XSquare onClick={()=>setEditMode(false)} color="red" size={20} className='iconbtn ms-2' title='Cancel Edit'/>
                                        </div>
                                    }
                                </div>
                                <div className='modal-info'>
                                    {content === 'Problem' && <ProblemEditor problem={{...problem}} disabled={!editMode}/>}
                                    {content === 'Notes' && <TextEditor problemId={problem.id} notes={[problem?.Notes?.[selectedNote]]} disabled={!editMode} showUpdateButton={true}/>}
                                    {content === 'Solutions' && <CodeEditor problemId={problem.id} solutions={[problem?.Solutions?.[selectedSolution]]} disabled={!editMode}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <small id="popup-close-msg">Click anywhere outside popup to close.</small>
                </div>
            </div>
        </div>
    )
}

export default SolutionPopup;