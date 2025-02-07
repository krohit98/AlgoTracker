import * as React from 'react';
import UserContext from '../Contexts/LoggedInUserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChartLineFill, ListCheck, PlusCircleFill, Power } from 'react-bootstrap-icons';

const SideBar = () => {

    
    const navigate = useNavigate();
    const location = useLocation();

    const [user,setUser] = React.useContext(UserContext);

    function logoutUser(){
        setUser(null);
        sessionStorage.removeItem("algoTrackerLoggedInUser");
        navigate('/');
    }

    return(
        <div id="sideBar">
            <div id='sideNavWrapper'>
                <div className={"sideNav mb-5"+(location.pathname==="/problem/list" ? " sideNav-active":"")} onClick={()=>navigate("/problem/list")}><ListCheck size={20}/> <span>Problem List</span></div>
                <div className={"sideNav mb-5"+(location.pathname==="/problem/add" ? " sideNav-active":"")} onClick={()=>navigate("/problem/add")}><PlusCircleFill size={20}/> <span>Add Problem</span></div>
                {/* <div className={"sideNav mb-5"+(location.pathname==="/dashboard" ? " sideNav-active":"")} onClick={()=>navigate("/dashboard")}><BarChartLineFill size={20}/> <span>Dashboard</span></div> */}
            </div>
            {/* <div id="logoutBtnWrapper"><span id="logoutBtn" onClick={logoutUser}><Power /> Logout</span></div> */}
            <div id="logoutBtn" onClick={logoutUser}><Power size={20}/><span>Logout</span></div>
        </div>
    )
}

export default SideBar;