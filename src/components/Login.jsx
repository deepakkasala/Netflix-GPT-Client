import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignInForm = () => {
    // Logic to toggle the sign-in form
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-full h-full object-cover"
          src={`https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg`}
          alt="Netflix Background"
        />
      </div>
      <form className="w-1/4 absolute my-36 mx-auto right-0 left-0 text-white rounded-lg p-12 bg-black bg-opacity-80">
        <h1 className="font-semibold text-3xl py-8">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-800 text-white"
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="p-4 my-6 bg-red-600 text-white w-full rounded-lg"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-5 cursor-pointer underline" onClick={toggleSignInForm}>
          {isSignIn
            ? "New to Netflix? Sign up now."
            : "Already have an account? Sign in."}
        </p>
      </form>
    </div>
  );
};

export default Login;
