import * as React from 'react';
import NotesPopup from '../Components/NotesPopup';

const ProblemList = (props) => {

    const [notes, setNotes] = React.useState('')
    const [problems, setProblems] = React.useState({
        all:[],
        display:[]
    });
    const [topics, setTopics] = React.useState([]);
    const [selectedTopic, setSelectedTopic] = React.useState('');

    function flagProblem(e){
        let flagIcon = e.currentTarget.children[0];
        if(flagIcon.classList.contains("bi-flag")){
            flagIcon.classList.remove("bi-flag");
            flagIcon.classList.add("bi-flag-fill");
        }
        else{
            flagIcon.classList.remove("bi-flag-fill");
            flagIcon.classList.add("bi-flag");
        }
    }

    function selectTopic(e, topic){
        let selectedTopicBtn = document.getElementsByClassName("topic-filter-active")[0];
        if(selectedTopicBtn) 
            selectedTopicBtn.classList.remove("topic-filter-active");
        if(selectedTopicBtn !== e.currentTarget)
            e.currentTarget.classList.add("topic-filter-active");

        if(selectedTopic === topic)
            setSelectedTopic('');
        else
            setSelectedTopic(topic);
    }

    function filterByTopic(){
        if(selectedTopic === ''){
            setProblems({...problems, display:problems.all});
            return;
        }
        let filteredProblems = problems.all.filter(problem => problem.topic === selectedTopic);
        setProblems({...problems, display:filteredProblems});
    }

    React.useEffect(()=>{
        setProblems({all:props.problemArray, display:props.problemArray});
    },[props.problemArray]);

    React.useEffect(()=>{
        let uniqueTopics = {};
        problems.all.forEach(problem => {
            if(!uniqueTopics[problem.topic]) uniqueTopics[problem.topic]++;
            setTopics(Object.keys(uniqueTopics));
        })
    },[problems.all])

    React.useEffect(()=>{
        filterByTopic();
    },[selectedTopic]);
    
    return(
        <div className='w-100'>
            <div id="topic-filter-section" className='mb-3'>
                {
                    topics.map(topic =>{
                        return(
                            <div className="topic-filter" onClick={(e)=>selectTopic(e, topic)}>{topic}</div>
                        )
                    })
                }
            </div>
            <table className='table table-sm align-middle bg-white text-center'>
                <thead>
                    <tr className='table-dark'>
                        <th>#</th>
                        <th>Topic</th>
                        <th className='w-50'>Statement</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {problems.display.map((problem,index)=>{
                    let rowStyle = problem.status === "Solved"?"table-success":problem.status === "Unsolved"?"table-danger":"table-warning";
                    return(
                        <tr className={rowStyle}>
                            <td>{index+1}</td>
                            <td>{problem.topic}</td>
                            <td className='w-50'><a href={problem.link} target="_blank" rel="noreferrer">{problem.statement}</a></td>
                            <td>{problem.level}</td>
                            <td>{problem.status}</td>
                            <td>
                                <div className='btn-group'>
                                <button className='btn btn-dark' title="Flag" onClick={(e)=>flagProblem(e)}><i class="bi bi-flag"></i></button>
                                <button className="btn btn-dark" title="View Notes" disabled={problem.notes?false:true} onClick={()=>setNotes(problem.notes)} data-bs-toggle="modal" data-bs-target="#notes-modal"><i class="bi bi-eye-fill"></i></button>
                                <button className="btn btn-dark" title="View Solution" disabled={problem.solution?false:true}><i class="bi bi-code-slash"></i></button>
                                <button className='btn btn-dark' title="Edit"><i class="bi bi-pencil-fill"></i></button>
                                <button className='btn btn-danger' title="Delete"><i class="bi bi-trash-fill"></i></button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <NotesPopup content={notes}/>
        </div>
    )
}

export default ProblemList;