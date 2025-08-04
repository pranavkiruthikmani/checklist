import { auth } from '../../firebase/firebase';
import {React, useState} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import validator from "validator";
import './signin.css';

const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailvalid, setEmailvalid] = useState(true);
    const [passwordvalid, setPasswordvalid] = useState(true);
    const [failed, setFailed] = useState(false)


    const onSignIn = (e) => {
        e.preventDefault();

        console.log("Signin")

        if (validator.isEmail(email)) {
            setEmailvalid(true);
            if (password.length > 5) {
                setPasswordvalid(true);
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    //Signed in
                    console.log(userCredential.user);
                    navigate('/checkbox')
                })
                .catch((error) => {
                    setFailed(true)
                    console.log(error);
                })
            } else {
                setPasswordvalid(false);
            }
        } else {
            setEmailvalid(false);
        }
    }

    return(
        <div>
            <div className='container'>
                <h1>Sign In</h1>
                {!emailvalid && <div className='errormessage'>Invalid Email</div>}
                {!passwordvalid && <div className='errormessage'>Invalid Password: Atleast 6 characters long</div>}
                {failed && <div className='errormessage'>Check your credentials</div>}
                <div className='inputcontainer'>                    
                    <input type='text' placeholder='Enter Email' name='email' onChange={(e) => setEmail(e.target.value)} className='form__field' />
                </div>
                <div className='inputcontainer'>
                    {/* <label htmlFor='password'> Password </label> */}
                    <input type='password' placeholder='Enter Password' name='password' onChange={(e) => setPassword(e.target.value)} className='form__field' />
                </div>                
                <div>
                    <button onClick={onSignIn} className='button-31'> Sign In </button>
                </div>
                <div>
                    <Link to='/signup' className='link'>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;