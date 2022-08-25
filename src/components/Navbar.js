import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = ({authenticated, setAuthenticated, setCurrentUser, setCartList}) => {
  const [dropDown, setDropDown] = useState("none");

  const handleClick = (event) => {
    event.preventDefault();
    if (dropDown === event.target.id) {
      setDropDown("none");
    } else {
      setDropDown(event.target.id);
    }
  };

  const resetDropDown = () => {
    setDropDown('none');
  }

  const handleLogOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('cart');
    setCurrentUser(null);
    setAuthenticated(false);
    setCartList([]);
    setDropDown('none');
  }
  
  const renderDropDown = () => {
    switch (dropDown) {
      default:
        return null;
      case "null":
        return null;
      case "profile":
        return (
          <div id="profile-dropdown">
            {authenticated?
              <Fragment>
                
                <Link to="/login" onClick={handleLogOut}>Logout</Link>
              </Fragment>:
              <Link to="/login" onClick={resetDropDown}>Login</Link>
            }
          </div>
        );
      case "cart":
        return (
          <div id="cart-dropdown">
            <Link to="/cart" onClick={resetDropDown}>View Cart</Link>
          </div>
        );
    }
  };

  return (
    <Fragment>
      <div id="navbar">
        <Link to="/" id="logo" onClick={resetDropDown}>
          camelCases
        </Link>
        <input id="searchbar" placeholder="Search..."></input>
        <button id="search-button">Search</button>
        <button className="navbar-button" id="cart" onClick={handleClick}>
          Cart
        </button>
        <button className="navbar-button" id="profile" onClick={handleClick}>
          Login
        </button>
      </div>
      {renderDropDown()}
    </Fragment>
  );
};

export default Navbar;