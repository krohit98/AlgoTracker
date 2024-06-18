import * as React from 'react';
import * as auth from '../Service/auth';
import * as helper from '../Service/helper';
import { Link } from 'react-router-dom';

const RegisterForm = (props) => {

    const initialState = {
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    const [formData, setFormData] = React.useState(initialState)

    function changeHandler(field, value){
        setFormData({...formData, [field]:value});
    }

    function registerUser(){
        if(formData.password !== formData.confirmPassword){
            helper.showError("Passwords do not match. Kindly try again!");
            return;
        }
        auth.register(formData.email, formData.password);
    }

    return(
        <div id='register-wrapper'>
            <form action="" id="register-form">
                <label htmlFor="" className="form-label">Name</label>
                <input type="email" className="form-control mb-2 name-input" value={formData.name} onChange={(e)=>changeHandler('name',e.target.value)}/>
                <label htmlFor="" className="form-label">Email</label>
                <input type="email" className="form-control mb-2 email-input" value={formData.email} onChange={(e)=>changeHandler('email',e.target.value)}/>
                <label htmlFor="" className="form-label password-label">
                    <span>Password</span>
                    <span>
                        <input type="checkbox" onClick={(e)=>helper.showPassword(e)} data-inputid="register-pass"/>
                        <small>Show Password</small>
                    </span>
                </label>
                <input type="password" className="form-control mb-2 password-input" id="register-pass" value={formData.password} onChange={(e)=>changeHandler('password',e.target.value)}/>
                <label htmlFor="" className="form-label password-label">
                    <span>Confirm Password</span>
                </label>
                <input type="password" className="form-control mb-5 cnf-password-input" id="register-cnf-pass" value={formData.confirmPassword} onChange={(e)=>changeHandler('confirmPassword',e.target.value)}/>
            </form>
            <div className='auth-btns text-white mt-3'>
                <button type="button" className="btn btn-primary w-100" onClick={registerUser}>Register</button>
                <Link to='/login'><small>Existing User? Login here</small></Link>
            </div>
        </div>
    )
}

export default RegisterForm;