import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../Contexts/LoggedInUserContext';
import SideBar from './SideBar';

const ProtectedRoute = () => {

    const [user] = React.useContext(UserContext);

    return(
        <>
        {user ? <div id="protectedPage"><SideBar /><Outlet /></div> : <Navigate to='/login' />}
        </>
    )
}

export default ProtectedRoute;
