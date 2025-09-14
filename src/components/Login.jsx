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
  console.log("User:", user);

  const handleBtnClick = async (e) => {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    // console.log(nameValue, emailValue, passwordValue);

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
          console.log(response.data.user);
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
    <div>
      <Header />
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={BACKGROUND_IMAGE}
          alt="Netflix Background"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <form
        className={`xl:w-1/4 lg:w-1/4 md:w-1/3 sm:w-1/2 absolute my-36 mx-auto right-0 left-0 text-white rounded-lg p-12 bg-black/80 bg-opacity-50 ${
          isSignIn ? "h-[700px]" : "h-[600px]"
        }`}
        onSubmit={handleBtnClick}
      >
        <h1 className="font-semibold text-3xl py-8">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="xl:p-3.5 lg:p-2.5 md:p-1.5 sm:p-0.5 xs:p-[2px] my-2 w-full text-gray-100 font-medium bg-black-900 border-[0.5px] border-gray-400 rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          className="xl:p-3.5 lg:p-2.5 md:p-1.5 sm:p-0.5 xs:p-[2px] my-2 w-full text-gray-100 font-medium bg-black-900 border-[0.5px] border-gray-400 rounded"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="xl:p-3.5 lg:p-2.5 md:p-1.5 sm:p-0.5 xs:p-[2px] my-2 w-full text-gray-100 font-medium bg-black-900 border-[0.5px] border-gray-400 rounded"
          ref={password}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          type="submit"
          className="xl:p-2 lg:p-1 md:p-0.5 sm:p-0.5 xs:p-[2px] my-6 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg cursor-pointer w-full rounded-lg opacity-100"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        {isSignIn && (
          <div>
            <p className="text-center font-bold text-lg text-gray-300">OR</p>
            <button className="xl:p-2 lg:p-1 md:p-0.5 sm:p-0.5 xs:p-[2px] my-4 bg-gray-700/70 hover:bg-gray-700 text-white font-semibold text-lg cursor-pointer w-full rounded-lg opacity-100">
              Use a sign-in code
            </button>
            <p className="text-center font-semibold text-lg underline">
              Forgot Password?
            </p>
            <div className="flex items-center gap-2 my-4">
              <input type="checkbox" className="px-5" />
              <label className="text-lg">Remember Me</label>
            </div>
          </div>
        )}
        <p
          className="py-5 cursor-pointer underline"
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
