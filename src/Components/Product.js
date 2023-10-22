import "../CSS/Product.css"
import React from 'react'
import { increment, decrement } from "../Store/action/basketaction"

export default function Product(props) {
    let {title , price , rating , image } = props
    console.log(increment)
    return (
        <div className='product'>
            <div className="product_info">
                <p>
                    {title}
                </p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map((_,i)=>{
                        return (<span key={i}>⭐</span>)
                    })}
                </div>
            </div>
            <div className="product_img">
                <img src={image} alt="" />
            </div>
            <button onClick={increment}>Add to Cart</button>
        </div>
    )
}
