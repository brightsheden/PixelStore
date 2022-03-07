import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { getProfileDetails, updateProfiles, updateProfilesUser,   } from '../Actions/userAction'
//import { getUserDetails, updateUser } from '../actions/userActions'
import { PROFILE_UPDATE_RESET, PROFILE_USER_UPDATE_RESET } from '../Constants/userConstants'
import axios from 'axios'


function UserProfileSettings({ match, history }) {

    const userId = match.params.id

    const [nickname, setNickname] = useState('')
    const [name, setName] = useState('')
    const [occupation, setOccupation] = useState('')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
   
  

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.profileDetails)
    const { error, loading, profile } = userDetails

    const profileUpdate = useSelector(state => state.profileUserUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = profileUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({type: PROFILE_USER_UPDATE_RESET})
            history.push('/profile')
        }else{
            if (!profile.nickname || profile._id !== Number(userId)) {
                dispatch(getProfileDetails(userId))
            } else {
                setName(profile.name)
                setNickname(profile.nickname)
                setOccupation(profile.occupation)
                setCountry(profile.country)
               
      
        
        }
        }
            

           

    }, [profile, userId,successUpdate,errorUpdate,history])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateProfilesUser ({ _id: profile._id,name, occupation,country,nickname,image
  
  }))
    }

    const uploadThumbnailHandler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('user_id', userId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/user/profilephoto/", formData,config)
            setUploading(false)
            setImage(data)
        } catch (error) {
            setUploading(false)
            
        }

    }


    return (
        <div>
            <Link to='/admin/profilelist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>  <Image  style={{
                    heigth: "50px",
                    width : "50px"
                }} src={profile?.photo}/>
                
                        {loadingUpdate && <Loader/>}
                        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

                        {loading? (<Loader/>): error? (<Message variant="danger">{error}</Message>)
                            :
                            (
                                <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Profile Photo</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='choose image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="thumbnail-file"
                                 label="profile Photo"
                                 custom
                                 onChange={uploadThumbnailHandler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='nickname'>
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter nickname'
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='occupation'>
                                <Form.Label>OCCUPATION</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter your occupation'
                                    value={occupation}
                                    onChange={(e) => setOccupation(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='country'>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter your country'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                           

                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    
                            )}        
                    
                        

            </FormContainer >
        </div>

    )
}

export default UserProfileSettings




