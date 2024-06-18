import * as React from 'react';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';
import * as helper from '../Service/helper';
import { Outlet } from 'react-router-dom';

const Home = () => {


    return(
        <div id="homepage">
            <div id='home-wrapper'>
                <div id='title-section'>
                    <div className='d-flex mb-5'>
                        <h1 id='main-title' >Algo Tracker</h1>
                    </div>
                    <h2 className='display-1' id='main-desc'>Build <br /> your own <br /> roadmaps</h2>
                </div>
                <div id='auth-section'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Home;