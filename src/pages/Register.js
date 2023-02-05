import React from 'react';
import { Logo, FormRow, Alert } from '../components';
import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/Register';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMemeber: false
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    
    const {user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();    
    const navigate = useNavigate();
    const toggleMember = () => {
        setValues({ ...values, isMemeber: !values.isMemeber })
    }

    const handleChange = (e) => {        
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMemeber } = values;
        if (!email || !password || (!isMemeber && !name)) {
            displayAlert();
            return
        }
        const currentUser = { name, email, password };
        if (isMemeber) {
            loginUser(currentUser);
        } else {            
            registerUser(currentUser);
        }
        console.log(values);
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{ values.isMemeber ? 'Login' : 'Register' }</h3>
                {showAlert && <Alert />}
                { !values.isMemeber  && <FormRow type="text" name="name" value={values.name} handleChange={handleChange} /> }
                <FormRow name="email" type="email" value={values.email} handleChange={handleChange} />
                <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
                <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>
                <p>
                    {values.isMemeber ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' className='member-btn' onClick={toggleMember}>
                        {values.isMemeber ? 'Register' : 'Login'}    
                    </button>  
                </p>
            </form>
        </Wrapper>
}

export default Register;