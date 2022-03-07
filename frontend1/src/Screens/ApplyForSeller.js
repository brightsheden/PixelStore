import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'

//import { getUserDetails, updateUser } from '../actions/userActions'

import { CREATE_SELLER_FORM_RESET, SELLER_PAY_RESET } from '../Constants/sellerFormConstants'
import { createSellerFormm, getSellerDetails, paySeller } from '../Actions/sellerFormActions'
import { PayPalButton } from 'react-paypal-button-v2'
import Helmet from 'react-helmet'


function ApplyForSellerScreen({ match, history }) {

    const userId = match.params.id

    

    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState('')

    
  

    const dispatch = useDispatch()

   
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin



    


    const sellerDetails = useSelector(state => state.sellerDetails)
    const { error, loading, seller } = sellerDetails

    const userProfile = useSelector(state => state.userProfileMore)
    const {profiles,} = userProfile


    const sellerPay = useSelector(state=> state.sellerPay)
    const {loading:payLoading,success:successPay} = sellerPay


    





    useEffect(() => {
        if(!seller || successPay | seller._id !== Number(userId)){
            dispatch({type: SELLER_PAY_RESET})
            dispatch(getSellerDetails(userId))
        }

        if(successPay){
            //dispatch({type:UPDATE_BLOG_RESET})
            history.push('/profile/')
            
        }else {
                setUsername(seller.username)
                setEmail(seller.email)
                setAmount(seller.amount)
             
        

        }
        
   
           
    }, [dispatch,history,seller,userId, successPay])

 

    const paymentSuccessHandler=(paymentResult)=>{
        dispatch(paySeller(userId,paymentResult))
    }

    

    return (
        <div>
            <Helmet>
                <title>Apply For Seller account</title>
                <meta name='description' content='users that wish to be seller can register here'/>

            </Helmet>

            <Link to='/mywithdrawal/'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Apply for Seller Account</h1>

                <Message variant='info'>Once You make payment of $5 You are good to go</Message>

               


               
                
                        
                      

                                <Form >

                            

                            <Form.Group controlId='username'>
                                <Form.Label>username</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='email address '
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            
                            <Form.Group controlId='amount'>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='amount '
                                    value={amount}
                                   
                                >
                                </Form.Control>
                            </Form.Group>
 
                        </Form>
                    
                    
                                
                    
                        

            </FormContainer >
            <ListGroup variant='flush'>
            {!seller.isPaid && (
                                        <ListGroup.Item>
                                            {payLoading && <Loader />}

                                           
                                                    <PayPalButton
                                                        amount={seller?.amount}
                                                        onSuccess={paymentSuccessHandler}
                                                        options={{
                                                            clientId: "AT1MYvy5YjHd5YA6BlGARQx87hsR4BzI7dSmsjt3slo8Ud_aLO6aYxDDCnSVAHqCgLyUegWD5av0BaU1"
                                                        }}
                                                    />
                                             
                                        </ListGroup.Item>
                                    )}

            </ListGroup>

      
        </div>

    )
}

export default ApplyForSellerScreen



