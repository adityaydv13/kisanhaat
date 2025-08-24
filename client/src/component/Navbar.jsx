 
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Navbar = ({ handleLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // 👈 check what fields exist
        setIsLoggedIn(true);
         console.log("Decoded JWT payload:", decoded); 
        setUserName(decoded?.name || decoded?.username || "User");
       
      } catch (err) {
        console.error("Token decoding failed:", err);
        setIsLoggedIn(false);
        setUserName("");
      }
    }
  }, []);

  const logout = async () => {
    try {
      await handleLogout?.();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setUserName("");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" to="/">
          KisanHaat
        </Link>
        <Link className="btn btn-ghost text-xl" to="/rentalhome">
          Rental
        </Link>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <ul className="menu menu-horizontal px-1 hidden lg:flex space-x-4">
          <li>
            <Link to="/" className="hover:text-[#0ca712] no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/faq" className="hover:text-[#0ca712] no-underline">
              FAQs
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#0ca712] no-underline">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/requests" className="hover:text-[#0ca712] no-underline">
              Requests
            </Link>
          </li>
        </ul>

        {isLoggedIn ? (
          <div className="flex items-center space-x-3">
            <span className="text-white-700 font-medium">Hi, {userName}</span>
            <button className="btn btn-error" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link className="btn" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
