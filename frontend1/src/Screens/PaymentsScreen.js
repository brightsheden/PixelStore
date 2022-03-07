// @flow strict
import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import { Form, Button, Row, Col, Table, Card, Container, ListGroup, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
//import  {useFlutterwave, FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import { PaystackButton } from 'react-paystack';
import { purchaseTemplate, payTemplate, templateUpdate } from '../Actions/templateAction'
//import Pay from '../Components/paystackButton'
import { PAY_TEMPLATE_RESET } from '../Constants/templateConstant'
import { updateWallets, } from "../Actions/userAction"
import {PayPalButton} from 'react-paypal-button-v2'
import axios from 'axios'
import Helmet from 'react-helmet'


var filedownload = require('js-file-download')
function PaymentsScreen({ match, history }) {
    const templateId = match.params.id
    const walletId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    //console.log(walletId )
   

    //const profile = localStorage.getItem("profiles")
    // console.log(profile?.wallet)


    const dispatch = useDispatch()

     

    const templatePay = useSelector(state => state.templatePay)
    const { loading: payLoading, error: payError, success: successPay } = templatePay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const depositWallet = useSelector(state => state.depositWallet)
    const { loading: loadingWallet, error: erroWallet, success: successDepositWallet,  } = depositWallet

    

    const TemplatePurchase = useSelector((state) => state.templatePurchase)
    const { templatePurchase } = TemplatePurchase


  
    
 
 

 
    useEffect(()=>{
        if(templatePurchase.price){
            setWallet(templatePurchase.price)
        }
    },[templatePurchase.price])
   
    const [wallet, setWallet] = useState(templatePurchase.price?(templatePurchase.price): {})
    
  


   
    
    useEffect(() => {
        //(registerTwoDetails ())
       
        

        //dispatch({ type: PAY_TEMPLATE_RESET })
        


        if (successPay  ) {

            dispatch(updateWallets({
                _id: templatePurchase.profile,
                wallet,
            }))
            handledownload()
            alert("your payment is successful || Download started ")
            
       
            dispatch({ type: PAY_TEMPLATE_RESET })
        
            
        }

       

        if( successDepositWallet){
            setWallet( templatePurchase.price ) 
            

        }    
        if (!userInfo) {
            history.push('/login')
        }
        if (templateId) {
            dispatch(purchaseTemplate(templateId))
            //dispatch(getWalletDetails(walletId))

        }
    

       
    }, [dispatch, templateId, userInfo, successPay])
    






    //payment success handler
    const paymentSuccessHandler = (paymentResult) => {
        

       
        dispatch(payTemplate(templateId, paymentResult))
       
        
       
    }
    const handledownload = (id) => {
        //dispatch(downloadTemplate(match.params.id))
        axios.get(`${templatePurchase?.templatefile}`, {
            responseType: 'blob',

        }).then(res => {
            filedownload(res.data, `${templatePurchase?.templatefile}`);
            console.log(res);
        }).catch(err => {
            console.log(err);
        })


    }







    return (
        <div>
            <Helmet>
                <title>Payment and Download</title>
                <meta  name='description' content='payment confirmation and download page'   />
            </Helmet>


            <Row>
                <h2>Payment confirmation</h2>

                <Col md={8}>
                    <ListGroup variant=
                        'flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col   >
                                    <Image src={templatePurchase?.thumbnail} alt={templatePurchase?.tittle} fluid rounded />

                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Name </Col>
                                <Col>{templatePurchase?.title}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price</Col>
                                <Col>{templatePurchase?.price}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>



                        </ListGroup.Item>

                        {!templatePurchase.isPaid && (
                                        <ListGroup.Item>
                                            {payLoading && <Loader />}

                                           
                                                    <PayPalButton
                                                        amount={templatePurchase?.price}
                                                        onSuccess={paymentSuccessHandler}
                                                        
                                                        
                                                        options={{
                                                            clientId: process.env.REACT_APP_PAYID
                                                        }}
                                                    />
                                             
                                        </ListGroup.Item>
                                    )}


                    </ListGroup>



                </Col>
            </Row>

        </div>
    );
};

export default PaymentsScreen;