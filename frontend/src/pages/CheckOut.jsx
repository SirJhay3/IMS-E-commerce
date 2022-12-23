import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
// import { mockProducts } from "../products";
// import cookie from "../assets/cookie.jpg";

const CheckOutItems = ({ id, quantity, data }) => {
  const { removeCartItem } = useCartContext();

  const item = data ? data.data.find((item) => item._id === id) : null;
  if (item === null) {
    return null;
  }

  return (
    <div className="flex flex-col justify-around w-full items-center md:flex-row">
      <img src={item.image.path} alt="" className="w-[5rem]" />
      <div className="flex justify-between items-center gap-10 ">
        <h2 className="text-secondary text-md">{item.productName}</h2>
        <p className="text-secondary text-md">{quantity}</p>
        <p className="text-secondary text-md">₦{item.unitPrice * quantity}</p>
      </div>

      <div className="text-xl" onClick={(id) => removeCartItem(item._id)}>
        <MdDelete />
      </div>
    </div>
  );
};

const CheckOut = () => {
  const navigate = useNavigate();
  const { storeName: customerName } = JSON.parse(
    localStorage.getItem("userInfo")
  );
  const { cartItems, setCartItems } = useCartContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useQuery("checkOut-allProducts", () => {
    return axios.get("http://localhost:4000/stocks/view");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      items: cartItems,
      totalAmount,
      customerName,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/orders",
        payload
      );
      setIsLoading(false);
      toast.success(response.data.message);
      setCartItems([]);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    var total = 0;
    if (data) {
      for (var i = 0; i < cartItems.length; i++) {
        var item = data.data.find((item) => item._id === cartItems[i].id);
        total = total + item.unitPrice * cartItems[i].quantity;
      }
      setTotalAmount(total);
    }
  }, [cartItems, data]);

  return (
    <section className="ptop w-[96%] mx-auto pt-4 px-3 py-4 md:w-[30rem] bg-gray-300 ">
      <div className="flex flex-col justify-between mt-5 items-start space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CheckOutItems
              id={item.id}
              quantity={item.quantity}
              key={item.id}
              data={data}
            />
          ))
        ) : (
          <p>You have no items in cart!</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <p className="flex justify-center mt-4">
          {" "}
          Total Amount: ₦ {totalAmount}
        </p>
      )}

      {cartItems.length > 0 && (
        <button
          className=" flex justify-center items-center gap-3 capitalize px-3 py-2 bg-orange text-xl font-semibold rounded drop-shadow-md text-secondary mt-5 hover:border-2 hover:border-orange"
          onClick={handleSubmit}
        >
          Check Out
          {isLoading && (
            <svg
              className="animate-spin h-7 w-7 mr-3 text-white"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white"
              />
              <path
                d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                fill="white"
              />
            </svg>
          )}
        </button>
      )}
    </section>
  );
};

export default CheckOut;
