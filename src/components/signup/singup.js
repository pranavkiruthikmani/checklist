import { auth } from '../../firebase/firebase';
import {React, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import './signup.css';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUp = async (e) => {
        e.preventDefault();

        console.log("Signup")

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return(
        <div>
            <div className='container'>
                <div className='inputcontainer'>
                    {/* <label htmlFor='email'> Email </label> */}
                    <input type='text' placeholder='Enter Email' name='email' onChange={(e) => setEmail(e.target.value)} className='form__field' />
                </div>
                <div className='inputcontainer'>
                    {/* <label htmlFor='password'> Password </label> */}
                    <input type='password' placeholder='Enter Password' name='password' onChange={(e) => setPassword(e.target.value)} className='form__field' />
                </div>
                <div>
                    <button onClick={onSignUp} className='button-31'> Sign Up </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;