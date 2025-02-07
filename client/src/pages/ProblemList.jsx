import * as React from 'react';
import * as service from '../Service/service';
import ProblemTable from '../Components/ProblemTable';
import { ChevronDown, ChevronUp, Search } from 'react-bootstrap-icons';
import UserContext from '../Contexts/LoggedInUserContext';

const ProblemList = () => {

    const [user] = React.useContext(UserContext);

    const initialFilters = {
        topics:[],
        statement:'',
        difficulty:'',
        status:''
    }

    const [problems, setProblems] = React.useState({
        all:[],
        display:[]
    });
    const [topics, setTopics] = React.useState([]);
    const [showFilters, setShowFilters] = React.useState(false);
    const [filter, setFilter]  = React.useState({...initialFilters});

    function selectTopic(e, topic){
        e.currentTarget.classList.toggle("topic-filter-active");
        if( e.currentTarget.classList.contains("topic-filter-active"))
            setFilter({...filter, topics:[...filter.topics, topic]})
        else{
            let topics = filter.topics;
            topics.splice(topics.indexOf(topic),1);
            setFilter({...filter, topics})  
        }
    }

    function toggleFilterButtons(e, filterName){
        if(e.currentTarget.classList.contains('active')){
            e.currentTarget.classList.remove('active');
            setFilter({...filter, [filterName]:''})
            return;
        }
        let activeBtn = document.querySelector(`#${filterName}FilterOptions button.active`);
        if(activeBtn) activeBtn.classList.remove('active');
        e.currentTarget.classList.add('active');
        setFilter({...filter, [filterName]:e.currentTarget.value});
    }

    function applyFilters(){
        let filteredList = [...problems.all];

        // filter by selected topics
        if(filter.topics.length > 0){
            filteredList = filteredList.filter(problem => {
                for(let item of problem.Topics){
                    if(filter.topics.includes(item.topic)){
                        return true;
                    }
                }
                return false;
            })
        }

        // filter by searched statement
        if(filter.statement)
            filteredList = filteredList.filter(problem => problem.statement.toLowerCase().includes(filter.statement.toLowerCase()))

        // filter by selected difficulty/difficulty
        if(filter.difficulty)
            filteredList = filteredList.filter(problem => problem.difficulty === filter.difficulty)

        // filter by selected status
        if(filter.status)
            filteredList = filteredList.filter(problem => problem.status === filter.status)

        setProblems({...problems, display:[...filteredList]})
    }

    function resetFilters(){
        document.querySelector('#difficultyFilterOptions button.active')?.classList.remove('active');
        document.querySelector('#statusFilterOptions button.active')?.classList.remove('active');
        Array.from(document.querySelectorAll('.topic-filter-active')).forEach(activeTopic => activeTopic.classList.remove('topic-filter-active'));
        setFilter(initialFilters);
    }

    React.useEffect(()=>{
        service.getProblemsByUserId(user.userId)
        .then(response => setProblems({all:response.body, display:response.body}))
    },[])

    React.useEffect(()=>{
        let uniqueTopics = {};
        problems.all.forEach(problem => {
            problem.Topics.forEach(item=>{
                if(!uniqueTopics[item.topic]) uniqueTopics[item.topic]++;
                setTopics(Object.keys(uniqueTopics));
            })
        })
    },[problems.all])

    React.useEffect(()=>{
        applyFilters();
    },[filter]);

    React.useEffect(()=>{
        console.log(problems.all)
    },[problems])
    
    return(
        <div className='contentArea' id="problemList">
            <div className='d-flex justify-content-between'>
                <div id='problemListInfo' className='mb-3'>
                    <div>Overview:</div>
                    <div className='infoBox black'><span>Total: </span><span>{problems.all.length}</span></div>
                    <div> | </div>
                    <div className='infoBox green'><span>Easy: </span><span>{problems.all.filter(problem => problem.difficulty==="Easy").length}</span></div>
                    <div className='infoBox orange'><span>Medium: </span><span>{problems.all.filter(problem => problem.difficulty==="Medium").length}</span></div>
                    <div className='infoBox red'><span>Hard: </span><span>{problems.all.filter(problem => problem.difficulty==="Hard").length}</span></div>
                    <div> | </div>
                    <div className='infoBox green'><span>Solved: </span><span>{problems.all.filter(problem => problem.status==="Solved").length}</span></div>
                    <div className='infoBox orange'><span>Revise: </span><span>{problems.all.filter(problem => problem.status==="Revise").length}</span></div>
                    <div className='infoBox red'><span>Unsolved: </span><span>{problems.all.filter(problem => problem.status==="Unsolved").length}</span></div>
                </div>
                <div id='filterToggle' className='mb-2'>
                {
                    showFilters ?
                    <span className='filterToggleBtn' onClick={()=>setShowFilters(!showFilters)}>Hide Filters <ChevronUp /></span>
                    :
                    <span className='filterToggleBtn' onClick={()=>setShowFilters(!showFilters)}>Show Filters <ChevronDown /></span>
                }
            </div>
            </div>
            {
                !showFilters &&
                <div id='filterInfo' className='mb-2'>
                    <span><b>Topics:</b> {filter.topics.length > 3 ? filter.topics.slice(0,3).join(", ")+'...':filter.topics.length > 0 ? filter.topics.join(", ") :'All'}</span>
                    <span className='ms-3'><b>Difficulty:</b> {filter.difficulty || 'All'}</span>
                    <span className='ms-3'><b>Status:</b> {filter.status || 'All'}</span>
                    <span className='ms-3'><b>Statement:</b> {filter.statement || 'All'}</span>
                </div> 
            }
            
            <div id="filterArea" className={'mb-3'+(!showFilters ? ' filterAreaHidden':'')}>
                <div id="topic-filter-section" className='mb-3'>
                    {
                        topics.map(topic =>{
                            return(
                                <div className="topic-filter" key={topic} onClick={(e)=>selectTopic(e, topic)}>{topic}</div>
                            )
                        })
                    }
                </div>
                <div className='d-flex align-items-center mb-3'>
                    <Search size={20}/>
                    <input id="search-problem-input" type="text" className='form-control' value={filter.statement} placeholder='Search Problem Statement' onChange={(e)=>setFilter({...filter,statement:e.target.value})}/>
                </div>
                <div className='d-flex'>
                    <div className='d-flex align-items-center difficultyFilter'>
                        <label htmlFor="">Difficulty:</label>
                        <div className='btn-group btn-group-toggle ms-2' id='difficultyFilterOptions'>
                            <button className='btn' id='difficultyFilterOptionEasy' onClick={(e)=>toggleFilterButtons(e,'difficulty')} value="Easy">Easy</button>
                            <button className='btn' id='difficultyFilterOptionMedium' onClick={(e)=>toggleFilterButtons(e,'difficulty')} value="Medium">Medium</button>
                            <button className='btn' id='difficultyFilterOptionHard' onClick={(e)=>toggleFilterButtons(e,'difficulty')} value="Hard">Hard</button>
                        </div>
                    </div>
                    <div className='d-flex align-items-center ms-5 statusFilter'>
                        <label htmlFor="">Status:</label>
                        <div className='btn-group btn-group-toggle ms-2' id='statusFilterOptions'>
                            <button className='btn' id='statusFilterOptionSolved' onClick={(e)=>toggleFilterButtons(e,'status')} value="Solved">Solved</button>
                            <button className='btn' id='statusFilterOptionRevise' onClick={(e)=>toggleFilterButtons(e,'status')} value="Revise">Revise</button>
                            <button className='btn' id='statusFilterOptionUnsolved' onClick={(e)=>toggleFilterButtons(e,'status')} value="Unsolved">Unsolved</button>
                        </div>
                    </div>
                    <button className='btn btn-danger' id='resetFilterBtn' onClick={resetFilters}>Reset Filters</button>
                </div>
            </div>
            <ProblemTable problems={problems.display}/>
        </div>
    )
}

export default ProblemList;