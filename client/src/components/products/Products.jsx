import React, { useEffect, useState } from "react";
import Product from "./Product";
import agent from "../../api/axios";
import Loading from "../common/Loading";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [load, setload] = useState(true);


  useEffect(() => {
    agent.catalog.list().then(products => setProducts(products))
    .catch(e=>e.message)
    .finally(setload(false))
  }, []);

  if(load) return <Loading message="Loading products..."/>

  return (
    <div className="container">
      <ToastContainer position='bottom-right' autoClose={2000} hideProgressBar />
      <h1>Products</h1>
      <div style={{ display: "flex", flexDirection: "colomn", flexWrap: "wrap", gap: "3rem" }}>
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

