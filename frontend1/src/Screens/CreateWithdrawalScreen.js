import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { createWithdrawals, decreaseWallets, getWithdrawalDetails  } from '../Actions/userAction'
//import { getUserDetails, updateUser } from '../actions/userActions'
import { CREATE_WITHDRAWAL_RESET } from '../Constants/userConstants'
import { profileListReducer } from '../Reducers/userReducer'
import Helmet from 'react-helmet'


function CreateWithdrawalScreen({ match, history }) {

    const userId = match.params.id

    

    
    const [amount, setAmount] = useState(0)
    const [accountName, setAccountName] = useState('')
    const [accountBank_Name, setAccountBank_Name] = useState('')
    const [accountBank_Number, setAccountBank_Number] = useState(0)
    const [payPalId, setPaypalId] = useState('')
    
  

    const dispatch = useDispatch()

   
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const createWithdrawal = useSelector(state => state.createWithdrawal)
    const {loading:loadingcreate, error: errorcreate,
        success:successCreate} = createWithdrawal

    const depositWallet = useSelector(state => state.depositWallet)
    const { loading: loadingWallet, error: erroWallet, success: successDepositWallet,  } = depositWallet


    const withdrawalDetails = useSelector(state => state.withdrawalDetails)
    const { error, loading, withdrawal } = withdrawalDetails

    const userProfile = useSelector(state => state.userProfileMore)
    const {profiles,} = userProfile


    

    useEffect(() => {
        

        if (!userInfo){
            history.push('/')
        }
        if(successCreate){
            dispatch({type: CREATE_WITHDRAWAL_RESET})
            dispatch(decreaseWallets({_id: profiles?._id , amount}))
            history.push('/mywithdrawal')
        }
    }, [dispatch,successCreate,errorcreate,history])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(createWithdrawals (  amount,accountName,accountBank_Name,accountBank_Number,payPalId))
    }

    return (
        <div>
            <Helmet>
                <title>Apply for withdrawal</title>
            </Helmet>

            <Link to='/mywithdrawal/'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Apply for Withdrawal</h1>

                <Message variant="info">20% will be deducted from your withdrawal amount while you will be paid 80%</Message>
                
                        
                        {errorcreate && <Message variant="danger">{errorcreate}</Message>}

                                <Form onSubmit={submitHandler}>

                            

                            <Form.Group controlId='amount'>
                                <Form.Label>amount</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='amount'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='account name'>
                                <Form.Label>ACCOUNT Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter your account name '
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='bank name'>
                                <Form.Label>Bank Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='bank name'
                                    value={accountBank_Name}
                                    onChange={(e) => setAccountBank_Name(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='account number'>
                                <Form.Label>ACCOUNT NUMBER</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='account number'
                                    value={accountBank_Number}
                                    onChange={(e) => setAccountBank_Number(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            
                            <Form.Group controlId='paypal'>
                                <Form.Label>PayPalId</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='paypal email'
                                    value={payPalId}
                                    onChange={(e) => setPaypalId(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                           
                        {profiles?.wallet <= 9.99 ? (<Message variant="danger">Unfortunately You are not eligle to withdraw</Message>): 
                        ( <Button type='submit' variant='primary'>
                        Submit
                </Button>
                        )
                        }
                           
                        </Form>
                    
                                
                    
                        

            </FormContainer >
        </div>

    )
}

export default CreateWithdrawalScreen



