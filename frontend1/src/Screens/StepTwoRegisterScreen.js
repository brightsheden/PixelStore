// @flow strict

import * as React from 'react';
import { Link } from "react-router-dom";
import { Row,Col,Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'

import { registerTwo,userLogin } from '../Actions/userAction';
import FormContainer from '../Components/FormContainer';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import axios from 'axios'

function StepTwoRegisterScreen({location,history}) {
    const [image, setImage] = React.useState('')
    const [occupation, setOccupation] = React.useState('')
    const [nickname, setNickname] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [uploading, setUploading] = React.useState(false )

    const redirect = location.search ? location.search.split('m')[1] : '/'
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userRegisterTwo = useSelector(state => state.userRegisterTwo)
    const {loading,error,userInfoTwo} = userRegisterTwo

    
    React.useEffect(()=>{
        if (!userInfo){
            history.push('/')
        }
        if(userInfoTwo ){
            //history.push(redirect)
            history.push('/profile')
        }
      
        
    },[userInfo,userInfoTwo,history])

    const uploadFileHandler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
  
        console.log("file is uploading")
        setUploading(true)   

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("http://127.0.0.1:8000/api/user/profilephoto/", formData,config)
            setUploading(false)
            setImage(data)
        } catch (error) {
            setUploading(false)
            
        }

    }
    const dispatch = useDispatch()
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(registerTwo(image,occupation,country,nickname))
        
        
    }


    return (
        <FormContainer>
            <h1>Complete Your Profile</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='image'>

            <Form.Label>Image</Form.Label>
            <Form.Control

                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            >   
            </Form.Control>
            <Form.File
                id="image-file"
                label="choose file"
                custom
                onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader/> }
        </Form.Group>

            <Form.Group controlId="name">
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter your username here"
                value={occupation} 
                onChange={(e)=>setOccupation(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter your nickname here"
                value={nickname} 
                onChange={(e)=>setNickname(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter your country here"
                value={country} 
                onChange={(e)=>setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">Sign In</Button>
          </Form>
        </FormContainer>
    );
};

export default StepTwoRegisterScreen;