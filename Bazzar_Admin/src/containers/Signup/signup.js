import React, { useState } from 'react'
import Layout from '../../components/Layout/layout'
import Input from '../../components/input/input'
import '../Signin/signin.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions/user.actions';
import Header from '../../components/Header/header';
function Signup() {
    const auth=useSelector(state => state.auth);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [error ,setError]=useState('')
    const [password, setPassword] = useState('')
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user);

    const userSignup=(e)=>{
        e.preventDefault();
        const user={
            firstName,lastName,email,password
        }
        dispatch(signup(user));
    }


    if(auth.authenticate){
        return <Redirect to={'/'}/>
    }

    if(user.loading){
        return <p>loading .....!</p>
    }
    return (
        <>
        <Header/>
        <div className="signUp">
            <form onSubmit={userSignup}>
                {user.message}
                <div className="first-last">
                    <Input 
                        label='First Name'
                        placeholder='First Name'
                        value={firstName}
                        type='text'
                        onChange={(e)=>{setFirstName(e.target.value)}}
                    />
                    <Input
                        label='Last Name'
                        placeholder='Last Name'
                        value={lastName}
                        type='text'
                        onChange={(e)=>{setLastName(e.target.value)}}
                    />
                </div>
                
                <Input
                    label='Email'
                    placeholder='Email'
                    value={email}
                    type='email'
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <Input
                    label='Password'
                    placeholder='Password'
                    value={password}
                    type='password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <br/>
                <button>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Signup;