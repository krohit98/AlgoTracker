import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserContext from './Contexts/LoggedInUserContext';
import Loader from './Components/Loader';

const Home = React.lazy(()=>import('./pages/Home'));
const Dashboard = React.lazy(()=>import('./pages/Dashboard'));
const LoginForm = React.lazy(()=>import('./Components/LoginForm'));
const RegisterForm = React.lazy(()=>import('./Components/RegisterForm'));
const Index = React.lazy(()=>import('./pages/Index'));
const ProtectedRoute = React.lazy(()=>import('./Components/ProtectedRoute'));
const ProblemList = React.lazy(()=>import('./pages/ProblemList'));
const ProblemForm = React.lazy(()=>import('./pages/ProblemForm'));

function App() {

  let logggedInUser = sessionStorage.getItem("algoTrackerLoggedInUser");
  if(logggedInUser) logggedInUser = JSON.parse(logggedInUser);

  const [user,setUser] = React.useState(logggedInUser || null);

  return (
    <Router>
      <UserContext.Provider value={[user,setUser]}>
        <React.Suspense fallback={<Loader />}>
          <div>
            <Routes>
              <Route exact path='/' element={<Index />}/>
              <Route element={<Home />}>
                <Route exact path='/login' element={<LoginForm />} />
                <Route exact path='/register' element={<RegisterForm />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route exact path='/problem/list' element={<ProblemList/>} />
                <Route exact path='/problem/add' element={<ProblemForm/>} />
                <Route exact path='/dashboard' element={<Dashboard/>} />
              </Route>
            </Routes> 
            <div id="popup-wrapper">
              <div id="ack-popup" className='alert'></div>
            </div>
          </div>
        </React.Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
