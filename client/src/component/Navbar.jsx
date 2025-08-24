 
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";

// const Navbar = ({ handleLogout }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log("Decoded token:", decoded); // 👈 check what fields exist
//         setIsLoggedIn(true);
//          console.log("Decoded JWT payload:", decoded); 
//         setUserName(decoded?.name || decoded?.username || "User");
       
//       } catch (err) {
//         console.error("Token decoding failed:", err);
//         setIsLoggedIn(false);
//         setUserName("");
//       }
//     }
//   }, []);

//   const logout = async () => {
//     try {
//       await handleLogout?.();
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       setIsLoggedIn(false);
//       setUserName("");
//       navigate("/");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="navbar bg-base-100">
//       <div className="navbar-start">
//         <Link className="btn btn-ghost text-xl" to="/">
//           KisanHaat
//         </Link>
//         <Link className="btn btn-ghost text-xl" to="/rentalhome">
//           Rental
//         </Link>
//       </div>

//       <div className="navbar-end flex items-center space-x-4">
//         <ul className="menu menu-horizontal px-1 hidden lg:flex space-x-4">
//           <li>
//             <Link to="/" className="hover:text-[#0ca712] no-underline">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/faq" className="hover:text-[#0ca712] no-underline">
//               FAQs
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="hover:text-[#0ca712] no-underline">
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/requests" className="hover:text-[#0ca712] no-underline">
//               Requests
//             </Link>
//           </li>
//         </ul>

//         {isLoggedIn ? (
//           <div className="flex items-center space-x-3">
//             <span className="text-white-700 font-medium">Hi, {userName}</span>
//             <button className="btn btn-error" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center space-x-4">
//             <Link className="btn" to="/login">
//               Login
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ handleLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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
      {/* Left side brand + rental */}
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" to="/">
          KisanHaat
        </Link>
        <Link className="btn btn-ghost text-xl" to="/rentalhome">
          Rental
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-end hidden lg:flex items-center space-x-4">
        <ul className="menu menu-horizontal px-1 space-x-4">
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
            <span className="font-medium">Hi, {userName}</span>
            <button className="btn btn-error" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden navbar-end">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost text-2xl"
        >
          ☰
        </button>

        {menuOpen && (
          <>
            {/* Dark overlay for click outside effect */}
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

            <div
              ref={menuRef}
              className="absolute top-16 right-2 w-56 bg-base-100 shadow-lg rounded-lg p-4 space-y-3 z-50 transition transform duration-200"
            >
              <Link
                to="/"
                className="block hover:text-[#0ca712]"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/faq"
                className="block hover:text-[#0ca712]"
                onClick={() => setMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link
                to="/contact"
                className="block hover:text-[#0ca712]"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/requests"
                className="block hover:text-[#0ca712]"
                onClick={() => setMenuOpen(false)}
              >
                Requests
              </Link>

              {isLoggedIn ? (
                <>
                  <span className="block font-medium">Hi, {userName}</span>
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
                  className="btn w-full"
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
