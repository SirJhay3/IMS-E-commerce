import React from "react";
import { Button } from "./Button";
import Card from "./Card";
import productImg from "../assets/cookie.jpg";
import { useCartContext } from "../context/CartContext";

const Product = ({ product }) => {
  const {
    getCartQuantity,
    addToCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeCartItem,
  } = useCartContext();

  const quantity = getCartQuantity(product._id);

  return (
    <Card>
      <img
        src={product.image.path || productImg}
        alt=""
        className="w-[272px] h-[185px]"
      />
      <div className="flex justify-between items-center w-full mt-2">
        <h2 className="text-xl">{product.productName}</h2>
        <p className="text-md text-orange">₦{product.unitPrice}</p>
      </div>
      {quantity !== 0 ? (
        <div className="flex flex-col justify-between">
          <div className=" flex flex-row justify-between items-center">
            <Button
              text={"+"}
              handleClick={(id) => increaseItemQuantity(product._id)}
            />
            <p className="text-2xl">{quantity}</p>
            <Button
              text={"-"}
              handleClick={(id) => decreaseItemQuantity(product._id)}
            />
          </div>
          <Button
            text={"Remove item"}
            handleClick={(id) => removeCartItem(product._id)}
          />
        </div>
      ) : (
        <Button
          text={"shop now"}
          id={product._id}
          handleClick={(id) =>
            addToCart(product._id, product.unitPrice, product.productName)
          }
        />
      )}
    </Card>
  );
};

export default Product;
