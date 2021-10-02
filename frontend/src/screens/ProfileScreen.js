import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;
    const userDetails = useSelector(state => state.userDetails);
    const { user, loading, error } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setEmail(user.email);
            setName(user.name);
        }
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not equal');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    }
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
                        <>
                            {
                                loadingUpdate && <LoadingBox />
                            }
                            {
                                errorUpdate && <MessageBox variant='danger' >{errorUpdate}</MessageBox>
                            }
                            {
                                successUpdate && <MessageBox variant='success'>Profile Updated Successfully</MessageBox>
                            }
                            <div>
                                <label htmlFor='name' >Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder='Enter name'>
                                </input>
                            </div>
                            <div>
                                <label htmlFor='name' >Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder='Enter email'>
                                </input>
                            </div>
                            <div>
                                <label htmlFor='name' >Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Enter password'>
                                </input>
                            </div>
                            <div>
                                <label htmlFor='confirmpassword' >Confirm Password</label>
                                <input
                                    type='password'
                                    id='confirmpassword'
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder='Enter confirm password'>
                                </input>
                            </div>
                            <div>
                                <label />
                                <button type='submit' className='primary'>Update</button>
                            </div>
                        </>
                    )
                }
            </form>
        </div>
    )
}
