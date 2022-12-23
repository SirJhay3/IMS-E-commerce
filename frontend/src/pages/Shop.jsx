import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Products from "../components/Products";
// import { mockProducts } from "../products";

const Shop = () => {
  const { data } = useQuery("allProducts", () => {
    return axios.get("http://localhost:4000/stocks/view");
  });
  return (
    <div className="shop">
      <Products
        text={"Take a tour of bites"}
        products={data ? data.data : []}
        number={data ? data.data.length : null}
      />
    </div>
  );
};

export default Shop;
