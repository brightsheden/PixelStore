// @flow strict



import React from 'react'
import {  FaStar, FaStarHalfAlt} from 'react-icons/fa'


function Rating({ value, text, color }) {
    return (
        <div className="rating">
            <span>
                <i style={{ color }} className={
                    value >= 1
                        ? (<FaStar/>)
                        : value >= 0.5
                            ? ( <FaStarHalfAlt/>)
                            : <FaStar/>
                }>

                </i>
            </span>

            <span>
                <i style={{ color }} className={
                    value >= 2
                        ? <FaStar/>
                        : value >= 1.5
                            ? <FaStarHalfAlt/>
                            : <FaStar/>
                }>

                </i>
            </span>

            <span>
                <i style={{ color }} className={
                    value >= 3
                        ? <FaStar/>
                        : value >= 2.5
                            ? <FaStarHalfAlt/>
                            : <FaStar/>
                }>

                </i>
            </span>

            <span>
                <i style={{ color }} className={
                    value >= 4
                        ? <FaStar/>
                        : value >= 3.5
                            ? <FaStarHalfAlt/>
                            : <FaStar/>
                }>

                </i>
            </span>

            <span>
                <i style={{ color }} className={
                    value >= 5
                        ? <FaStar/>
                        : value >= 4.5
                            ? <FaStarHalfAlt/>
                            : <FaStar/>
                }>

                </i>
            </span>

            <span>{text && text}</span>
        </div>
    )
}

export default Rating


