
import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import {  FaCheck, FaEdit,  FaTrash,FaPlus} from 'react-icons/fa'
//import Paginate from '../components/Paginate'
import { listBlogs, blogDelete,createBlogs } from '../Actions/blogActions'
import { CREATE_BLOG_RESET } from '../Constants/blogConstants'
//import Helmet from 'react-helmet'
// @flow strict


function BlogScreeen({match,history}) {

    const dispatch = useDispatch()

    const blogLists = useSelector(state => state.bloglist)
    const {error,loading,blogs} = blogLists

    const deleteBlog = useSelector(state => state.deleteBlog)
    const {loading:loadingDelete, error:errorDelete, success:successDelete,} = deleteBlog

    
    const createBlogss = useSelector(state => state.createBlog)
    const {loading:loadingcreateBlog, error: errorcreateBlog,
        blogs: createdBlog,
        success:successCreateBlog} = createBlogss

        const updateBlogs = useSelector(state => state.updateBlog)
        const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, } = updateBlogs

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfile = useSelector(state => state.userProfileMore)
    const {profiles} = userProfile

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: CREATE_BLOG_RESET })

        if (!profiles.isStaff) {
            history.push('/')
        }
        if(successCreateBlog){
            
            history.push(`/admin/blog/${createdBlog._id}/edit/`)
            
            
        }
        else{
            dispatch(listBlogs())
        }                   

      
            
        

    }, [dispatch, history, userInfo, successCreateBlog,createdBlog, successDelete, successUpdate])


    const deleteHandler = (id) => {

      alert("are you sure you want to delete  this blog post")
        dispatch(blogDelete(id))
        setShow(false)
        
    }

    const createBlogHandler = (e)=>{
        dispatch(createBlogs())
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
           {/* <Helmet>
                <title>
                    Admin Blog Screen
                </title>
        </Helmet>*/}
              <Row className='align-items-center'>
                <Col>
                    <h1>All Blogs</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createBlogHandler}>
                        <FaPlus/> Create Blog
                    </Button>
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
                                        <th>TITLE</th>
                                        <th>CATEGORY</th>
                                        
                                        <th>edit /delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {blogs.map(blog => (
                                        <tr key={blog._id}>
                                            <td>{blog._id}</td>
                                            <td>{blog.author}</td>
                                            <td>{blog.title}</td>
                                            <td>{blog.category}</td>
                                          

                                            <td>
                                                <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <FaEdit/>
                                                        
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(blog._id)}>
                                                    <FaTrash/>
                                                </Button>
                                               
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            
                        </div>
                    )}
        </div>
    );
};

export default BlogScreeen;