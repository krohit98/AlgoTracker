import * as React from 'react';
import UserContext from '../Contexts/LoggedInUserContext';
import { useNavigate } from 'react-router-dom';
import { BarChartLineFill, ListCheck, PlusCircleFill, Power } from 'react-bootstrap-icons';

const SideBar = () => {

    
    const navigate = useNavigate();

    const [user,setUser] = React.useContext(UserContext);
    const [activeTab, setActiveTab] = React.useState('/problemlist')

    function logoutUser(){
        setUser(null);
        sessionStorage.removeItem("algoTrackerLoggedInUser");
        navigate('/');
    }

    function navigateToPage(pageLink){
        setActiveTab(pageLink);
        navigate(pageLink);
    }

    return(
        <div id="sideBar">
            <div><h3 className='fs-5 mb-5 mt-3'>AlgoTracker</h3></div>
            <div className={"sideNav mb-4"+(activeTab==="/problemlist" ? " sideNav-active":"")} onClick={()=>navigateToPage("/problemlist")}><ListCheck size={20}/> Problem List</div>
            <div className={"sideNav mb-4"+(activeTab==="/problemform" ? " sideNav-active":"")} onClick={()=>navigateToPage("/problemform")}><PlusCircleFill size={20}/> Add Problem</div>
            <div className={"sideNav mb-4"+(activeTab==="/dashboard" ? " sideNav-active":"")} onClick={()=>navigateToPage("/dashboard")}><BarChartLineFill size={20}/> Dashboard</div>
            <div><span id="logoutBtn" onClick={logoutUser}><Power size={20} color='rgb(255, 63, 63)'/> Logout</span></div>
        </div>
    )
}

export default SideBar;