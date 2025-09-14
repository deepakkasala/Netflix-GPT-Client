import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { checkValidData } from "../utils/validateForm";
import { API_URL, BACKGROUND_IMAGE } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, clearUser } from "../redux/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const user = useSelector((state) => state.user);

  const handleBtnClick = async (e) => {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const errorMessage = checkValidData(emailValue, passwordValue);
    setErrorMessage(null);
    if (errorMessage) return;

    // Proceed with sign in or sign up
    if (!isSignIn) {
      const nameValue = name.current.value;

      // Sign up logic
      try {
        const response = await axios.post(API_URL + "auth/register", {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          name.current.value = null;
          email.current.value = null;
          password.current.value = null;
          setIsSignIn(true);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setErrorMessage(error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(API_URL + "auth/login", {
          email: emailValue,
          password: passwordValue,
        });
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          // Dispatch user data to Redux store

          dispatch(addUser(response.data.user));
          toast.success(response.data.message);
          email.current.value = null;
          password.current.value = null;
          navigate("/browse");
          // Handle successful login
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setErrorMessage(error.response.data.message);
      }
    }
    // Handle sign in or sign up logic
  };

  return (
    <div className="relative min-h-screen w-full">
      <Header />
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={BACKGROUND_IMAGE}
          alt="Netflix Background"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Login/Signup Form */}
      <form
        className={`w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/3 xl:w-1/4 absolute top-28 sm:top-36 left-1/2 -translate-x-1/2 text-white rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 bg-black/80 shadow-lg ${
          isSignIn ? "min-h-[600px]" : "min-h-[500px]"
        }`}
        onSubmit={handleBtnClick}
      >
        <h1 className="font-semibold text-2xl sm:text-3xl py-4 sm:py-6 text-center">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {/* Full Name only for Sign Up */}
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-2 w-full text-gray-100 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="p-3 my-2 w-full text-gray-100 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          ref={email}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-2 w-full text-gray-100 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          ref={password}
        />

        {/* Error */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="p-3 my-6 bg-red-600 hover:bg-red-700 transition text-white font-semibold text-lg cursor-pointer w-full rounded-lg"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {/* Extra options for Sign In */}
        {isSignIn && (
          <div>
            <p className="text-center font-medium text-gray-300">OR</p>
            <button className="p-3 my-4 bg-gray-700/70 hover:bg-gray-700 transition text-white font-medium w-full rounded-lg">
              Use a sign-in code
            </button>
            <p className="text-center text-sm sm:text-base underline cursor-pointer hover:text-gray-200">
              Forgot Password?
            </p>
            <div className="flex items-center gap-2 my-4">
              <input type="checkbox" className="cursor-pointer" />
              <label className="text-sm sm:text-base">Remember Me</label>
            </div>
          </div>
        )}

        {/* Toggle between Sign In and Sign Up */}
        <p
          className="py-5 cursor-pointer underline text-center hover:text-gray-200"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn
            ? "New to Netflix? Sign up now."
            : "Already have an account? Sign in."}
        </p>
      </form>
    </div>
  );
};

export default Login;
