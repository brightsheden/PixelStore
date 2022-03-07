// @flow strict

import * as React from 'react';
import { Container,Col,Row } from "react-bootstrap";
import { Link } from 'react-router-dom';



function Footer() {
    return (
        <div>
            <Container>
                
                <Row>
         
                <Col className="text-center py-3">Copyright &copy; 2021-2022 || <Link to='terms'>Terms and Conditions</Link> || <Link to='aboutus'>About PlpFactory</Link> || <Link to='faq'>Faqs</Link> </Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default Footer;