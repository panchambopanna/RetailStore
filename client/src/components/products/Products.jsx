import React, { useEffect, useState } from "react";
import Product from "./Product";
import agent from "../../api/axios";
import Loading from "../common/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [load, setload] = useState(true);


  useEffect(() => {
    agent.catalog.list().then(products => setProducts(products))
    .catch(e=>e.message)
    .finally(setload(false))
  }, []);

  if(load) return (<Loading />)

  return (
    <div className="container">
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

