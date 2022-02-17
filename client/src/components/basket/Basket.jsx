import React, { useContext, useState } from "react";
import PageNotFound from "../common/PageNotFound";
import { StoreContext } from "../../context/StoreContext";
import Loading from "../common/Loading";
import agent from "../../api/axios";
import BasketSummary from "./BasketSummary";
import { Link } from 'react-router-dom';

const Basket = () => {
  const { basket, setBasket } = useContext(StoreContext);
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 2500);

  const handleAddItems = (productId) => {
    agent.basket
      .addItems(productId)
      .then((res) => setBasket(res))
      .catch((e) => e.message);
  };

  const handleRemoveItems = (productId, quantity = 1) => {
    agent.basket
      .removeItems(productId, quantity)
      .then((res) => setBasket(res))
      .catch((e) => e.message);
  };

  if (load) return <Loading message="Loading your cart..." />;

  if (!basket || basket.basketItem.length === 0)
    return <PageNotFound message="Your basket is empty" />;

  return (
    <div className="container">
      <h1>Your Basket</h1>
      <div
        className="container d-flex"
        style={{ gap: "10px", alignItems: "flex-start" }}
      >
        <table className="table">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sub-total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-striped">
            {basket.basketItem.map((e) => (
              <tr key={e.productId}>
                <td>{e.name}</td>
                <td style={{ textAlign: "center" }}>₹{e.price / 100} </td>
                <td style={{ textAlign: "center" }}>
                  <i
                    className="fas fa-minus-circle"
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => {
                      handleRemoveItems(e.productId);
                    }}
                  />
                  {e.quantity}
                  <i
                    className="fas fa-plus-circle"
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => {
                      handleAddItems(e.productId);
                    }}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  ₹{(e.price / 100) * e.quantity}{" "}
                </td>
                <td style={{ textAlign: "center" }}>
                  <i
                    className="fas fas-2x fa-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemoveItems(e.productId, e.quantity);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <BasketSummary />
      </div>
      <button style={{float:'right'}} type="button" className="btn btn-success">
          <Link to="/checkout">Checkout</Link>
        </button>
    </div>
  );
};

export default Basket;
