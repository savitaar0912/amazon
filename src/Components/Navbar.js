import "../CSS/Navbar.css"
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Navbar(props) {
  return (
    <div className='nav_bar'>
      <div className="navbar_logo">
        <Link to="/">
          <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon.in" />
        </Link>
      </div>

      <div className="address navbar_option">
        <span className="line1">
          Deliver to
          <LocationOnIcon className="location" />
        </span>
        <span className="line2">
          Address
        </span>
      </div>

      <div className="searchbox navbar_opt">
        <input type="search" name="search" id="search" />
        <SearchIcon className="navbar_search" />
      </div>

      <div className="navbar_nav">

        <div className="navbar_opt">
          <img className="flag" src="https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY=" alt="" />
          <span className='line2'>EN</span>
        </div>

        <div className="navbar_option">
          <span className="line1">
            Hello, sign in
          </span>
          <span className="line2">
            Accounts & Lists
          </span>
        </div>

        <div className="navbar_option">
          <span className="line1">
            Returns
          </span>
          <span className="line2">
            & Orders
          </span>
        </div>
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
  count: state.counter.count,
});

export default connect(mapStateToProps)(Navbar);
