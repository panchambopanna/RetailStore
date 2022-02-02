import React, { useEffect, useState } from "react";
import Products from "../products/Products";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async()=>{
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
    <div className="container my-3">
      <Products products = {products} />
    </div>
  );
};

export default Home;
