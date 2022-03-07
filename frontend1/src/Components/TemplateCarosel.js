import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

import { listTopTemplate } from '../Actions/templateAction'

function TemplateCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.templateTopRated)
    const { error, loading, templates } = productTopRated

    useEffect(() => {
        dispatch(listTopTemplate())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {templates .map(template => (
                        <Carousel.Item key={template._id}>
                            <Link to={`/template/${template._id}`}>
                                <Image src={template.thumbnail} alt={template.title} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{template.title} (${template.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default TemplateCarousel

// @flow strict

