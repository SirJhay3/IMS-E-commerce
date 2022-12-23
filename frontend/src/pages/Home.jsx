import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Products from "../components/Products";
import ShowCase from "../components/ShowCase";
// import { mockProducts } from "../products";

const Home = () => {
  const { data } = useQuery("randomStocks", () => {
    return axios.get("http://localhost:4000/stocks/random");
  });
  return (
    <>
      <ShowCase />

      {data && (
        <Products
          text={"Get the latest cookie for a bite"}
          products={data.data}
          number={data.data.length}
        />
      )}
      {/* <Products
          text={"Get the latest cookie for a bite"}
          products={mockProducts}
          number={12}
        /> */}
    </>
  );
};

export default Home;
