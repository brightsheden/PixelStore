// @flow strict

import  React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'

import {Row,Col,Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

//import { Link } from "react-router-dom";
import { listTemplates } from '../Actions/templateAction';
import Templates from '../Components/Template';
import Loader from '../Components/Loader';
import Message  from '../Components/Message';





function HomeScreen() {

    const  dispatch = useDispatch()
    const templateList = useSelector(state => state.templateList)
    const {error,loading,templates,} = templateList

    useEffect(()=>{
        dispatch(listTemplates())
        
       
 

    },[dispatch])
  
    
    return (
    
        
       
            
        <div>
        
        
        <h1>latest Templates</h1>
        {loading ? <Loader/> :
        error ? <Message variant='danger'>{error}</Message>:
    <div>
        <Row>
            {templates.map(template => (
            <Col key={template._id} sm={12} md={6} lg={4} xl={3}>
                <Templates template={template}/>
            </Col>
            ))}
    
        </Row>
       
    </div>
         }
        
    </div>
        
            
     
          


            
        
    );
};

export default HomeScreen;