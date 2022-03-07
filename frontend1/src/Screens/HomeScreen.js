// @flow strict

import  React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'

import {Row,Col,Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

//import { Link } from "react-router-dom";
import { listTemplates } from '../Actions/templateAction';
import Template from '../Components/Template';
import Loader from '../Components/Loader';
import Message  from '../Components/Message';
import Parginate from '../Components/Parginate';
import TemplateCarousel from '../Components/TemplateCarosel';
import { registerTwoDetails } from '../Actions/userAction';
import SearchBox from '../Components/searchBox';





function HomeScreen({history}) {

    const  dispatch = useDispatch()

    const templateList = useSelector(state => state.templateList)
    const {error,loading,page,pages,templates} = templateList


    let keyword = history.location.search
    
    useEffect(()=>{
        dispatch(listTemplates(keyword))
        
        
       
 

    },[dispatch,keyword])
  
    
    return (
    
        
       
            
        <div>
            <SearchBox/>
             {!keyword && <TemplateCarousel/>}
             
        
        
        <h1>Latest Templates</h1>
        {loading ? <Loader/> :
        error ? <Message variant='danger'>{error}</Message>:
    <div>
        <Row>
            {templates.map(template => (
            <Col key={template._id} sm={12} md={6} lg={4} xl={3}>
                <Template template={template}/>
            </Col>
            ))}
    
        </Row>
        <Parginate page={page} pages={pages} keyword={keyword}/>
       
    </div>
         }
        
    </div>
        
            
     
          


            
        
    );
};

export default HomeScreen;