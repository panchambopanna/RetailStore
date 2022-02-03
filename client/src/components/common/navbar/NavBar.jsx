import React from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  
  return (
    <>
      <nav>
        <Link to = '/' className="nav-logo"><h5>Retail Store</h5></Link>
        <div className="menu">
          <NavLink to="/products" className="menu-item" >Products</NavLink>
          <NavLink to="/about" className="menu-item">About</NavLink>
          <NavLink to="/contact" className="menu-item">Contact</NavLink>
        </div>
        <div className="menu">
          <div>
            <img className="menu-item" src='../../../favicon.ico' alt="cart" />
            <span className="position-absolute badge rounded-pill bg-danger" style={{ right: "235px" }} >
              5
            </span>
          </div>

          <div className="menu-item login">Login</div>
          <div className="menu-item">Register</div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
