
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { templateUpdate,listTemplateDestails} from '../Actions/templateAction'
import { UPDATE_TEMPLATE_RESET, TEMPLATE_DETAILS_RESET } from '../Constants/templateConstant'


function TemplateEditScreen({match, history}) {
    const templateId = match.params.id

    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [file, setFile] = useState("")
    const [description, setDescription] = useState('')
    const [is_paid, setIs_paid] = useState(false)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    
    const templateDetails = useSelector(state => state.templateDetails)
    const {loading,error,template} = templateDetails

    const updateTemplate = useSelector(state => state.updateTemplate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, } = updateTemplate


    useEffect(() => {

        if(successUpdate){
            dispatch({type:UPDATE_TEMPLATE_RESET})
            history.push('/profile')
            
        }else{
            if(!template.title || template._id !== Number(templateId)){
                dispatch(listTemplateDestails(templateId))
            } else {
                setTitle(template.title)
                setThumbnail(template.thumbnail)
                setCategory(template.category)
                setPrice(template.price)
                setImage1(template.image1)
                setImage2(template.image2)
                setImage3(template.image3)
                setFile(template.templatefile)
                setIs_paid(template.is_paid)
                setDescription(template.description)
        }

        }
        
   
           
    }, [dispatch,history,template,templateId, successUpdate])




   // useEffect(()=>{
       // if(successUpdate){
     ///       dispatch({type:PROJECTS_UPDATE_RESET})
       //     history.push('/profile')
        //}else{
        //    if(!project.title || project._id !== projecttId){
        //        dispatch(listProjectDestails(productId))
         //   }else
           // {
            //    setTitle(project.title)
            //    setDemolink(project.demolink)
            //    setGithub(project.github)
            //    setImage(project.image)
            //    setFile(project.projectfile)
            //    setDescription(project.description)
            //}
        //}

   // },[dispatch,history,project,projecttId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(templateUpdate(
            {
                _id:  template._id,
                title,
                thumbnail,
                category,
                price,
                image1,
                image2,
                image3,
                file,
                is_paid,
                description
            }
        ))
        console.log("updated")
       // history.push('/profile')
       //dispatch(updateUsers ({ _id: user._id, name, email, isAdmin }))
    }

    const uploadThumbnailHandler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('template_id', templateId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/template/thumbnail/", formData,config)
            setUploading(false)
            setThumbnail(data)
        } catch (error) {
            setUploading(false)
            
        }

    }

    const uploadImage1Handler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('template_id', templateId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/template/screenshot1/", formData,config)
            setUploading(false)
            setImage1(data)
        } catch (error) {
            setUploading(false)
            
        }

    }

    const uploadImage2Handler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('template_id', templateId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/template/screenshot2/", formData,config)
            setUploading(false)
            setImage2(data)
        } catch (error) {
            setUploading(false)
            
        }

    }

    const uploadImage3Handler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('template_id', templateId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/template/screenshot3/", formData,config)
            setUploading(false)
            setImage3(data)
        } catch (error) {
            setUploading(false)
            
        }

    }

    const uploadZipFileHandler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file',file)
        formData.append('template_id', templateId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.put("http://127.0.0.1:8000/api/template/templatefile/", formData,config)
            setUploading(false)
            setFile(data)
        } catch (error) {
            setUploading(false)
            
        }

    }



    return loading ? (<Loader/>) :
     error? (<Message variant="danger">{error}</Message>):
      (
        <div>
            <Link to='/profile'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Template</h1>
                        {loadingUpdate && <Loader/>}
                        {errorUpdate && <Message variant="danger">{error}</Message>}

                        {loading? (<Loader/>): error? (<Message variant="danger">{error}</Message>)
                            :
                            (
                                <Form onSubmit={submitHandler}>

                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='choose image'
                                    value={thumbnail}
                                    onChange={(e) => setThumbnail(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="thumbnail-file"
                                 label="choose thumbnail"
                                 custom
                                 onChange={uploadThumbnailHandler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                as="select"
                                value={category}
                                onChange={(e)=>setCategory(e.target.value)}
                                >
                                    <option value="" >Select  Category</option>
                                    <option value="Banner" >Banner</option>
                                    <option value="Fliers" >Fliers</option>
                                    <option value="Cards" >Cards</option>
                                    <option value="Logos" >Logos</option>
                                    <option value="Social media design " >Social Media Design</option>
                                    <option value="Birthday " >Birthday Design</option>
                                    <option value="wedding " >Wedding Design</option>
                               
                                </Form.Control>
                                </Form.Group>

                           

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image1'>
                                <Form.Label>screenshot1</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='choose screenshot1'
                                    value={image1}
                                    onChange={(e) => setImage1(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="image1"
                                 label="select photo"
                                 custom
                                 onChange={uploadImage1Handler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='image2'>
                                <Form.Label>Screenshot2</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='choose image'
                                    value={image2}
                                    onChange={(e) => setImage2(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="thumbnail-file"
                                 label="choose thumbnail"
                                 custom
                                 onChange={uploadImage2Handler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='image3'>
                                <Form.Label>screenshot3</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='choose image'
                                    value={image3}
                                    onChange={(e) => setImage3(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="thumbnail-file"
                                 label="choose thumbnail"
                                 custom
                                 onChange={uploadImage3Handler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='file'>
                                <Form.Label>File</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='choose file'
                                    value={file}
                                    onChange={(e) => setFile(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="zip-file"
                                 label="choose Template-file"
                                 custom
                                 onChange={uploadZipFileHandler }
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='isPaid'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is_paid'
                                    checked={is_paid}
                                    onChange={(e) => setIs_paid(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}

                                >
                                </Form.Control>
                            </Form.Group>

                           

                           

                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    
                            )}        
                    
                        

            </FormContainer >
        </div>

    );
};

export default TemplateEditScreen;