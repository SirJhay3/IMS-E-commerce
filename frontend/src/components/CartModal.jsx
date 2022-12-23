import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useCartContext } from "../context/CartContext";
// import { mockProducts } from "../products";
// import cookie from "../assets/cookie.jpg";

const CartModal = ({ id, quantity }) => {
  const { removeCartItem } = useCartContext();
  const { data } = useQuery("cartModal-allProducts", () => {
    return axios.get("http://localhost:4000/stocks/view");
  });

  const item = data ? data.data.find((item) => item._id === id) : null;
  if (item === null) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between item-start">
        <img src={item.image.path} alt="" className="w-[3rem]" />

        <div className="flex justify-between items-center gap-10 ">
          <h2 className="text-secondary text-md">{item.productName}</h2>
          <p className="text-secondary text-md">{quantity}</p>
          <p className="text-secondary text-md">
            ₦ {item.unitPrice * quantity}
          </p>
        </div>

        <div
          className="text-xl flex justify-center items-center"
          onClick={(id) => removeCartItem(item._id)}
        >
          <MdDelete />
        </div>
      </div>
    </>
  );
};

export default CartModal;
