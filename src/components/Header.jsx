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
    // Perform logout logic here
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
  useEffect(() => {}, []);

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between">
      <img className="w-44" src={NETFLIX_LOGO} />
      {user && (
        <div className="flex items-center">
          <img src={USER_AVATAR} className="w-8" />
          <button
            onClick={handleLogout}
            className="ml-4 text-white text-2xl cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-black rounded-full p-2"
          >
            <FiLogOut />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
