import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout'
import '../Signin/signin.css'
import Input from '../../components/input/input'
import {Form} from 'react-bootstrap'
import { login} from '../../actions/auth.actions'
import { useDispatch,useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Header from '../../components/Header/header'


const Signin=(props)=> {
    const dispatch=useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [error, setError] = useState('')
    const auth = useSelector(state => state.auth);

    
    const userlogin=(e)=>{
        e.preventDefault();
        const user={
            email,password
        }
        console.log(typeof(email),typeof(password));

        dispatch(login(user));
    }
    if(auth.authenticate){
        return <Redirect to={'/'}/>
    }

    return (
        <>
        <Header/>
        <div className="signIn">
            <Form onSubmit={userlogin}>
                <Input
                    label='Email'
                    placeholder='Email'
                    value={email}
                    type='email'
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <p>We'll never share your email with anyone else.</p>
                <Input
                    label='Password'
                    placeholder='Password'
                    value={password}
                    type='password'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="remember">
                    <input className="checkbox" type="checkbox"/>
                    <p>Remember me</p>
                </div>
                <br/>
                <br/>
                <button>Submit</button>
            </Form>
        </div>
        </>
    )
}

export default Signin