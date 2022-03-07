import React, { useEffect,useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button,Modal ,Image} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {listUsers,deleteUsers, listProfiles, deleteProfiles} from '../Actions/userAction'
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import {  FaCheck, FaEdit,  FaTrash} from 'react-icons/fa'
import { listSellers, sellerDelete } from '../Actions/sellerFormActions';

function SellerScreen({history}) {
    const dispatch= useDispatch()

    const sellerList = useSelector(state=> state.sellerList)
    const {loading,error,sellers} = sellerList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const deleteSeller = useSelector(state => state.sellerDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete,} = deleteSeller

   

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listSellers())
        }else{
            history.push('/login')
        }
        
    },[dispatch,history, successDelete])

    const [show, setShow] = useState(false)
    const handleClose= ()=>{
        setShow(false)
    }
   
    const handleShow= ()=>{
       setShow(true)
   }
   

    const deleteHandler= (id)=>{

        if (window.confirm('Are you sure you want to delete this profile?')) {
            dispatch(sellerDelete(id))
        }
          
            
        
    }

  

    return (
        <div>
            <h1>Seller Forms </h1>
            {loading ? (<Loader/>) :
            error ? (<Message variant="danger">{error}</Message>):
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>USERNAME</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>IS_PAID</th>
                        <th>PAID_AT</th>
                        <th>TIME</th>
                        <th>DELETE</th>
                   

                        </tr>
                     
                        
                    </thead>
                    <tbody>
                        {sellers?.map(seller=>(
                            <tr key={seller._id}>
                                <td>{seller.username}</td>
                                <td>{seller.email}</td>
                                <td>{seller.amount}</td>
                               
                               
                                <td>{seller.isPaid ? (
                                    <FaCheck style={{color: "green"}}/>
                                  
                                ):
                                (<FaCheck style={{color: "red"}}/>)}</td>

                                <td>{seller.paidAt?.slice(0,10)}</td>
                                <td>{seller.paidAt?.slice(11,16)}</td>

                                
                                <td>

                                                <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(seller._id)}>
                                                    <FaTrash/>
                                                </Button>
                                               
                                            </td>
                                
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
        </div>
    );
};

export default SellerScreen;