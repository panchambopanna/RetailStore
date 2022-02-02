import React from "react";
import "./NavBar.css"

const NavBar = () => {
  return (
    <>
      <nav>
        <div className="nav-logo"><h5>Retail Store</h5></div>
        <div className="menu">
          <div className="menu-item">Home</div>
          <div className="menu-item login">Login</div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
