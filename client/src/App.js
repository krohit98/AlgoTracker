import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Header from './Components/Header';
import Dashboard from './pages/Dashboard';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Index from './pages/Index';
import ProtectedRoute from './Components/ProtectedRoute';

import UserContext from './Contexts/LoggedInUserContext';
import ProblemList from './pages/ProblemList';
import ProblemForm from './pages/ProblemForm';

function App() {

  let logggedInUser = sessionStorage.getItem("algoTrackerLoggedInUser");
  if(logggedInUser) logggedInUser = JSON.parse(logggedInUser);

  const [user,setUser] = React.useState(logggedInUser || null);

  return (
    <Router>
      <UserContext.Provider value={[user,setUser]}>
        {/* <Header /> */}
        <div className='bg-light'>
          <Routes>
            <Route exact path='/' element={<Index />}/>
            <Route exact path='/' element={<Home />}>
              <Route exact path='/login' element={<LoginForm />} />
              <Route exact path='/register' element={<RegisterForm />} />
            </Route>
            <Route exact path='/' element={<ProtectedRoute />}>
              <Route exact path='/problemlist' element={<ProblemList/>} />
              <Route exact path='/problemform' element={<ProblemForm/>} />
              <Route exact path='/dashboard' element={<Dashboard/>} />
            </Route>
          </Routes> 
          <div id="popup-wrapper">
            <div id="ack-popup" className='alert'></div>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
