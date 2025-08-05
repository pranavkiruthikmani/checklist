import { auth } from '../../firebase/firebase';
import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import validator from "validator";
import './signup.css';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailvalid, setEmailvalid] = useState(true);
    const [passwordvalid, setPasswordvalid] = useState(true);
    const [failed, setFailed] = useState(false);
    const [inUse, setInUse] = useState(false);

    const onSignUp = async (e) => {
        e.preventDefault();

        console.log("Signup")

        if (validator.isEmail(email)) {
            setEmailvalid(true);
            if (password.length > 5) {
                setPasswordvalid(true);
                await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    //Signed up
                    console.log(userCredential.user);
                    navigate('/checkbox')
                })
                .catch((error) => {
                    const code = error.code;
                    if (code === 'auth/email-already-in-use') {
                        setInUse(true);
                    }

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
                <h1>Sign Up</h1>
                {!emailvalid && <div className='errormessage'>Invalid Email</div>}
                {!passwordvalid && <div className='errormessage'>Invalid Password: Atleast 6 characters long</div>}
                {failed && <div className='errormessage'>Failed to sign up</div>}
                {inUse && <div className='errormessage'>Email in use</div>}
                <div className='inputcontainer'>                    
                    <input type='text' placeholder='Enter Email' name='email' onChange={(e) => setEmail(e.target.value)} className='form__field' />
                </div>
                <div className='inputcontainer'>
                    {/* <label htmlFor='password'> Password </label> */}
                    <input type='password' placeholder='Enter Password' name='password' onChange={(e) => setPassword(e.target.value)} className='form__field' />
                </div>                
                <div>
                    <button onClick={onSignUp} className='button-31'> Sign Up </button>
                </div>
                <div>
                    <Link to='/signin' className='link'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;