import React from 'react';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/Landing';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>Job <span>tracking</span> app</h1>
                    <p>The value returned of -9,223,372,036,854,775,808 is the lowest possible value for the bigint data type. The owner realizes he wanted the sequence to start with 1, but did not indicate the START WITH clause when he created the sequence. To correct this error, the owner executes the following statement.</p>
                    <Link to="/register" className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={main} alt="job hunt" className='img main-img' />
            </div>

        </Wrapper>
    )
}



export default Landing