import React, { useEffect,useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button,Modal ,Image} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {listUsers,deleteUsers, listProfiles, deleteProfiles} from '../Actions/userAction'
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import {  FaCheck, FaEdit,  FaTrash} from 'react-icons/fa'
import Helmet from 'react-helmet';

function ProfileListScreen({history}) {
    const dispatch= useDispatch()

    const profileList = useSelector(state=> state.profilesList)
    const {loading,error,profiles} = profileList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const profileDelete = useSelector(state=> state.profileDelete)
    const {success:successDelete} = profileDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listProfiles())
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

        if (window.confirm('Are you sure you want to delete this profile?')) {
            dispatch(deleteProfiles(id))
        }
          
            
        
    }

  

    return (
        <div>
            <Helmet>
                <tile>User and Wallets details</tile>
            </Helmet>

            <h1>Users Profiles and Wallets Details </h1>
            {loading ? (<Loader/>) :
            error ? (<Message variant="danger">{error}</Message>):
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>NAME</th>
                        <th>NICKNAME</th>
                        <th>IMAGE</th>
                        <th>OCCUPATION</th>
                        <th>COUNTRY</th>
                        <th>WALLET</th>
                        <th>SELLER</th>
                        <th>STAFF</th>
                        <th>EDIT/DELET</th>

                        </tr>
                     
                        
                    </thead>
                    <tbody>
                        {profiles.map(profile=>(
                            <tr key={profile._id}>
                                <td>{profile.name}</td>
                                <td>{profile.nickname}</td>
                                <td><Image src={profile.photo} style={{
                                             width: '50px',
                                             height: '50px'
                                         }} /></td>
                                <td>{profile.occupation}</td>
                                <td>{profile.country}</td>
                                <td>{profile.wallet}</td>
                                <td>{profile.isSeller ? (
                                    <FaCheck style={{color: "green"}}/>
                                  
                                ):
                                (<FaCheck style={{color: "red"}}/>)}</td>

                                <td>{profile.isStaff ? (
                                    <FaCheck style={{color: "green"}}/>
                                  
                                ):
                                (<FaCheck style={{color: "red"}}/>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/profile/${profile._id}/edit`}>
                                        <Button variant="light">
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" onClick={()=> deleteHandler(profile._id)}>
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
                                                        <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(profile._id)} >Delete</Button>
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

export default ProfileListScreen;