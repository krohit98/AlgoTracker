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
                        <img src="/Images/logo.svg" alt="logo" width="500px"/>
                    </div>
                    <h4 className='display-1' id='main-desc'><span className='small-text'>Build your own</span> <span className='large-text'>DSA</span> <span className='small-text'>roadmap...</span></h4>
                </div>
                <img src="/Images/main2.svg" alt="programmer" id="home-img"/>
            </div>
        </div>
    )
}

export default Home;