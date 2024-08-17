import * as React from 'react';
import * as service from '../Service/service';
import ProblemForm from './ProblemForm';
import ProblemList from './ProblemList';

const Dashboard = () => {

    const [appData, setAppData] = React.useState([]);
    const [display, setDisplay] = React.useState('list');
  
    function getAppData(){
      // let allData = service.getAllData();
      // setAppData(allData);
    }
  
    function handleClick(e, displayItem){
      document.getElementsByClassName('tracker-tab-active')[0].classList.remove('tracker-tab-active');
      e.currentTarget.classList.add('tracker-tab-active');
      setDisplay(displayItem);
    } 
  
    React.useEffect(()=>{
      getAppData();
    },[])

    return(
        <div>
            {/* <div id="tracker-tab-menu">
                <div className="tracker-tab tracker-tab-active" onClick={(e)=>handleClick(e,'list')}>View problem list</div>
                <div className="tracker-tab" onClick={(e)=>handleClick(e,'form')}>Add new problem</div>
            </div>
            {
                display==="form"?
                <ProblemForm />
                :
                <ProblemList problemArray={appData}/>
            } */}
        </div>
    )
}

export default Dashboard;