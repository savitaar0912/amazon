import "../CSS/Product.css"
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { addToBasket } from "../Store/basketSlice/addbasket_reducer";

function Product(props) {
    let { title, price, rating, image, addToBasket, items } = props

    const handleAddToCart = () => {
        // Dispatch the addToBasket action with the product price as the payload
        addToBasket({ title, price, rating, image });
    };

    useEffect(() => {
        // to check if items are being sent to data layer(store)
        // console.log(items)
    }, [items])

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
    items: state.counter.items,
});

export default connect(mapStateToProps, { addToBasket })(Product);