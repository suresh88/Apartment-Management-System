import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/authSlice";
import type { RootState, AppDispatch } from "../store/store";
import { FaUserCircle,FaBars, FaTimes  } from "react-icons/fa";
import { API } from "../services/api";
interface User {
  name: string;
  email: string;
  role: "admin" | "user";
}

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser as User | null
  );

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  /*Logout*/
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.log("Logout API error", err);
    }

    dispatch(logout());
    navigate("/login");
  };

  /*Close Dropdown*/
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  /*normal user*/
  const linksNotLogged = (
    <>
      <NavLink to="/" onClick={() => setMobileMenu(false)}>
        Home
      </NavLink>
      <NavLink to="/about" onClick={() => setMobileMenu(false)}>
        About
      </NavLink>
      <NavLink to="/Apartment" onClick={() => setMobileMenu(false)}>
        Apartment
      </NavLink>
      <NavLink to="/login" onClick={() => setMobileMenu(false)}>
        Login
      </NavLink>
    </>
  );
/*user login*/
  const linksUser = (
    <>
    <span className="text-sm mt-3 md:mt-0">
        Welcome {currentUser?.name}
      </span>
      

      <NavLink to="/" onClick={() => setMobileMenu(false)}>
        Home
      </NavLink>
      <NavLink to="/about" onClick={() => setMobileMenu(false)}>
        About
      </NavLink>
      <NavLink to="/Apartment" onClick={() => setMobileMenu(false)}>
        Apartment
      </NavLink>

      {/* Profile Dropdown */}
      <div className="relative mt-3 md:mt-0" ref={dropdownRef}>
        <FaUserCircle
          size={30}
          className="cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />

        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-lg p-2  w-35 z-50">
            <NavLink
              to="/userpage"
              className="block px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => {
                setShowDropdown(false);
                setMobileMenu(false);
              }}
            >
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );

  const linksAdmin = (
    <>
     

      <NavLink
        to="/admin"
        className="md:ml-4"
        onClick={() => setMobileMenu(false)}
      >
        Admin
      </NavLink>

      <button
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">Easy Home</h1>

        {/*Mobile Menu Icon*/}
        <div className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>

        {/*Desktop Menu*/}
        <div className="hidden md:flex items-center gap-6 text-lg">
          {!currentUser && linksNotLogged}
          {currentUser?.role === "user" && linksUser}
          {currentUser?.role === "admin" && linksAdmin}
        </div>
      </div>

      {/* Moblile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-gray-800 mt-4 p-4 flex flex-col gap-4 text-lg rounded-lg animate-slideDown">
          {!currentUser && linksNotLogged}
          {currentUser?.role === "user" && linksUser}
          {currentUser?.role === "admin" && linksAdmin}
        </div>
      )}
    </nav>
  );
};

export default Navbar;