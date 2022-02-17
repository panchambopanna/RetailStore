import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import agent from "../../api/axios";
import PageNotFound from "../common/PageNotFound";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../../context/StoreContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { basket, setBasket } = useContext(StoreContext);
  const [productDet, setProductDet] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const item = basket?.basketItem.find((i) => i.productId === productDet?.id);

  useEffect(() => {
    agent.catalog
      .details(parseInt(id))
      .then((product) => setProductDet(product))
      .catch((e) => console.log(e))
      .finally(setLoading(false));
  }, [id]);

  const handleAddItems = () => {
    agent.basket
      .addItems(id, quantity)
      .then((res) => setBasket(res))
      .then(() => toast(`${quantity} items been added to cart`))
      .catch((e) => e.message);
  };

  if (loading) return <Loading message="Loading product..." />;

  if (productDet === "") return <PageNotFound message="Product Not Found" />;

  return (
    <div className="container d-flex justify-content-evenly my-3">
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2000}
        type="error"
        hideProgressBar
      />
      <div>
        <img
          src={productDet.pictureUrl}
          alt={productDet.name}
          style={{ width: "30vw", height: "60vh" }}
        />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th colSpan={2} scope="col">
                <h1>{productDet.name}</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>
                <h1>₹{productDet.price}/-</h1>
              </td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>{productDet.brand}</td>
            </tr>
            <tr>
              <td>Desciption</td>
              <td>{productDet.description}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{productDet.type}</td>
            </tr>
            <tr>
              <td>Quantity in Stock</td>
              <td>{productDet.quantityInStock}</td>
            </tr>
          </tbody>
        </table>
        <div className="addItems">
          <label htmlFor="quantity">
            Quantity
            <input
              className="form-control my-1"
              type="number"
              id="quantity"
              min={1}
              max={productDet.quantityInStock}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <button className="btn btn-primary mx-3" onClick={handleAddItems}>
            {!item ? "Add to Cart" : "Update Quantity"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
