import * as React from 'react';
import * as service from '../Service/service';
import * as helper from '../Service/helper';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Contexts/LoggedInUserContext';

const LoginForm = (props) => {

    const [user,setUser] = React.useContext(UserContext);

    const navigate = useNavigate();

    const initialState = {
        email:'',
        password:''
    }

    const [formData, setFormData] = React.useState(initialState)

    function changeHandler(field, value){
        setFormData({...formData, [field]:value});
    }

    function loginUser(){
        service.login(formData.email, formData.password)
        .then(response => {
            if(response.success){
                setUser(response.body);
                sessionStorage.setItem("algoTrackerLoggedInUser",JSON.stringify(response.body))
                navigate('/problemlist');
            }
            else
                alert(response.body.message);
        })
        .catch(error => {
            alert(error);
        })
    }

    return(
        <div id='login-wrapper' className='d-flex flex-column justify-content-between'>
            <form action="" id="login-form">
                <label htmlFor="" className="form-label">Email*</label>
                <input type="email" className="form-control mb-3 email-input" value={formData.email} onChange={(e)=>changeHandler('email',e.target.value)}/>
                <label htmlFor="" className="form-label password-label">
                    <span>Password*</span>
                    <span>
                        <input type="checkbox" onClick={(e)=>helper.showPassword(e)} data-inputid="login-pass"/>
                        <small>Show Password</small>
                    </span>
                </label>
                <input type="password" className="form-control mb-5 password-input" id="login-pass" value={formData.password} onChange={(e)=>changeHandler('password',e.target.value)}/>
            </form>
            <div className='auth-btns text-white mt-3'>
                <button className="btn btn-primary w-100" onClick={loginUser}>Login</button>
                <div className='d-flex justify-content-between'>
                    <Link to='/register'><small>New User? Register here</small></Link>
                    <small>Forgot Password</small> 
                </div>
            </div> 
        </div>
    )
}

export default LoginForm;