import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/login.jpg";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });
      console.log(response);
      setIsLoading(false);
      toast.success(`Welcome ${response?.data.username}`);
      localStorage.setItem("userInfo", JSON.stringify(response?.data));
      navigate("/");
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main className="container mx-auto px-3 ptop">
      <h2 className="text-xl text-center mb-5 text-secondary">
        Login to continue
      </h2>

      <section className="flex flex-col justify-center items-center md:flex-row-reverse  gap-10  relative">
        <div className="w-full absolute top--1 z--10 showcaseimg ">
          <img
            src={loginImage}
            alt="Login in to continue"
            className="w-full rounded-md opacity-90"
          />
        </div>

        <form className="w-full bg-gray-100 rounded-sm py-4 px-2 drop-shadow-md md:w-[30rem]">
          <div className="flex flex-col justify-start items-start mb-5">
            <label
              htmlFor="email"
              className="text-xl mb-2 text-orange inline-block"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="e.g: john@gmail.com "
              onChange={(e) => setEmail(e.target.value)}
              className="drop-shadow-lg px-2 py-3 w-full rounded-md outline-0 text-md"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="text-xl mb-2 text-orange inline-block"
            >
              Password
            </label>
            <div className="relative flex items-center justify-center">
              <input
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className="drop-shadow-lg px-2 py-3 w-full rounded-md outline-0 text-md"
              />
              <div
                className="absolute right-0 mt-2 mr-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-3 ">
            <button
              className=" flex justify-center items-center gap-3 capitalize px-3 py-2 bg-orange text-xl font-semibold rounded drop-shadow-md text-secondary mt-5 hover:bg-white hover:border-2 hover:border-orange"
              onClick={handleSignIn}
            >
              Sign In
            </button>
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
                  fill="orange"
                />
              </svg>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
