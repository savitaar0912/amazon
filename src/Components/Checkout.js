import React from 'react'
import '../CSS/Checkout.css'
import Subtotal from './Subtotal';

export default function Checkout() {
    return (
        <div className='checkout'>
            <div className="checkout_left">
                <img className='checkout_ad' src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="" />
                <h2 className="checkout_title">
                    Your Cart is Ready
                </h2>
            </div>
            <Subtotal value={453}/>
        </div>
    )
}
