import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
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
  console.log(user);

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
    <div>
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-black/90 sm:bg-gradient-to-b from-black z-50 flex items-center justify-around sm:justify-between">
        {/* Netflix Logo */}
        <div className="flex items-center gap-8">
          <img
            className="w-24 sm:w-32 md:w-36 lg:w-44 cursor-pointer"
            src={NETFLIX_LOGO}
            alt="Netflix Logo"
          />

          {/* Navbar right beside the Netflix icon with [Home, Mylist and Browse by Language] options navigation using React Router */}
          {!showGptSearch && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/browse"
                className="text-gray-300 hover:underline hover:cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/my-list"
                className="text-gray-300 hover:underline hover:cursor-pointer"
              >
                My List
              </Link>
              <Link
                to="/browse-by-languages"
                className="text-gray-300 hover:underline hover:cursor-pointer"
              >
                Browse by Languages
              </Link>
            </nav>
          )}
        </div>

        {/* User Section */}
        {user && (
          <div className="flex items-center gap-3 sm:gap-4">
            {showGptSearch && (
              <div className="flex items-center gap-3">
                <p className="text-white">
                  <span>Hello</span>
                  <span className="font-bold ml-1">
                    {user.user.name || user.name},
                  </span>
                </p>
                <p className="text-white">
                  {user.user.searchesLeft || user.searchesLeft}
                  <span className="font-bold ml-1">GPT Searches Left</span>
                </p>
                <select
                  onChange={handleLanguageChange}
                  className="w-32 sm:min-w-44 ml-6 px-3 py-2 rounded-lg border border-gray-300 bg-gray-900 text-white shadow-sm cursor-pointer"
                >
                  {supported_languages.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.language}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {!showGptSearch && (
              <p className="text-white">
                <span>Hello</span>
                <span className="font-bold ml-1">
                  {user.user.name || user.name},
                </span>
              </p>
            )}
            <button
              onClick={handleGptSearchClick}
              className="w-24 py-1.5 sm:py-2.5 sm:min-w-32 text-sm sm:text-md sm:px-4 text-white bg-violet-800 mx-1 rounded hover:cursor-pointer hover:bg-purple-950"
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>
            <img
              src={USER_AVATAR}
              alt="User Avatar"
              className="w-7.5 h-7.5 sm:w-10 sm:h-10 rounded"
            />
            <button
              onClick={handleLogout}
              className="text-white text-xl sm:text-2xl cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-black rounded-full p-1 sm:p-2 ml-8 sm:ml-0"
            >
              <FiLogOut />
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
