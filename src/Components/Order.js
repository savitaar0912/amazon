import React from 'react'
import '../CSS/Order.css'
import moment from 'moment/moment'
import CheckoutProduct from './CheckoutProduct';

function Order(props) {

    let { order } = props

    return (
        <div className='order'>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
            <p className="order_id">
                {order.id}
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideKey
                />
            ))}
            <h4 className='order_total'>Order Total : $ {order.data.amount}</h4>
        </div>
    )
}

export default Order
