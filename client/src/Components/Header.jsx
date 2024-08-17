import * as React from 'react';
import UserContext from '../Contexts/LoggedInUserContext';

const Header = () => {

    const [user] = React.useContext(UserContext);

    return(
        <>
            {   user &&
                <div id='header' className='d-flex justify-content-between'>
                    <div>
                        <span>AlgoTracker</span>
                        <span> | </span>
                        <span>Page Name</span>
                    </div>
                    
                    <span>{user.email}</span>
                </div>
            }
        </>
    )
}

export default Header;