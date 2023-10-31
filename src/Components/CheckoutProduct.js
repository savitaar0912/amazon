import React from 'react'
import '../CSS/CheckoutProduct.css'
import { removeFromBasket } from '../Store/basketSlice/addbasket_reducer';
import { useDispatch } from 'react-redux';

export default function CheckoutProduct(props) {

    const { title, price, rating, image } = props;
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        // Dispatch the removeFromBasket action with the product details as the payload
        dispatch(removeFromBasket({ title, price, rating, image }));
    };

    return (
        <>
            <div className='CheckoutProduct'>
                <div className="checkout_product_info">
                    <div className="checkout_product_img">
                        <img src={image} alt="" />
                    </div>
                    <div className="productdetails">

                        <p>
                            <strong>{title}</strong>
                        </p>
                        <p className="checkout_product_price">
                            <small>$</small>
                            <strong>{price}</strong>
                        </p>
                        <p className="checkout_product_rating">
                            {Array(rating).fill().map((_, i) => {
                                return (<span key={i}>⭐</span>)
                            })}
                        </p>
                        <div className="removecart">
                            <button onClick={handleRemoveFromCart}>Remove from Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
