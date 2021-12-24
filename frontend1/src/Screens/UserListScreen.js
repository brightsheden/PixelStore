import React, { useEffect,useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button,Modal } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {listUsers,deleteUsers} from '../Actions/userAction'
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import {  FaCheck, FaEdit,  FaTrash} from 'react-icons/fa'

function UserListScreen({history}) {
    const dispatch= useDispatch()
    const userList = useSelector(state=> state.usersList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=> state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
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
            dispatch(deleteUsers(id))
            setShow(false)
        
    }

  

    return (
        <div>
            <h1>Users</h1>
            {loading ? (<Loader/>) :
            error ? (<Message variant="danger">{error}</Message>):
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>

                        </tr>
                     
                        
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <FaCheck style={{color: "green"}}/>
                                  
                                ):
                                (<FaCheck style={{color: "red"}}/>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light">
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" onClick={()=> handleShow()}>
                                            <FaTrash/>
                                        </Button>
                                        <Modal
                                                show={show}
                                                onHide={handleClose}
                                                backdrop='static'
                                                keyboard={false}

                                                
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirm Delete</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are You Sure ,You want to Delete this Project</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                                        <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(user._id)} >Delete</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
        </div>
    );
};

export default UserListScreen;