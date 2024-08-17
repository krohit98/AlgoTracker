import * as React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {


    return(
        <div id="homepage">
            <div id='home-wrapper'>
                <div id='auth-section'>
                    <Outlet />
                </div>
                <div id='title-section'>
                    <div className='d-flex mb-5'>
                        <h1 id='main-title' >AlgoTracker</h1>
                    </div>
                    <h2 className='display-1' id='main-desc'>Build <br /> your own <br />DSA roadmaps</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;