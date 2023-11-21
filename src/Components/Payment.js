import '../CSS/Payment.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectBasket, selectTotal } from '../Store/basketSlice/addbasket_reducer'
import { selectUserEmail } from '../Store/user/userSlice'
import CheckoutProduct from './CheckoutProduct'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

export default function Payment() {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const basket = useSelector(selectBasket)
    const total = useSelector(selectTotal)
    const userEmail = useSelector(selectUserEmail)

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(true)
    const [processing, setProcessing] = useState("")
    const [clientSecret, setClientSecret] = useState(true)


    useEffect(() => {
        //generate a stripe secret which allows us to charge a user
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${total}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])



    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true)

        // const cardElement = elements.getElement(CardElement);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            navigate('/orders')
        })
    }

    const handleChange = (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }

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
                    <div className="payment-card">
                        <form onSubmit={handleSubmit}>
                            <CardElement className='card-element' onChange={handleChange} />
                            <button className='payment_paybtn' type="submit" disabled={processing || disabled || succeeded}>
                                {processing ? 'Processing' : 'Buy Now'}
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
