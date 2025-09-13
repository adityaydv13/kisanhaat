// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import DeleteAccount from "../pages/RemoveUser";
// const Navbar = ({ handleLogout, onSwitchRole }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();
//   const userString = localStorage.getItem("user");
// const userId = userString ? JSON.parse(userString)._id : null;

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setIsLoggedIn(true);
//         setUserName(decoded?.name || decoded?.username || "User");
//       } catch {
//         setIsLoggedIn(false);
//         setUserName("");
//       }
//     }
//   }, []);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//     };
//     if (menuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [menuOpen]);

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
//   <div className="navbar bg-base-100 shadow-md relative">
//     {/* Left side brand */}
//       <div className="navbar-start flex items-center space-x-4">
//     <Link className="btn btn-ghost text-xl no-underline" to="/">
//       KisanHaat
//     </Link>

//     <Link
//       to="/rentalhome"
//       className="btn btn-ghost text-lg hover:text-[#0ca712] no-underline"
//     >
//       Rental
//     </Link>
//   </div>
//     {/* Desktop: Hamburger dropdown */}   
//     <div className="navbar-end hidden lg:flex">
 
//       <div className="relative">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="btn btn-ghost text-lg"
//         >
//           ☰
//         </button>
//         {menuOpen && (
//           <div
//             ref={menuRef}
//             className="absolute top-12 right-0 w-56 bg-base-100 shadow-lg rounded-xl p-4 flex flex-col items-center space-y-3 z-50"
//           >
//             <Link
//               to="/"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/faq"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               FAQs
//             </Link>
//             <Link
//               to="/contact"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               Contact Us
//             </Link>
//             <Link
//               to="/requests"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               Requests
//             </Link>

//             {/* bids  */}


//             <Link to="/received-bids">Received Bids</Link>
//              <Link to="/my-bids">My Bids</Link>

//             {isLoggedIn ? (
//               <>
//                 <span className="font-medium">Hi, {userName}</span>
//                 <button
//                   className="btn btn-outline btn-success w-full"
//                   onClick={() => {
//                     onSwitchRole();
//                     setMenuOpen(false);
//                   }}
//                 >
//                   Switch Role
//                 </button>
// {/*  */}

// <DeleteAccount

//       token={localStorage.getItem("token")}
//        userId={userId}  
//       onDelete={() => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         setIsLoggedIn(false);
//         setMenuOpen(false);
//         navigate("/");
//       }}
//     >
//          Delete Account
//      </DeleteAccount>
//  {/*  */}
          

//                 <button
//                   className="btn btn-error w-full"
//                   onClick={() => {
//                     logout();
//                     setMenuOpen(false);
//                   }}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 className="btn btn-primary w-full"
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             )}

            

//           </div>
          
//         )}
       
        
//       </div>
      
      
//     </div>
      

//     {/* Mobile: Hamburger dropdown */}
//     <div className="lg:hidden navbar-end">
//       <button
//         onClick={() => setMenuOpen(!menuOpen)}
//         className="btn btn-ghost text-2xl"
//       >
//         ☰
//       </button>

//       {menuOpen && (
//         <>
//           {/* Dark overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

//           <div
//             ref={menuRef}
//             className="absolute top-16 right-2 w-64 bg-base-100 shadow-lg rounded-xl p-5 flex flex-col items-center space-y-4 z-50"
//           >
//             <Link
//               to="/"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/faq"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               FAQs
//             </Link>
//             <Link
//               to="/contact"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               Contact Us
//             </Link>
//             <Link
//               to="/requests"
//               className="hover:text-[#0ca712] no-underline w-full text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               Requests
//             </Link>

//             {isLoggedIn ? (
//               <>
//                 <span className="font-medium">Hi, {userName}</span>
//                 <button
//                   className="btn btn-outline btn-success w-full"
//                   onClick={() => {
//                     onSwitchRole();
//                     setMenuOpen(false);
//                   }}
//                 >
//                   Switch Role
//                 </button>
//                   <DeleteAccount
//       token={localStorage.getItem("token")}
//       userId={userId}  
//       onDelete={() => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         setIsLoggedIn(false);
//         setMenuOpen(false);
//         navigate("/");
//       }}
//     >
//          Delete Account
//      </DeleteAccount>
//     {/*  */}

//             <Link to="/received-bids">Received Bids</Link>
//             <Link to="/my-bids">My Bids</Link>
                 

//                 <button
//                   className="btn btn-error w-full"
//                   onClick={() => {
//                     logout();
//                     setMenuOpen(false);
//                   }}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 className="btn btn-primary w-full"
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   </div>
// );

// };

// export default Navbar;
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DeleteAccount from "../pages/RemoveUser";

const Navbar = ({ handleLogout, onSwitchRole }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRefMobile = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRefMobile.current && !menuRefMobile.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      console.error("Logout error:", error);
    }
  };

  const navLink =
    "px-3 py-1 text-sm font-medium text-white-700 no-underline rounded-[15px] border border-transparent hover:border-blue-600 transition duration-300";

  return (
    <nav className="bg-base-100 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Left Section: Brand & Rental */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-semibold no-underline">
            KisanHaat
          </Link>
          <Link
            to="/rentalhome"
            className="text-sm font-medium no-underline px-3 py-1 rounded-[15px] border border-transparent hover:border-blue-500 transition duration-200"
          >
            Rental
          </Link>
        </div>

        {/* Right Section: Links + Actions */}
        <div className="hidden lg:flex items-center space-x-3 ml-auto">
          <Link to="/" className={navLink}>Home</Link>
          <Link to="/faq" className={navLink}>FAQs</Link>
          <Link to="/contact" className={navLink}>Contact</Link>
          <Link to="/requests" className={navLink}>Requests</Link>

          {isLoggedIn && (
            <>
              <Link to="/received-bids" className={navLink}>Received Bids</Link>
              <Link to="/my-bids" className={navLink}>My Bids</Link>
              <button onClick={onSwitchRole} className={navLink}>Switch Role</button>
              <DeleteAccount
                token={localStorage.getItem("token")}
                userId={userId}
                onDelete={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  setIsLoggedIn(false);
                  navigate("/");
                }}
              >
                Delete Account
              </DeleteAccount>
              <button onClick={logout} className={navLink}>Logout</button>
            </>
          )}

          {!isLoggedIn && (
            <Link to="/login" className={navLink}>Login</Link>
          )}

          {/* Username pinned at the rightmost end */}
          {isLoggedIn && (
            <span className="ml-1 text-sm text-white-800">{userName}</span>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl px-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black/40 z-40"></div>
          <div
            ref={menuRefMobile}
            className="absolute top-14 right-2 w-64 bg-base-100 shadow-lg rounded p-4 flex flex-col items-center space-y-2 z-50"
          >
            <Link to="/" className={navLink} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/faq" className={navLink} onClick={() => setMenuOpen(false)}>FAQs</Link>
            <Link to="/contact" className={navLink} onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/requests" className={navLink} onClick={() => setMenuOpen(false)}>Requests</Link>

            {isLoggedIn && (
              <>
                <Link to="/received-bids" className={navLink} onClick={() => setMenuOpen(false)}>Received Bids</Link>
                <Link to="/my-bids" className={navLink} onClick={() => setMenuOpen(false)}>My Bids</Link>
                <button className={navLink} onClick={() => { onSwitchRole(); setMenuOpen(false); }}>Switch Role</button>
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
                  Delete Account
                </DeleteAccount>
                <button className={navLink} onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                <span className="text-sm text-white-800">{userName}</span>
              </>
            )}

            {!isLoggedIn && (
              <Link to="/login" className={navLink} onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
