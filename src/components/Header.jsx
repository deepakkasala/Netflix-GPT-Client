import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    // Perform logout logic here
    dispatch(clearUser());
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };
  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />
      {user && (
        <div className="flex items-center">
          <img
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            className="w-8"
          />
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
