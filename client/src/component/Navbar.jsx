import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DeleteAccount from "../pages/RemoveUser";
const Navbar = ({ handleLogout, onSwitchRole }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
const userId = userString ? JSON.parse(userString)._id : null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decoded?.name || decoded?.username || "User");
      } catch {
        setIsLoggedIn(false);
        setUserName("");
      }
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

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
  <div className="navbar bg-base-100 shadow-md relative">
    {/* Left side brand */}
      <div className="navbar-start flex items-center space-x-4">
    <Link className="btn btn-ghost text-xl no-underline" to="/">
      KisanHaat
    </Link>

    <Link
      to="/rentalhome"
      className="btn btn-ghost text-lg hover:text-[#0ca712] no-underline"
    >
      Rental
    </Link>
  </div>
    {/* Desktop: Hamburger dropdown */}
    <div className="navbar-end hidden lg:flex">
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost text-lg"
        >
          ☰
        </button>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-12 right-0 w-56 bg-base-100 shadow-lg rounded-xl p-4 flex flex-col items-center space-y-3 z-50"
          >
            <Link
              to="/"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/faq"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/requests"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Requests
            </Link>

            {isLoggedIn ? (
              <>
                <span className="font-medium">Hi, {userName}</span>
                <button
                  className="btn btn-outline btn-success w-full"
                  onClick={() => {
                    onSwitchRole();
                    setMenuOpen(false);
                  }}
                >
                  Switch Role
                </button>
{/*  */}

<DeleteAccount

      token={localStorage.getItem("token")}
       userId={userId}  
      onDelete={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setMenuOpen(false);
        navigate("/");
      }}
    >
      {/* <button className="btn btn-warning w-full"> */}
        Delete Account
      {/* </button> */}
    </DeleteAccount>
    {/*  */}

                <button
                  className="btn btn-error w-full"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="btn btn-primary w-full"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

            

          </div>
          
        )}
       
        
      </div>
      
      
    </div>
      

    {/* Mobile: Hamburger dropdown */}
    <div className="lg:hidden navbar-end">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="btn btn-ghost text-2xl"
      >
        ☰
      </button>

      {menuOpen && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

          <div
            ref={menuRef}
            className="absolute top-16 right-2 w-64 bg-base-100 shadow-lg rounded-xl p-5 flex flex-col items-center space-y-4 z-50"
          >
            <Link
              to="/"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/faq"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/requests"
              className="hover:text-[#0ca712] no-underline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Requests
            </Link>

            {isLoggedIn ? (
              <>
                <span className="font-medium">Hi, {userName}</span>
                <button
                  className="btn btn-outline btn-success w-full"
                  onClick={() => {
                    onSwitchRole();
                    setMenuOpen(false);
                  }}
                >
                  Switch Role
                </button>
                {/*  */}
                 <DeleteAccount
      token={localStorage.getItem("token")}
      userId={userId}  
      onDelete={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setMenuOpen(false);
        navigate("/");
      }}
    >
      {/* <button className="btn btn-warning w-full"> */}
        Delete Account
      {/* </button> */}
    </DeleteAccount>
    {/*  */}
                <button
                  className="btn btn-error w-full"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="btn btn-primary w-full"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  </div>
);

};

export default Navbar;
