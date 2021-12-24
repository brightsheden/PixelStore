// @flow strict

import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table,Card,Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import {  FaCheck, FaEdit, FaPlus, FaTrash} from 'react-icons/fa'
import { getUserDetails, registerTwoDetails, walletuser } from '../Actions/userAction'
import { listMyTemplates,createTemplates, templateDelete } from '../Actions/templateAction'
import { CREATE_TEMPLATE_RESET } from '../Constants/templateConstant'
import Earnings from '../Components/Earnings'




function Profilescreen({history}) {

    
    const userDetails = useSelector(state =>state.userDetails)
    const {loading:userDetailsLoading, error:userDetailsError , user} = userDetails
    const userLogin = useSelector(state => state.userLogin )
    const {userInfo} = userLogin
    
    const userProfileMore = useSelector(state => state.userProfileMore)
    const {profiles} = userProfileMore
 
    const myTemplate = useSelector(state => state.myTemplate)
    const {loading:loadingMytemplate, error: errorMytemplate, templates} = myTemplate

    const createTemplate = useSelector(state => state.createTemplate)
    const {loading:loadingcreateTemplate, error: errorcreateTemplate,
        templates: createdTemplate,
        success:successCreateTemplate} = createTemplate

    const updateTemplate = useSelector(state => state.updateTemplate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, } = updateTemplate

    const deleteTemplate = useSelector(state => state.deleteTemplate)
    const {loading:loadingDelete, error:errorDelete, success:successDelete,} = deleteTemplate


    const userWallet= useSelector(state => state.userWallet)
    const {loading:loadingWallet, error:erroWallet, success:successWallet,wallets } = userWallet


   

   // const {earnings, setEarings} = useState(0)


    const dispatch = useDispatch()

   useEffect(()=>{
       dispatch({type: CREATE_TEMPLATE_RESET})
     
       if(!userInfo){
           history.push('/login')
       }
       if(successCreateTemplate){
            
        history.push(`/admin/template/${createdTemplate._id}/edit`)
        
    }
    else{
        dispatch( listMyTemplates())
        dispatch( walletuser())
        dispatch(registerTwoDetails ())
        if (!user || !user.name || userInfo.name !== user.name  ) {
            dispatch(getUserDetails('profile'))
            
          
            
           
    
            
        } 
        
       
       }
     
   },[userInfo,dispatch,history,successCreateTemplate,createdTemplate,successUpdate,successDelete])

  
   const deleteHandler= (id)=>{
    
     dispatch(templateDelete(id))
     setShow(false)
    
  console.log("deleted")
   }

   
   const createTemplateHandler= (e)=>{
    dispatch(createTemplates())
    console.log("created")
}
 const [show, setShow] = useState(false)
 const handleClose= ()=>{
     setShow(false)
 }

 const handleShow= ()=>{
    setShow(true)
}

    
    

  
  

   
    return (
        
        <div>
            
          
            <Row>
            
            <Col>
             <h2>MY PROFILE</h2>
              <Card className="my-3 p-3 rounded">
                  <Card.Body >
                      <Card.Title>
                          USERNAME:
                          <h3>{user.name}</h3>
                      </Card.Title>

                      <Card.Title>
                        EARNINGS:{wallets?.map(wallet => (
                            <span key={wallet._id}><p>#{wallet.amount}</p></span>
                        ))}
                      
                      </Card.Title>

                  </Card.Body>

              </Card>
             </Col>
             <Col>
             <Row className='align-items-center'>
             <Col>
                    <h1>My Templates</h1>
                </Col>
                
            {userInfo.isAdmin && ( <Col className='text-right'>
                    <Button className='my-3' onClick={createTemplateHandler}>
                        <FaPlus/> Create Template
                    </Button>
                </Col>)}
              
            </Row>
            {loadingMytemplate && (<Loader/>)}
            {userInfo.isAdmin && (  <div>
                <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                       
                                        <th>TITLE</th>
                                        <th>IMAGE</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>IS_PAID</th>
                                        <th>PURCHASED</th>
                                        <th>EDIT/DELETE</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {templates?.map(template =>(
                                         <tr key={template._id}>
                                         <td>{template._id}</td>
                                         
                                         <td>{template.title}</td>
                                         <td><img src={template.thumbnail} style={{
                                             width: '50px',
                                             height: '50px'
                                         }} /></td>
                                         <td>{template.is_paid? template.price: <p>free</p>}</td>
                                         <td>{template.category}</td>
                                         <td>{template.is_paid ? <p>Yes</p>: (
                                               <p>NO</p>
                                            )}</td>
                                            <td>{template.paidAt ? <FaCheck style={{ color : 'green'}}/> : (
                                               <FaCheck style={{ color : 'red'}}/>
                                            )}</td>

                                         <td>
                                             <LinkContainer to={`/admin/template/${template._id}/edit`}>
                                                 <Button variant='light' className='btn-sm'>
                                                    <FaEdit/>
                                                 </Button>
                                             </LinkContainer>

                                             <Button variant='danger' className='btn-sm' onClick={handleShow}>
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
                                    <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(template._id)} >Delete</Button>
                                </Modal.Footer>
                            </Modal>
           
                                           
                                         </td>
                                     </tr>
                                 
                                    ))}
                                       
                                </tbody>
                            </Table>
                </div> )}
              
            
             
             </Col>
                
            </Row>
        </div>
    );
};

export default Profilescreen;