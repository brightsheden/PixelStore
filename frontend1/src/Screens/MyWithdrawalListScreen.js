import React, { useEffect,useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button,Modal ,Image, Row, Col} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {listMyWithdrawals} from '../Actions/userAction'
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import {  FaCheck, FaEdit,  FaTrash} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

function MyWithdarawalListScreen({history}) {
    const dispatch= useDispatch()

    const withdarawlList = useSelector(state=> state.myWithdrawal)
    const {loading,error,withdrawals} = withdarawlList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userProfile = useSelector(state => state.userProfileMore)
    const {profiles} = userProfile

    

    useEffect(()=>{
        if(userInfo || profiles?.isSeller){
            dispatch(listMyWithdrawals())
        }else{
            history.push('/')
        }
        
    },[dispatch,history])

  

    

  

    return (
        <div>
            <Helmet>
                <title>Withdrawal history</title>
            </Helmet>

            <h1>Withdrawal History </h1>

            {loading ? (<Loader/>) :
            error ? (<Message variant="danger">{error}</Message>):
            (

                
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>DATE CREATED</th>
                        <th>TIME CREATED</th>
                        <th>NAME</th>
                        <th>AMOUNT</th>
                        <th>ACCOUNT NAME</th>
                        <th>BANK NAME</th>
                        <th>ACCOUNT NUMBER</th>
                        <th>PAYPAL ID</th>
                        <th>STATUS</th>
                        </tr>
                     
                        
                    </thead>
                    <tbody>
                        
                        {withdrawals.map(withdraw=>(
                            <tr key={withdraw._id}>
                                <td>{withdraw.createdAt.slice(0,10)}</td>
                                <td>{withdraw.createdAt.slice(11,20)}</td>
                                <td>{withdraw.name}</td>
                                <td>{withdraw.amount}</td>
                                <td>{withdraw.accountName}</td>
                                <td>{withdraw.accountBank_Name }</td>
                                <td>{withdraw.accountBank_Number}</td>
                                <td>{withdraw.payPalId}</td>
                                <td>{withdraw.is_success ? (
                                   " Paid" 
                                  
                                ):
                               ( "Pending")} </td>
                             

                                
                               
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
        </div>
    );
};

export default MyWithdarawalListScreen;