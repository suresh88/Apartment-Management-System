import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect after logout
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Easy Home</h1>

        <div className="hidden md:flex space-x-8 text-lg">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {currentUser?.role === "admin" && (
  <NavLink to="/admin" className="cursor-pointer">
    Admin
  </NavLink>
  
)}
{currentUser?.role==="admin"&& (  <button onClick={handleLogout}>Logout</button>)}



          {!currentUser && <NavLink to="/login">Login</NavLink>}

          {currentUser && currentUser.role !== "admin" && (
            <div className="relative">
              <img
                src="/profile.png"
                className="w-8 h-8 rounded-full cursor-pointer"
                alt="profile"
              />
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-2 flex flex-col gap-2">
                <NavLink to="/profile">Profile</NavLink>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;