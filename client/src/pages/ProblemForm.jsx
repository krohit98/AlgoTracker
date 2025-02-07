import * as React from 'react';
import * as service from '../Service/service';
import CheckboxDropdown from '../Components/InputComponents/CheckboxDropdown';
import MultiTextArea from '../Components/InputComponents/MultiTextArea';
import UserContext from '../Contexts/LoggedInUserContext';
import CodeEditor from '../Components/InputComponents/CodeEditor';
import TextEditor from '../Components/InputComponents/TextEditor';


const topics = require('../Data/topics.json');

const ProblemForm = () =>{

    const [user] = React.useContext(UserContext);
    const topicToBeAdded = React.useRef();

    const initialFormData = {
        topics:[],
        statement:'',
        link:'',
        difficulty:'',
        status:''
    }

    const [formData, setFormData] = React.useState(initialFormData);
    const [notes, setNotes] = React.useState([]);
    const [solutions, setSolutions] = React.useState([]);
    const [resetKey, setResetKey] = React.useState(crypto.randomUUID())

    function changeHandler(e, fieldName){
        let value = e.currentTarget.value;
        setFormData({...formData, [fieldName]:value});
    }

    function setTopic(){
        setFormData({...formData, topics:[...formData.topics, topicToBeAdded.current.value]})
        topicToBeAdded.current.value = "";
    }

    function unselectTopic(index){
        let topicList = [...formData.topics]
        topicList.splice(index,1);
        setFormData({...formData, topics:[...topicList]})
    }

    const addNotes = React.useCallback((notesData)=>{
        console.log("inside Notes", notesData)
        let notes = notesData?.map(note => {return {title:note.title, content:note.data}}).filter(note => note.content!=="");
        setNotes(notes)
    },[])

    const addSolutions = React.useCallback((solutionsData)=>{
        console.log("inside Solutions", solutionsData)
        let solutions = solutionsData?.map(solution => {return {title:solution.title, code:solution.data}}).filter(solution => solution.code!=="");
        setSolutions(solutions)
    },[])

    function resetForm(){
        setFormData(initialFormData);
        setNotes([]);
        setSolutions([]);
        setResetKey(crypto.randomUUID());
    }

    async function submitProblem(){
        let payload = {
            statement:formData.statement,
            link:formData.link,
            status:formData.status,
            difficulty:formData.difficulty
        }

        let addedProblem = await service.addProblemByUserId(user.userId, payload);
        if(addedProblem.success){
            await service.addTopicsByProblemId(addedProblem.body.id, formData.topics);
            if(notes.length > 0) await service.addNotesByProblemId(addedProblem.body.id, notes);
            if(solutions.length > 0) await service.addSolutionsByProblemId(addedProblem.body.id, solutions);
            alert('Problem added successfully!')
            resetForm();
        }
    }

    React.useEffect(()=>{
        console.log(formData.topics)
    },[formData.topics])

    return(
        <form className='container-fluid contentArea'>
            <div className='row'>
            <div className='col-12'>
                    <label className='form-label fieldName' htmlFor="">Problem Link<span className='req'>*</span></label>
                    <input className='form-control mb-3' type="text" value={formData.link} onChange={(e)=>changeHandler(e, 'link')}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <label className='form-label fieldName' htmlFor="">Problem Statement</label>
                    <input className='form-control mb-3' type="text" value={formData.statement} onChange={(e)=>changeHandler(e, 'statement')}/>
                </div>
                <div className="col">
                    <label className='form-label fieldName' htmlFor="">Difficulty</label>
                    <select className='form-control mb-3' value={formData.difficulty} onChange={(e)=>changeHandler(e, 'difficulty')}>
                        <option value="" hidden selected>Select</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className="col">
                    <label className='form-label fieldName' htmlFor="">Status</label>
                    <select className='form-control mb-3' value={formData.status} onChange={(e)=>changeHandler(e, 'status')}>
                        <option value="" hidden selected>Select</option>
                        <option value="Solved">Solved</option>
                        <option value="Revise">Revise</option>
                        <option value="Unsolved">Unsolved</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label htmlFor="" className="form-label fieldName">Topic</label>
                    {/* <CheckboxDropdown optionList={topics} returnSelectedData={setTopic} resetKey={resetKey}/> */}
                    <div className='groupedInput  mb-3'>
                        <input className='form-control' type="text" list="topics" ref={topicToBeAdded}/>
                        <button type="button" onClick={setTopic}>Add</button>
                    </div>
                    <datalist id="topics">
                        {topics.map(topic => <option value={topic}/>)}
                    </datalist>
                </div>
                <div className="col-9" id="selectedTopics">
                    {formData.topics.map((topic,index) => <div className='topicTab' onClick={()=>unselectTopic(index)}>{topic}<span>&#x2717;</span></div>)}
                </div>
            </div>
            <div className='row editor-row'>
                <div className='col'>
                    <label className='form-label fieldName' htmlFor="">Note</label>
                    {/* <MultiTextArea textAreaTitle="Note" getData={addNotes} resetKey={resetKey}/> */}
                    <TextEditor />
                </div>
                <div className='col'>
                    <label className='form-label fieldName' htmlFor="">Solution</label>
                    {/* <MultiTextArea textAreaTitle="Solution" getData={addSolutions} resetKey={resetKey}/> */}
                    <CodeEditor />
                </div>
            </div>
            <div className="row justify-content-between mt-2">
                <div className="col-2 text-center">
                    <button type="button" className='btn btn-primary w-100' onClick={submitProblem}>Submit</button>
                </div>
                <div className="col-2 text-center">
                    <button type="button" className='btn btn-danger w-100'b onClick={resetForm}>Reset</button>
                </div>
            </div>
        </form>
    )
}

export default ProblemForm;