import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { getProfileDetails, getWithdrawalDetails, updateProfiles, updateWithdrawal,   } from '../Actions/userAction'
//import { getUserDetails, updateUser } from '../actions/userActions'
import { WITHDRAWAL_UPDATE_RESET } from '../Constants/userConstants'


function WithdrawalEditScreen({ match, history }) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [accountName, setAccountName] = useState('')
    const [accountBank_Name, setAccountBank_Name] = useState('')
    const [accountBank_Number, setAccountBank_Number] = useState('')
    const [payPalId, setPaypalId] = useState('')
    const [is_success, setIs_success] = useState(false)
  

    const dispatch = useDispatch()

    const withdrawalDetails = useSelector(state => state.withdrawalDetails)
    const { error, loading, withdrawal } = withdrawalDetails

    const withdrawalUpdate = useSelector(state => state.withdrawalUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } =  withdrawalUpdate 

    useEffect(() => {

        if(successUpdate){
            dispatch({type: WITHDRAWAL_UPDATE_RESET})
            history.push('/admin/withdrawallist')
        }else{
            if (!withdrawal.name || withdrawal._id !== Number(userId)) {
                dispatch(getWithdrawalDetails(userId))
            } else {
                setName(withdrawal.name)
                setAmount(withdrawal.amount)
                setAccountName(withdrawal.accountName)
                setAccountBank_Name(withdrawal.accountBank_Name)
                setAccountBank_Number(withdrawal.accountBank_Number)
                setPaypalId(withdrawal.payPalId)
                setIs_success(withdrawal.is_success)
      
        
        }
        }
            
        

           

    }, [withdrawal, userId,successUpdate,errorUpdate,history])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateWithdrawal ({ _id: withdrawal._id,name, amount,accountName,accountBank_Name,accountBank_Number,payPalId,is_success
  
  }))
    }

    return (
        <div>
            <Link to='/admin/withdrawallist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Mark withdrawal as paid</h1>
                
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

                            <Form.Group controlId='occupation'>
                                <Form.Label>ACCOUNT Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter your account name '
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='country'>
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

                            
                            <Form.Group controlId='account number'>
                                <Form.Label>PayPalId</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='paypal email'
                                    value={payPalId}
                                    onChange={(e) => setPaypalId(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='is_success'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is success'
                                    checked={is_success}
                                    onChange={(e) => setIs_success(e.target.checked)}
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

export default WithdrawalEditScreen



