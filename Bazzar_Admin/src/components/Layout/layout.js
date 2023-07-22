import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { NavLink ,Link} from 'react-router-dom'
import Header from '../Header/header'
import './style.css'
const layout=(props)=> {
    return (
        <>
            <Header/>
            <Container fluid>
            <Row>
                <Col md={2} className="sidebar">
                    <ul>
                        <li><Link exact to={"/"}>Home</Link></li>
                        <li><Link to={"/page"}>Page</Link></li>
                        <li><NavLink to={"/products"}>Products</NavLink></li>
                        <li><NavLink to={"/orders"}>Orders</NavLink></li>
                        <li><NavLink to={"/categories"}>Categories</NavLink></li>
                    </ul>
                </Col>
                <Col md={10} style={{marginLeft:'auto'}}>{props.children}</Col>
            </Row>
            </Container>
        </>
    )
}

export default layout