import React from 'react'
import './header.css'
import {Button, Container, Nav,Navbar} from 'react-bootstrap'
import { NavLink,Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../actions/auth.actions'
const Header=()=> {
    const auth=useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const loggedout=()=>{
        dispatch(signout());
    }

    const renderLoggedInLinks=()=>{
        return (
            <Nav >
                <li className="nav-item" >
                <span className="Signout" style={{cursor:'pointer'}} onClick={()=>{loggedout()}}>signout</span>
                </li>
            </Nav>
        );
    }
    const renderNonLoggedInLinks=()=>{
        return(
            <Nav>
                <li className="nav-item">
                    <NavLink to="signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signup" className="nav-link">signup</NavLink>
                </li>
            </Nav>
        );
    }

    return (
        <div className="header">
            <div className="brand">
                <h2><NavLink to="/" >Admin Dashboard</NavLink></h2>
            </div>
            <div className="login">
                {auth.authenticate? renderLoggedInLinks():renderNonLoggedInLinks()}
            </div>
        </div>
    )
}

export default Header;