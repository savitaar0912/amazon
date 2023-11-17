import '../CSS/Payment.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasket } from '../Store/basketSlice/addbasket_reducer'
import { selectUserEmail } from '../Store/user/userSlice'
import CheckoutProduct from './CheckoutProduct'

export default function Payment() {

    const basket = useSelector(selectBasket)
    const userEmail = useSelector(selectUserEmail)

    return (
        <div className='payment'>
            <h1> Checkout ( {basket.length} items) </h1>
            <div className="payment-container">
                <div className="payment-section">
                    <div className="payment-title">
                        <h2>Delivery Address:</h2>
                    </div>
                    <div className='payment-address'>
                        {userEmail}
                        <p>111/133 Harsh Nagar, Near Pal Accessories</p>
                        <p>Kanpur, UP</p>
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h2>Review your Items:</h2>
                    </div>
                    <div className='payment-items'>
                        {basket.map((item) => {
                            return <CheckoutProduct key={item.id} title={item.title} price={item.price} rating={item.rating} image={item.image} />
                        })}
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h2>Payment Method:</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
