import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ handleLogout, onSwitchRole }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj?.name) {
          setIsLoggedIn(true);
          setUserName(userObj.name);
          return;
        }
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decoded?.name || "User");
      } catch {
        setIsLoggedIn(false);
        setUserName("");
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const logout = () => {
    handleLogout?.();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive(path)
        ? "bg-green-50 text-green-700"
        : "text-gray-600 hover:text-green-700 hover:bg-gray-50"
    }`;

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link to="/" className={navLinkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/rentalhome" className={navLinkClass("/rentalhome")} onClick={() => setMenuOpen(false)}>Rental</Link>
      <Link to="/faq" className={navLinkClass("/faq")} onClick={() => setMenuOpen(false)}>FAQs</Link>
      <Link to="/contact" className={navLinkClass("/contact")} onClick={() => setMenuOpen(false)}>Contact</Link>

      {isLoggedIn && (
        <>
          <Link to="/requests" className={navLinkClass("/requests")} onClick={() => setMenuOpen(false)}>Requests</Link>
          <Link to="/received-bids" className={navLinkClass("/received-bids")} onClick={() => setMenuOpen(false)}>Received Bids</Link>
          <Link to="/my-bids" className={navLinkClass("/my-bids")} onClick={() => setMenuOpen(false)}>My Bids</Link>

          {mobile && (
            <>
              <Link to="/profile" className={navLinkClass("/profile")} onClick={() => setMenuOpen(false)}>Profile</Link>
              <button
                onClick={() => { onSwitchRole(); setMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-lg transition-all"
              >
                Switch Role
              </button>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                Logout
              </button>
            </>
          )}
        </>
      )}

      {!isLoggedIn && (
        <Link
          to="/login"
          className="px-5 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all shadow-sm no-underline"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? "border-gray-200 shadow-sm" : "border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">KisanHaat</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLinks />
            {isLoggedIn && (
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200">
                <button
                  onClick={onSwitchRole}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-lg transition-all"
                >
                  Switch Role
                </button>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  Logout
                </button>
                <Link to="/profile" className="flex items-center gap-2 ml-2 no-underline">
                  <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userName}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)} />
          <div
            ref={menuRef}
            className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 p-4 flex flex-col gap-1"
          >
            {isLoggedIn && (
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-100 no-underline">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </Link>
            )}
            <NavLinks mobile />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
