import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants";
import { clearGpt, toggleShowGptSearch } from "../redux/gptSlice";
import { supported_languages } from "../utils/languageConstants";
import { changeLanguage } from "../redux/configSlice";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // const user = localStorage.getItem("user");
  const handleGptSearchClick = () => {
    dispatch(toggleShowGptSearch());
  };
  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(clearGpt(null));
    dispatch(clearUser());
    dispatch({ type: "auth/clearToken" });
    toast.success("Logged out successfully");
    navigate("/");
  };
  useEffect(() => {}, []);

  return (
    <header className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-b from-black z-50 flex items-center justify-between">
      {/* Netflix Logo */}
      <img
        className="w-22 sm:w-32 md:w-36 lg:w-44 cursor-pointer"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
      />

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-3 sm:gap-4">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="w-48 px-3 py-2 rounded-lg border border-gray-300 bg-gray-900 text-white shadow-sm cursor-pointer"
            >
              {supported_languages.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.language}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchClick}
            className="w-36 text-white bg-violet-800 px-4 py-2.5 mx-1 rounded hover:cursor-pointer hover:bg-purple-950"
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            src={USER_AVATAR}
            alt="User Avatar"
            className="w-8 sm:w-10 rounded"
          />
          <button
            onClick={handleLogout}
            className="text-white text-xl sm:text-2xl cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-black rounded-full p-1 sm:p-2"
          >
            <FiLogOut />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
