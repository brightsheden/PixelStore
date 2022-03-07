import React, { useEffect,useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button,Modal ,Image} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { getWithdrawalsList, deleteWithdrawal} from '../Actions/userAction'
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import {  FaCheck, FaEdit,  FaTrash} from 'react-icons/fa'

function WithdarawalListScreen({history}) {
    const dispatch= useDispatch()

    const withdarawlList = useSelector(state=> state.withdrawalList)
    const {loading,error,withdrawals} = withdarawlList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const withdrawalDelete = useSelector(state=> state.withdrawalDelete)
    const {success:successDelete} = withdrawalDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getWithdrawalsList())
        }else{
            history.push('/login')
        }
        
    },[dispatch,history,successDelete])

    const [show, setShow] = useState(false)
    const handleClose= ()=>{
        setShow(false)
    }
   
    const handleShow= ()=>{
       setShow(true)
   }
   

    const deleteHandler= (id)=>{
        
        if (window.confirm('Are you sure you want to delete this withdrawal?')) {
            dispatch(deleteWithdrawal(id))
        }
            
          //  setShow(false)
        
    }

  

    return (
        <div>
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
                        <th>IS_SUCCESS</th>
                        <th>EDIT/DELET</th>

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
                                    <FaCheck style={{color: "green"}}/> 
                                  
                                ):
                                (<FaCheck style={{color: "red"}}/>)} </td>
                                <td>
                                    <LinkContainer to={`/admin/withdraw/${withdraw._id}/edit`}>
                                        <Button variant="light">
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" onClick={()=> deleteHandler(withdraw._id)}>
                                            <FaTrash/>
                                        </Button>
                                        {/*<Modal
                                                show={show}
                                                onHide={handleClose}
                                                backdrop='static'
                                                keyboard={false}

                                                
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirm Delete</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are You Sure ,You want to Delete this profile </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                                        <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(withdraw._id)} >Delete</Button>
                                                    </Modal.Footer>
                                        </Modal>*/}
                                </td>

                                
                               
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
        </div>
    );
};

export default WithdarawalListScreen;