import * as React from 'react';
import * as service from '../Service/service';
import * as helper from '../Service/helper';
import { UserContext } from '../Components/shared/context';
import CodeEditor from '../Components/InputComponents/CodeEditor';
import TextEditor from '../Components/InputComponents/TextEditor';
import DataForm from '../Components/InputComponents/DataForm';

const ProblemForm = () =>{

    const [user] = React.useContext(UserContext);
    const [notes, setNotes] = React.useState([]);
    const [solutions, setSolutions] = React.useState([]);
    const [editor, setEditor] = React.useState('code');


    function resetForm(){
        setNotes([]);
        setSolutions([]);
    }

    async function submitProblem(formData){
        if(!helper.validateFormData(formData)) return;

        const payload = {
            statement:formData.statement,
            link:formData.link,
            status:formData.status,
            difficulty:formData.difficulty,
            topics:formData.topics,
            description:formData.description
        }

        const addedProblem = await service.addProblemByUserId(user.userId, payload);
        if(addedProblem.success){
            if(notes.length > 0) await service.addNotesByProblemId(addedProblem.body.id, notes);
            if(solutions.length > 0) await service.addSolutionsByProblemId(addedProblem.body.id, solutions);
            helper.showSuccess('Problem added successfully!')
            resetForm();
        }

    }

    return(
        <div className='contentArea' id='problemForm'>
            <DataForm>
            <div className='problemHeader d-flex justify-content-between align-items-center mb-3'>
                <DataForm.LinkInput />
                <div className='d-flex gap-2 w-25 ms-3'>
                    <DataForm.SubmitButton  onSubmit={submitProblem}/>
                    <DataForm.ResetButton onReset={resetForm}/>
                </div>
            </div>
            <div className='problemBody d-flex align-items-start justify-content-start'>
                <div className='container-fluid problemInfo'>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <DataForm.StatementInput />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <DataForm.DescriptionInput />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <DataForm.DifficultyInput />
                        </div>
                        <div className="col">
                            <DataForm.StatusInput />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <DataForm.TopicInput />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataForm.TopicDisplay />
                        </div>
                    </div>
                </div>
                <div className='problemEditorWrapper w-50'>
                    <div>
                        <label 
                            className={('form-label fieldName editorLabel')+(editor==='code'?' activeEditorLabel':'')} 
                            htmlFor='solutionWrapper' 
                            onClick={()=>setEditor("code")}>
                                Solution
                        </label>
                        <label 
                            className={('form-label fieldName editorLabel')+(editor==='text'?' activeEditorLabel':'')} 
                            htmlFor='noteWrapper' 
                            onClick={()=>setEditor("text")}>
                                Notes
                        </label>
                    </div>
                    {
                        editor === 'code'?
                        <div className='problemEditor' id="solutionWrapper">
                            <CodeEditor solutions={solutions} setSolutions={setSolutions}/>
                        </div>
                        :
                        <div className='problemEditor' id="noteWrapper">
                            <TextEditor notes={notes} setNotes={setNotes}/>
                        </div>
                    }
                </div>
            </div>
            </DataForm>
        </div>
    )
}

export default ProblemForm;