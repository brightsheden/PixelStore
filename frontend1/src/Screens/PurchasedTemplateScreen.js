// @flow strict

import  React,{useEffect, useState} from 'react';
import { Form, Button, Row, Col, Table,Card,Container, ListGroup ,Image} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
//import  {useFlutterwave, FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import { PaystackButton } from 'react-paystack';
import { paidTemplate } from '../Actions/templateAction'
import { PAY_TEMPLATE_RESET } from '../Constants/templateConstant'
//import Earnings from '../Components/Earnings';


function PurchasedTemplateScreen({match,history}) {
    const templateId = match.params.id

    const dispatch= useDispatch()

    const purchasedTemplate = useSelector(state => state.purchasedTemplate)
    const {loading:loadingPuchase, error:errorPurchase, purchaseTemplate} = purchasedTemplate

    const templatePay = useSelector(state => state.templatePay)
    const {loading:payLoading, error:payError,success:successPay} = templatePay


    const userLogin = useSelector(state=> state.userLogin)
    const {loading,error,userInfo} = userLogin
    const [Earnings, setEarnings] = useState(0)

    //const seconds =  Date.now()
    //console.log(seconds)

    useEffect(()=>{
     
        if(  !userInfo ){
            
            history.push('/login')
           
        }else{
            
        if(templateId ){
            dispatch(paidTemplate(templateId))
        }}
       
        if(!purchaseTemplate.is_purchased){
           history.push('/')
           console.log("not purchase")
            
        }else{
          //  history.push('/profile')
            dispatch({type: PAY_TEMPLATE_RESET })
            console.log("purchase")
          setEarnings(Earnings + purchaseTemplate.price)
       }
      
        
    
      
      
    },[dispatch,templateId,userInfo,purchaseTemplate.is_purchased])
    console.log(purchaseTemplate.is_purchased)
    console.log(Earnings)


    return (
        <div>
            
        <a href='/' className="btn btn-light my-3">Go Back</a>
        <Row>
            <h2>Ready To Download</h2>
        
            <Col md={8}>
            <ListGroup variant=
            'flush'>
                <ListGroup.Item>
                    <Row>
                        <h1>{Earnings}</h1>
                        <Col   >
                            <Image src={purchaseTemplate.thumbnail} alt={purchaseTemplate.tittle} fluid rounded/>
                            
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Name </Col>
                        <Col>{purchaseTemplate.title}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Price</Col>
                        <Col>{purchaseTemplate.price}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    
              
                    <Row>
                        
                 
                        <Button href={purchaseTemplate.templatefile} download>Download</Button>
                  
                        
                    </Row>
                   
                </ListGroup.Item>


            </ListGroup>

            
            
            </Col>
        </Row>
        
    </div>
    );
};

export default PurchasedTemplateScreen;