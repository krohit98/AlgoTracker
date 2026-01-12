import * as React from 'react';
import { UserContext } from '../shared/context';
import * as service from '../../Service/service';

const LogoutButton = () => {

    const [_,setUser] = React.useContext(UserContext);

    function logoutUser(){
        service.logout()
        .then(response => {
            if(response.success){
                setUser(null);
            }
            else{
                alert(response.body.message);
            }
        })
        .catch(error => {
            alert(error);
        })
    }

    return(
        <div id="logoutBtn" onClick={logoutUser}>Logout</div>
    )
}

export default LogoutButton;