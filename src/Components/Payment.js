import '../CSS/Payment.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyBasket, selectBasket, selectTotal } from '../Store/basketSlice/addbasket_reducer'
import { selectUserEmail } from '../Store/user/userSlice'
import CheckoutProduct from './CheckoutProduct'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import { db } from "../firebase"

export default function Payment() {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const basket = useSelector(selectBasket)
    const total = useSelector(selectTotal)
    const userEmail = useSelector(selectUserEmail)

    const [error, setError] = useState(null)
    const [disable, setDisable] = useState(true)
    const [succeeded, setSucceeded] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        // generate a stripe secret which allows us to charge a user
        const getClientSecret = async () => {
            try {
                const response = await axios.post(`/payments/create?total=${total}`, null);
                console.log(response)
                console.log(response.data.clientSecret)
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };
        getClientSecret();
        // eslint-disable-next-line
    }, []);

    console.log("The secret is >>>>", clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            }).then((payload) => {
                console.log("payload", payload)
                console.log("paymentIntent",payload.paymentIntent)
                console.log("paymentIntent amount",payload.paymentIntent.amount)
                
                db
                    .collection('users')
                    .doc(userEmail)
                    .collection('orders')
                    .doc(payload.id)
                    .set({
                        basket: basket,
                        amount: total,
                        created: payload.paymentIntent.created,
                    });
            });

            if (payload && payload.error) {
                setError(`Payment failed: ${payload.error.message}`);
                setSucceeded(true);
            } else {
                setError(null);
                setSucceeded(false);
                setProcessing(false);
                dispatch(emptyBasket());
                navigate('/orders');
            }
        } catch (error) {
            console.error('Error confirming card payment:', error);
            setError('An error occurred, please try again.');
            setProcessing(false);
        }
    };

    console.log("error", error)
    console.log("processing", processing)
    console.log("succeeded", succeeded)
    console.log("disable", disable)

    const handleChange = (e) => {
        setDisable(e.empty)
        setSucceeded(false)
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
                            <div><h3>Order Total :{total}</h3></div>
                            <button className='payment_paybtn' type="submit" disabled={processing || disable || succeeded}>
                                <span>
                                    {processing ? <p>Processing</p> : 'Buy Now'}
                                </span>
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
