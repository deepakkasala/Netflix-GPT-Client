import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  // const user = localStorage.getItem("user");
  const handleLogout = () => {
    console.log("Logout Clicked");

    // Perform logout logic here
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
  useEffect(() => {}, []);

  return (
    <header className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-b from-black z-50 flex items-center justify-between">
      {/* Netflix Logo */}
      <img
        className="w-28 sm:w-32 md:w-36 lg:w-44 cursor-pointer"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
      />

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={USER_AVATAR} alt="User Avatar" className="w-8 sm:w-10" />
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
