import * as React from 'react';
import UserContext from '../Contexts/LoggedInUserContext';
import { PersonCircle } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';

const Header = () => {

    const location = useLocation();
    const [user] = React.useContext(UserContext);

    const [pageTitle, setPageTitle] = React.useState("Problem List")

    React.useEffect(()=>{
        if(location.pathname === "/problem/list") setPageTitle("Problem List")
        else if(location.pathname === "/problem/add") setPageTitle("Add Problem")
        else if(location.pathname === "/dashboard") setPageTitle("Dashboard")
    },[location])

    return(
        <div id='header'>
            <span id="mainTitle">
                <img src="/Images/logo.svg" alt="title" width="100%"/>
                {/* <h1 className='display-6'>AlgoTracker</h1> */}
            </span>
            <span id='userInfo'>{user.email} <PersonCircle size={20}/></span>
        </div>
    )
}

export default Header;