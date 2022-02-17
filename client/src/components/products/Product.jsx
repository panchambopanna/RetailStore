import React, { useContext } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const Product = (props) => {
  const { product } = props || {};
  const { setBasket } = useContext(StoreContext);

  const handleAddItem = (productId) => {
    agent.basket
      .addItems(product.id)
      .then((res) => setBasket(res))
      .then(() => toast("Item added to basket"))
      .catch((e) => e.message);
  };

  return (
    <>
      <div
        className="card"
        style={{
          width: "17rem",
          minHeight: "20rem",
          boxShadow: "2px 2px 10px gray",
          color: "white",
        }}
      >
        <img
          style={{
            height: "10rem",
            objectFit: "contain",
            objectPosition: "center",
          }}
          src={product.pictureUrl}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body" style={{ backgroundColor: "black" }}>
          <h6 className="card-title">{product.name}</h6>
          <p className="small card-text">
            {product.brand}/{product.type}
          </p>
          <p className="card-text">₹{product.price}/-</p>
          <button
            className="btn"
            style={{ border: "1px solid white", color: "white" }}
            onClick={() => {
              handleAddItem();
            }}
          >
            Add to Cart
          </button>
          <Link className="btn" style={{ color: "white" }} to={`${product.id}`}>
            View
          </Link>
        </div>
      </div>
    </>
  );
};

export default Product;
