// @flow strict

import * as React from 'react';
import {Card} from 'react-bootstrap'
import Rating from './Rating';
import { Link } from "react-router-dom";

function Templates({template}) {
    
    return (
        <Card className="my-3 p-3 rounded">
        <Link to={`/template/${template._id}`}>
            <Card.Img src={template.thumbnail}/>
        </Link>
        <Card.Body>
        <Link to={`/template/${template._id}`}>
            <Card.Title as='div'>
                <strong>{template.title}</strong>
            </Card.Title>

        </Link>

        <Card.Text as="div">
                <div className="my-3">
                    
                    <Rating value={template.rating} text={`${template.numReviews} reviews`} color={'#f8e825'}/>
                </div>

            </Card.Text>

            {template.is_paid ? ( <Card.Text as='h3'>
                ${template.price}
            </Card.Text>
): <Card.Text as='h3'>
$0.00
</Card.Text> }
           
        </Card.Body>
        </Card>
    );
};

export default Templates;