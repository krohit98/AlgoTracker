import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext, ProblemContext } from './shared/context';
import SideBar from './SideBar';
import Header from './Header';
import Loader from './Loader';

const ProtectedRoute = () => {

    const [user] = React.useContext(UserContext);
    const [problems, setProblems] = React.useState({
        all:[],
        display:[]
    });

    return(
        <>
        {user ? 
            <div id="protectedPage">
                <SideBar />
                <div id="mainContent">
                    <React.Suspense fallback={<Loader />}>
                        <Header />
                        <ProblemContext.Provider value={[problems, setProblems]}>
                            <Outlet />
                        </ProblemContext.Provider>
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
