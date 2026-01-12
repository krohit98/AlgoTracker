import * as React from 'react';
import ProblemStatus from '../shared/ProblemStatus';
import ProblemDifficulty from '../shared/ProblemDifficulty';
import { DataFormContext } from '../shared/context';
import useDataForm from '../../Hooks/useDataForm';

const Topics = require('../../Data/topics.json');

const initialState = {
    link: '',
    statement: '',
    description: '',
    difficulty: '',
    status: ProblemStatus.UNSOLVED,
    topics: []
};

const DataForm = (props) => {
    const [formData, setFormData] = React.useState(initialState);
    const [contextValue, setContextValue] = React.useState({});

    const handleChange = React.useCallback((e, fieldName) => {
        let value = e.currentTarget.value;
        setFormData({...formData, [fieldName]:value});
    },[formData]);

    React.useEffect(()=>{
        if(props.formData && Object.keys(props.formData).length > 0) setFormData({...props.formData});
    }, [props.formData]);

    React.useEffect(()=>{
        setContextValue({
            formData,
            setFormData,
            handleChange
        });
    }, [formData, handleChange]);
    
    return (
        <DataFormContext.Provider value={contextValue}>
            <div id="dataFormWrapper">
                {props.children}
            </div>
        </DataFormContext.Provider>
    );
};

const LinkInput = (props) => {
    const {formData, handleChange} = useDataForm();
    return (
        <>
        {props.showLabel && <label className='form-label fieldName' htmlFor="linkInput">Problem Link</label>}
        <input id="linkInput" className='form-control' type="text" value={formData?.link} onChange={(e) => handleChange(e, 'link')} placeholder="Problem Link*"/>
        </>
    );
};

const StatementInput = () => {
    const {formData, handleChange} = useDataForm();
    return (
        <>
        <label className='form-label fieldName' htmlFor="statementInput">Problem Statement</label>
        <input id="statementInput" className='form-control' type="text" value={formData?.statement} onChange={(e) => handleChange(e, 'statement')} />
        </>
    );
};

const DescriptionInput = () => {
    const {formData, handleChange} = useDataForm();
    return (
        <>
        <label className='form-label fieldName' htmlFor="descriptionInput">Problem Description</label>
        <textarea id="descriptionInput" className="form-control" rows='5' value={formData?.description} onChange={(e) => handleChange(e, 'description')}></textarea>
        </>
    );
};

const DifficultyInput = () => {
    const {formData, handleChange} = useDataForm();
    return (
        <>
        <label className='form-label fieldName' htmlFor="difficultyInput">Difficulty</label>
        <select id="difficultyInput" className='form-control' value={formData?.difficulty} onChange={(e) => handleChange(e, 'difficulty')}>
            <option value="" hidden>Select</option>
            <option value={ProblemDifficulty.EASY}>{ProblemDifficulty.EASY}</option>
            <option value={ProblemDifficulty.MEDIUM}>{ProblemDifficulty.MEDIUM}</option>
            <option value={ProblemDifficulty.HARD}>{ProblemDifficulty.HARD}</option>
        </select>
        </>
    );
};

const StatusInput = () => {
    const {formData, handleChange} = useDataForm();
    return (
        <>
        <label className='form-label fieldName' htmlFor="statusInput">Status</label>
        <select id="statusInput" className='form-control' value={formData?.status} onChange={(e) => handleChange(e, 'status')}>
            <option value={ProblemStatus.SOLVED}>{ProblemStatus.SOLVED}</option>
            <option value={ProblemStatus.REVISE}>{ProblemStatus.REVISE}</option>
            <option value={ProblemStatus.UNSOLVED}>{ProblemStatus.UNSOLVED}</option>
        </select>
        </>
    );
};

const TopicInput = () => {
    const topicToBeAdded = React.useRef();
    const {formData, setFormData} = useDataForm();

    function setTopic(){
        console.log(topicToBeAdded.current.value)
        if(topicToBeAdded.current.value) setFormData({...formData, topics:[...formData.topics, topicToBeAdded.current.value]}); 
        topicToBeAdded.current.value = "";
    }

    return(
        <>
        <label htmlFor="topicInput" className="form-label fieldName">Topic</label>
        <div className='input-group'>
            <input id="topicInput" className='form-control' type="text" list="topics" ref={topicToBeAdded}/>
            <button className='btn btn-primary' type="button" onClick={setTopic}>Add</button>
        </div>
        <datalist id="topics">
            {Topics.map(topic => <option value={topic} key={topic}/>)}
        </datalist>
        </>
    );
};

const TopicDisplay = () => {
    const {formData, setFormData} = useDataForm();

    function unselectTopic(index){
        let topicList = [...formData.topics]
        topicList.splice(index,1);
        setFormData({...formData, topics:[...topicList]})
    }

    return(
        <div id="selectedTopics">
            {formData?.topics?.length > 0 ?
                formData.topics.map((topic,index) => <div className='topicTab' onClick={() => unselectTopic(topic)} key={index}>{topic}<span>&#x2717;</span></div>)
                : 
                <small>No topics selected</small>
            }
        </div>
    );
};

const SubmitButton = (props) => {
    const {formData} = useDataForm();

    function handleSubmit(){
        if(props.onSubmit) props.onSubmit(formData);
    }

    return <button id="submitFormButton" type="button" className='btn btn-primary w-100' onClick={handleSubmit}>Submit</button>;
};

const UpdateButton = (props) => {
    const {formData} = useDataForm();

    function handleUpdate(){
        if(props.onUpdate) props.onUpdate(formData);
    }

    return <button id="updateFormButton" type="button" className='btn btn-primary w-100' onClick={handleUpdate}>Update</button>;
};

const ResetButton = (props) => {
    const {setFormData} = useDataForm();

    function handleReset(){
        setFormData(initialState);
        if(props.onReset) props.onReset();
    }

    return <button id="resetFormButton" type="button" className='btn btn-danger w-100' onClick={handleReset}>Reset</button>;
};

DataForm.LinkInput = LinkInput;
DataForm.StatementInput = StatementInput;
DataForm.DescriptionInput = DescriptionInput;
DataForm.DifficultyInput = DifficultyInput;
DataForm.StatusInput = StatusInput;
DataForm.TopicInput = TopicInput;
DataForm.TopicDisplay = TopicDisplay;

DataForm.SubmitButton = SubmitButton;
DataForm.UpdateButton = UpdateButton;
DataForm.ResetButton = ResetButton;

export default DataForm;