import React from 'react'
import '../CSS/Subtotal.css'
import { useNavigate } from 'react-router-dom'

function Subtotal(props) {
    
    let {total} = props
    console.log(total)
    const navigate = useNavigate()

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
                    <button onClick={() => {navigate('/payment')}} className='btn-close-white'>Place Order</button>
                </div>
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     total: state.basket.total, // Map the total from the Redux state to props
// });

export default Subtotal;