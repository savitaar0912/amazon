import React from 'react'
import '../CSS/Subtotal.css'
import { connect } from 'react-redux';

function Subtotal(props) {
    
    let {total} = props
    console.log(total)

    return (
        <div className="subtotal">
            <div className='checkout_right'>
                <h4 className='checkout_title'>
                    Cart Total: {total}
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

const mapStateToProps = (state) => ({
    total: state.counter.total, // Map the total from the Redux state to props
});

export default connect(mapStateToProps)(Subtotal);