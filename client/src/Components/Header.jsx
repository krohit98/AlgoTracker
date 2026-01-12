import * as React from 'react';
import { UserContext } from './shared/context';
import { PersonCircle } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import LogoutButton from './InputComponents/LogoutButton';

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
            </span>
            <div className='userSection'>
               <span id='userInfo'><PersonCircle size={20}/><span className='userEmail'>{user.email}</span></span>
                <LogoutButton /> 
            </div>
        </div>
    )
}

export default Header;