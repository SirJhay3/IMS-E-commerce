import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartModal, UserProfile } from "../exports";
import cart from "../assets/cart.png";
import { useCartContext } from "../context/CartContext";
// import CartModal from "./CartModal";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowDown, MdShoppingCart } from "react-icons/md";
// import UserProfile from "./UserProfile";

const Header = () => {
  let user;
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartTotalQuantity, cartItems } = useCartContext();
  const totalQuantity = getCartTotalQuantity();
  const [activeCartCart, setActiveCartCart] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);

  const storeName = localStorage.getItem("userInfo");

  // console.log(storeName);
  if (storeName !== undefined) {
    user = JSON.parse(storeName);
  }
  useEffect(() => {
    setActiveCartCart(false);
  }, [location]);
  // const { storeName: user } = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <header className="w-full py-3 border-2 border-b-orange z-20 fixed bg-white">
      <nav className="container mx-auto flex justify-between items-center px-3">
        <h2 className="font-bold text-xl text-orange">Cookies</h2>
        <ul className="hidden flex-row justify-between items-center space-x-6 md:flex">
          <li>
            <Link to={"/"} className="text-md text-secondary hover:text-orange">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/products"}
              className="text-md text-secondary hover:text-orange"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to={"/category"}
              className="text-md text-secondary hover:text-orange"
            >
              Category
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="text-md text-secondary hover:text-orange"
            >
              Contact
            </Link>
          </li>
        </ul>
        {user?.storeName ? (
          ""
        ) : (
          <ul className="flex justify-between items-center space-x-3">
            <li>
              <Link
                to={"/sign-in"}
                className="px-3 py-2 bg-secondary text-white rounded-sm hover:bg-white hover:text-secondary hover:border-orange hover:border-2 "
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to={"/sign-up"}
                className="px-3 py-2 bg- border-2 border-orange rounded-md"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}

        <div className="flex justify-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-gray-500 border-2 flex flex-col justify-center items-center relative p-1 cursor-pointer"
            onClick={() => setActiveCartCart(!activeCartCart)}
          >
            <p className="absolute top-2 right-0 text-3xl font-semibold text-orange">
              {totalQuantity > 0 && totalQuantity}
            </p>
            <img src={cart} alt="" className="w-3/4" />
          </div>

          {user && (
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => setActiveProfile(!activeProfile)}
            >
              <CgProfile className="text-xl" />
              <p className="hidden md:block">
                <span className="text-gray-400 text-14">Hi, </span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {user.storeName}
                </span>
              </p>
              <p>
                <MdKeyboardArrowDown className="text-gray-400 text-14" />
              </p>
            </div>
          )}
        </div>

        <div
          className={`absolute top-12 mt-3 right-0 w-full  z-10 drop-shadow-md rounded-sm p-3 bg-white text-secondary md:w-[30rem] space-y-6 ${
            activeCartCart ? "" : "hidden"
          }`}
        >
          {/* {cartItems.length > 0 ? (
            <CartModal />
          ) : (
            <div className="flex flex-col items-center">
              <p className="border-2 border-gray-500 rounded-full p-2 text-2xl mb-2">
                <MdShoppingCart />
              </p>
              <p>You have no items in the cart</p>
              <p className="mt-5 mb-2">
                Browse our categories and discover our best deals!
              </p>
              <button
                className=" flex justify-center items-center gap-3 capitalize px-3 py-2 bg-orange text-xl font-semibold rounded drop-shadow-md text-secondary mt-5 hover:bg-white hover:border-2 hover:border-orange"
                onClick={() => {
                  setActiveCartCart(false);
                  navigate("/products");
                }}
              >
                Start Shopping
              </button>
            </div>
          )} */}

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartModal id={item.id} key={item.id} quantity={item.quantity} />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <p className="border-2 border-gray-500 rounded-full p-2 text-2xl mb-2">
                <MdShoppingCart />
              </p>
              <p>You have no items in the cart</p>
              <p className="mt-5 mb-2">
                Browse our categories and discover our best deals!
              </p>
              <button
                className=" flex justify-center items-center gap-3 capitalize px-3 py-2 bg-orange text-xl font-semibold rounded drop-shadow-md text-secondary mt-5 hover:bg-white hover:border-2 hover:border-orange"
                onClick={() => {
                  setActiveCartCart(false);
                  navigate("/products");
                }}
              >
                Start Shopping
              </button>
            </div>
          )}
          {cartItems.length > 0 && activeCartCart && (
            <Link
              to={"/checkout"}
              className="block px-3 py-2 bg-orange text-xl font-semibold rounded drop-shadow-md text-secondary mt-5 hover:bg-white hover:border-2 hover:border-orange"
            >
              Shop Now
            </Link>
          )}
        </div>
        <UserProfile
          activeProfile={activeProfile}
          setActiveProfile={setActiveProfile}
        />
      </nav>
    </header>
  );
};

export default Header;
