import "../CSS/Navbar.css"
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectUserEmail, setUserLogout } from "../Store/user/userSlice";
import { auth } from "../firebase";

function Navbar(props) {

  const userEmail = useSelector(selectUserEmail)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAuthentication = () => {
    console.log('handleAuthentication called');
    if (userEmail) {
      console.log('Signing out...');
      auth.signOut()
        .then(() => {
          console.log('Sign-out successful');
          dispatch(setUserLogout());
          navigate('/')
        })
        .catch((error) => {
          console.error('Sign-out error:', error.message);
        });
    }
  }

  return (
    <div className='nav_bar'>
      <div className="navbar_logo">
        <Link to="/">
          <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon.in" />
        </Link>
      </div>

      <div className="address navbar_option hide">
        <span className="line1">
          Deliver to
          <LocationOnIcon className="location" />
        </span>
        <span className="line2">
          Address
        </span>
      </div>

      <div className="searchbox navbar_opt hide">
        <input type="search" name="search" id="search" />
        <SearchIcon className="navbar_search" />
      </div>

      <div className="navbar_nav">

        <div className="navbar_opt hide">
          <img className="flag" src="https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY=" alt="" />
          <span className='line2'>EN</span>
        </div>

        <Link to={!userEmail && '/login'}>
          <div className="navbar_option" onClick={handleAuthentication}>
            <span className="line1">
              Hello, {userEmail ? `${userEmail.slice(0, userEmail.indexOf('@'))}` : 'Sign In'}
            </span>
            <span className="line2">
              Accounts & Lists
            </span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="navbar_option hide">
            <span className="line1">
              Returns
            </span>
            <span className="line2">
              & Orders
            </span>
          </div>
        </Link>
        
        <div className="navbar_opt">
          <Link to="/checkout">
            <ShoppingCartIcon className="navbar_cart" />
            <span className="line2 navbar_cart_count">{props.count} Cart</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  count: state.basket.count,
});

export default connect(mapStateToProps)(Navbar);
