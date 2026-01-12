import { useNavigate, useLocation } from 'react-router-dom';
import { ListCheck, PlusCircleFill, Power } from 'react-bootstrap-icons';

const SideBar = () => {

    
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div id="sideBar">
            <div id='sideNavWrapper'>
                <div className={"sideNav mb-5"+(location.pathname==="/problem/list" ? " sideNav-active":"")} onClick={()=>navigate("/problem/list")}><ListCheck size={20}/> <span>Problem List</span></div>
                <div className={"sideNav mb-5"+(location.pathname==="/problem/add" ? " sideNav-active":"")} onClick={()=>navigate("/problem/add")}><PlusCircleFill size={20}/> <span>Add Problem</span></div>
                {/* <div className={"sideNav mb-5"+(location.pathname==="/dashboard" ? " sideNav-active":"")} onClick={()=>navigate("/dashboard")}><BarChartLineFill size={20}/> <span>Dashboard</span></div> */}
            </div>
        </div>
    )
}

export default SideBar;