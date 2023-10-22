import React from 'react'
import '../CSS/Subtotal.css'

export default function Subtotal(props) {
    let value = props
    return (
        <div className="subtotal">
                    <div className='checkout_right'>
                        <h4 className='checkout_title'>
                            Cart Total: {value}
                        </h4>
                        <div className='checkout_gift'>
                            <input type="checkbox" name="checkout" id="" />
                            <span>This order contains a gift</span>
                        </div>
                        <div className='checkout_btn'>
                            <button className='btn-close-white'>Place Order</button>
                        </div>
                    </div>
        </div>
    )
}
