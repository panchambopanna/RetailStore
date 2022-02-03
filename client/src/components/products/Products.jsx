import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/Products");
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "colomn",
          flexWrap: "wrap",
          gap: "3rem"
        }}
      >
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

