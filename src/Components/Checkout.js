import React from 'react'
import '../CSS/Checkout.css'
import Subtotal from './Subtotal';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectBasket } from '../Store/basketSlice/addbasket_reducer';
import CheckoutProduct from './CheckoutProduct';

function Checkout(props) {

    const basketItems = useSelector(selectBasket)
    console.log(basketItems)
    // const title = [...basketItems]
    // console.log(title)

    return (
        <div className='checkout'>
            <div className="checkout_left">
                <img className='checkout_ad' src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="" />
                <h2 className="checkout_title">
                    Your Cart is Ready
                </h2>
                {basketItems.map((item) => {
                    return <CheckoutProduct key={item.id} title={item.title} price={item.price} rating={item.rating} image={item.image} />
                })}
            </div>
            <Subtotal count={props.count} total={props.total} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    count: state.counter.count,
    total: state.counter.total,
});

export default connect(mapStateToProps)(Checkout);
