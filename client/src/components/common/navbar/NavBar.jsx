import React , { useContext } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";

const NavBar = () => {

  const { basket } = useContext(StoreContext);
  const itemCount = basket?.basketItem.reduce((sum, item) => sum+item.quantity, 0)

  return (
    <>
      <nav>
        <Link to='/' className="nav-logo"><h5>Retail Store</h5></Link>
        <div className="menu">
          <NavLink to="/products" className="menu-item" >Products</NavLink>
          <NavLink to="/about" className="menu-item">Error</NavLink>
          <NavLink to="/contact" className="menu-item">Contact</NavLink>
        </div>
        <div className="menu">
          <Link to="/basket">
            <i className="fas fa-2x fa-shopping-cart"></i>
            <span className="position-absolute badge rounded-pill bg-danger" style={{ right: "235px" }} >
              {itemCount}
            </span>
          </Link>

          <div className="menu-item login">Login</div>
          <div className="menu-item">Register</div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
