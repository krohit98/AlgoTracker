import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Header from './Components/Header';
import Dashboard from './pages/Dashboard';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Index from './pages/Index';

function App() {



  return (
    <Router>
      <div className="App ps-5 pe-5 bg-light">
        <Routes>
          <Route exact path='/' element={<Index />}/>
          <Route exact path='/' element={<Home />}>
            <Route exact path='/login' element={<LoginForm />} />
            <Route exact path='/register' element={<RegisterForm />} />
          </Route>
          <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
                
        <div id="popup-wrapper">
          <div id="ack-popup" className='alert'></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
