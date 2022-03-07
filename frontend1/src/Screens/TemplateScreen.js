// @flow strict

import  React,{useState,useEffect} from 'react';
import {Link,} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card,Form,Carousel} from 'react-bootstrap'
import Rating from '../Components/Rating';
//import products from '../products';
import { useDispatch,useSelector } from "react-redux";

import { listTemplateDestails } from '../Actions/templateAction';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { createTemplateReview } from '../Actions/templateAction';
import { REVIEW_TEMPLATE_RESET } from '../Constants/templateConstant';
import axios from 'axios'
import Helmet from 'react-helmet';

//import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

var filedownload = require('js-file-download')
function TemplateScreen({match,history}) {
    //const product = products.find((p)=> p._id === match.params.id)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()
    const  templateDetails = useSelector(state=> state.templateDetails)
    const {error,loading,template} =  templateDetails

    const templateReview = useSelector(state=> state.templateReview)
    const {error:errorReview,loading:loadingReview,success:successReview} = templateReview

    
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

   

   useEffect(()=>{
    if(successReview){
        setRating(0)
        setComment("")
        dispatch({type:REVIEW_TEMPLATE_RESET })
    }
       dispatch(listTemplateDestails(match.params.id))
      
   },[dispatch,match,successReview])

 



   
  const addTemplateForP = ()=>{
      history.push(`/payment/${match.params.id}`)
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createTemplateReview(
        match.params.id, {
            rating,
            comment
        }
    ))

}

const handledownload = (id)=>{
    //dispatch(downloadTemplate(match.params.id))
    axios.get(`${template.templatefile}`,{
        responseType:  'blob',

    }).then(res => {filedownload(res.data, `${template.templatefile}`);
console.log(res);}).catch(err=>{
    console.log(err);
})
}


   

    

    
    return (
        <div>
                <Helmet>
                    
                <title>{template.title}</title>
                <meta name='description' content={template.description} />
                <meta  property="og:title" content={template.title} data-rh="true"/>
                <meta  property="og:description" content={template.description} data-rh="true"/>
                <meta  property="og:image" content={template.thumbnail} data-rh="true"/>
            </Helmet>

            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/> 
                : error ? <Message variant="danger">{error}</Message> : (
                    <div>
                    <Row>
                <Col md={6}>
                 <Image src={template.thumbnail} alt={template.title} fluid/>
                 <br/>
                </Col>
             
              <br/>
           

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{template.title}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={template.rating} text={`${template.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Category: {template.category}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Creator: {template.creator}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${template.price}
                        </ListGroup.Item>

                    

                        <ListGroup.Item>
                            description: {template.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                
            
                

                <Col md={3}>
                    <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    {template.is_paid && <Row>
                            <Col> Price:</Col>
                            <Col>${template.price}</Col>
                        </Row>}
                        {!template.is_paid &&  <Row>
                            <Col> Price:</Col>
                            <Col>Free</Col>
                        </Row>}
                        

                    </ListGroup.Item>
                    
                    {template.is_paid? (<ListGroup.Item>
                        
                        <h3>Template file</h3>
                        <Button onClick={addTemplateForP}>Pay</Button>
                      
                         
                    </ListGroup.Item>
               ): <ListGroup.Item>
                        
               <h3>File/code</h3>
               <Button onClick={handledownload}>Download</Button>
              
               
                
           </ListGroup.Item>
      }
                    

              
                    </ListGroup>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col md={6}>
                <h4>Reviews</h4>
                {template.reviews.length === 0 && <Message variant="info">No Reviews</Message>}
                <ListGroup variant="flush">
                    {template.reviews.map((review)=>(
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color="#f8e825"/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>

                        </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                        <h4>Write a reviews</h4>

                        {loadingReview && <Loader/>}
                        {successReview && <Message variant="success" >Review created</Message>}
                        {errorReview && <Message variant="danger" >{errorReview}</Message>}
                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e)=>setRating(e.target.value)}
                                >
                                    <option value="" >Select...</option>
                                    <option value="1" >1 - Poor</option>
                                    <option value="2" >2 - Fair</option>
                                    <option value="3" >3 - Good</option>
                                    <option value="4" >4 - Very Good</option>
                                    <option value="5" >5 - Excellent</option>
                                </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId="comment">
                                    <Form.Label>Reviews</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        row="5"
                                        value={comment}
                                        onChange={(e)=>setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                    <Button
                                    disabled={loadingReview}
                                    type="submit"
                                    variant="primary">
                                    
                                    submit
                                </Button>
                            </Form>
                        ):(
                            <Message variant="info">Please <Link to="/login">Login</Link> to write  reviews</Message>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            
            </Col>
        </Row>
        </div>
                )}
            
        </div>
    );
};

export default TemplateScreen
;