
import * as React from 'react';
import { Link } from "react-router-dom";
import { Row,Col,Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'

import { register } from '../Actions/userAction';
import FormContainer from '../Components/FormContainer';
import Message from '../Components/Message';
import Loader from '../Components/Loader';





function RegisterScreen({location,history}) {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [message, setMesssage] = React.useState('')


    //const redirect = location.search ? location.search.split('m')[1] : '/'
    
    const redirect = location.search ? location.search.split('m')[1] : '/'
    const userRegister = useSelector(state=> state.userRegister)
    const {loading,error,userInfo} = userRegister
    const dispatch = useDispatch()
    
    React.useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    }, [history,userInfo,redirect])
    
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMesssage('password does not match')
        }else{
            dispatch(register(name,email,password))
        }
        history.push("register/two/")
       console.log("register")
         
    }


    return (
        <FormContainer>

           
        <h1>Register</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        
        {message && <Message variant="danger">{message}</Message> }

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter your username here"
                value={name} 
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                required
                type="Email"
                placeholder="Enter your email here"
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

          

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                required
                type="password"
                placeholder="Enter your Password here"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirm-password">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                required
                type="password"
                placeholder="Enter your Password here"
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            
            <Button type="submit" variant="primary">Sign In</Button>

        </Form>
        <Row className="py-3">
            <Col>
            Already have ancount? <Link  to={redirect? `/login?redirect=${redirect}`: '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
            
        
    );
};

export default RegisterScreen;