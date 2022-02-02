import React from "react";

const Product = (props) => {
  const { product } = props || {};

  return (
    <>
      <div>
        <div className="card" style={{ width: "17rem", minHeight: "20rem", boxShadow: "2px 2px 10px gray", color: "white" }}>
          <img style={{ height: '10rem', objectFit: "contain", objectPosition: "center" }} src={product.pictureUrl} className="card-img-top" alt="..." />
          <div className="card-body" style={{backgroundColor: "black"}}>
            <h6 className="card-title">{product.name}</h6>
            <p className="small card-text">
              {product.brand}/{product.type}
            </p>
            <p className="card-text">
              ₹{product.price}/-
            </p>
            <button className="btn" style={{border: "1px solid white", color:"white"}} >
              Add to Cart
            </button>
            <a href="/" style={{textDecoration:"none", color: "white", padding: "0px 10px"}} >
              View
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
