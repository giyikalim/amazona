import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(register(name, email, password))       
        }else{
            alert("Password and confirm password are not match");
        }
    }

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);

    const { userInfo, loading, error } = userRegister;

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect])

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant='danger'>{error}</MessageBox>
                }
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' placeholder='Enter name' required
                        onChange={e => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='email'>Email address</label>
                    <input type='email' id='email' placeholder='Enter email address' required
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='password' >Password</label>
                    <input type='password' id='password' required placeholder='Enter password'
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='passwordConfirm' >Password Confirm</label>
                    <input type='password' id='passwordConfirm' required placeholder='Enter password again'
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label></label>
                    <button className='primary' type='submit'>Register</button>
                </div>
                <div>
                    <label></label>
                    <div>Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link></div>
                </div>
            </form>
        </div>
    )
}
