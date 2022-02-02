import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const Products = (props) => {
  const { products } = props || {};

  return (
    <>List of Products!
      <div className="container-fluid my-3"
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
    </>
  );
};

export default Products;

Products.propTypes = {
  products: PropTypes.array.isRequired
};
