import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../Contexts/LoggedInUserContext';
import SideBar from './SideBar';
import Header from './Header';
import Loader from './Loader';

const ProtectedRoute = () => {

    const [user] = React.useContext(UserContext);

    return(
        <>
        {user ? 
            <div id="protectedPage">
                <SideBar />
                <div id="mainContent">
                    <React.Suspense fallback={<Loader />}>
                        <Header />
                        <Outlet />
                    </React.Suspense>
                </div>
            </div> 
            : 
                <Navigate to='/login' />
        }
        </>
    )
}

export default ProtectedRoute;
