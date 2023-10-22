import "../CSS/Product.css"
import React from 'react'
import { connect } from 'react-redux';
import { addToBasket } from "../Store/basketSlice/addbasket_reducer";

function Product(props) {
    let { title, price, rating, image , addToBasket } = props

    const handleAddToCart = () => {
        // Dispatch the addToBasket action with the product price as the payload
        addToBasket({price});
    };

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
                    {Array(rating).fill().map((_, i) => {
                        return (<span key={i}>⭐</span>)
                    })}
                </div>
            </div>
            <div className="product_img">
                <img src={image} alt="" />
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    count: state.counter.count,
    total: state.counter.total,
});

export default connect(mapStateToProps, { addToBasket })(Product);