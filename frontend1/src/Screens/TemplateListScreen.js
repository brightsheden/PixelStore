



import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import {  FaCheck, FaEdit,  FaTrash} from 'react-icons/fa'
//import Paginate from '../components/Paginate'
import { listTemplates, templateDelete, } from '../Actions/templateAction'

//import Parginate from '../components/Parginate'

function TemplateListScreen({ history, match }) {

    const dispatch = useDispatch()

    const templateList = useSelector(state => state.templateList)
    const {error,loading,templates,} = templateList


    const deleteTemplate = useSelector(state => state.deleteTemplate)
    const {loading:loadingDelete, error:errorDelete, success:successDelete,} = deleteTemplate

    


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        //dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }else{
            dispatch(listTemplates(keyword))
        }                   

      
            
        

    }, [dispatch, history, userInfo, successDelete,  keyword])


    const deleteHandler = (id) => {

      
        dispatch(templateDelete(id))
        setShow(false)
        
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
            <Row className='align-items-center'>
                <Col>
                    <h1>All Templates</h1>
                </Col>

             
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


           
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        
                                        <th>edit /delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {templates.map(template => (
                                        <tr key={template._id}>
                                            <td>{template._id}</td>
                                            <td>{template.title}</td>
                                            <td>{template.user}</td>
                                            <td>${template.price}</td>
                                            <td>{template.category}</td>
                                          

                                            <td>
                                                <LinkContainer to={`/admin/template/${template._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <FaEdit/>
                                                        
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => handleShow()}>
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
                            
                        </div>
                    )}
        </div>
    )
}

export default TemplateListScreen



