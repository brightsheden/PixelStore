import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { getProfileDetails, updateProfiles,   } from '../Actions/userAction'
//import { getUserDetails, updateUser } from '../actions/userActions'
import { PROFILE_UPDATE_RESET } from '../Constants/userConstants'


function ProfilesEditScreen({ match, history }) {

    const userId = match.params.id

    const [nickname, setNickname] = useState('')
    const [name, setName] = useState('')
    const [occupation, setOccupation] = useState('')
    const [country, setCountry] = useState('')
    const [wallet, setWallet] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    const [isStaff, setIsStaff] = useState(false)
  

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.profileDetails)
    const { error, loading, profile } = userDetails

    const profileUpdate = useSelector(state => state.profileUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = profileUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({type: PROFILE_UPDATE_RESET})
            history.push('/admin/profilelist')
        }else{
            if (!profile.nickname || profile._id !== Number(userId)) {
                dispatch(getProfileDetails(userId))
            } else {
                setName(profile.name)
                setNickname(profile.nickname)
                setOccupation(profile.occupation)
                setCountry(profile.country)
                setWallet(profile.wallet)
                setIsSeller(profile.isSeller)
                setIsStaff(profile.isStaff)
      
        
        }
        }
            
        

           

    }, [profile, userId,successUpdate,errorUpdate,history])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateProfiles ({ _id: profile._id,name, occupation,country,nickname,wallet,isSeller,isStaff
  
  }))
    }

    return (
        <div>
            <Link to='/admin/profilelist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                
                        {loadingUpdate && <Loader/>}
                        {errorUpdate && <Message variant="danger">{error}</Message>}

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

                            <Form.Group controlId='wallet'>
                                <Form.Label>Wallet</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='w'
                                    value={wallet}
                                    onChange={(e) => setWallet(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isSeller'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Seller'
                                    checked={isSeller}
                                    onChange={(e) => setIsSeller(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Form.Group controlId='isStaff'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Staff'
                                    checked={isStaff}
                                    onChange={(e) => setIsStaff(e.target.checked)}
                                >
                                </Form.Check>
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

export default ProfilesEditScreen




