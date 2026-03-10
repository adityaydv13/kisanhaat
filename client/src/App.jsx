import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import LoginAndSignup from "./pages/LoginandSignup";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

import ReceivedBids from "./component/ShowBids";
import MyBids from "./component/Mybids";

import Hhome from "./rental/rentalcomponents/rentalpages/Home";
import CategoryPage from "./rental/rentalcomponents/rentalpages/CategoryPage";
import MachineryList from "./rental/rentalcomponents/MachineryList";
import MachineryDetail from "./rental/rentalcomponents/MachineryDetail";
import MyRequests from "./rental/rentalcomponents/rentalpages/Requester";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("farmer");

  const toggleRole = () => {
    setUserRole((prev) => (prev === "farmer" ? "contractor" : "farmer"));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  const Layout = ({ children }) => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        userRole={userRole}
        onSwitchRole={toggleRole}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/" element={<Layout><Home userRole={userRole} setUserRole={setUserRole} /></Layout>} />

        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        <Route path="/my-bids" element={<Layout><MyBids /></Layout>} />
        <Route path="/received-bids" element={<Layout><ReceivedBids /></Layout>} />

        <Route path="/profile" element={<Layout>{isAuthenticated ? <Profile handleLogout={handleLogout} /> : <Navigate to="/login" />}</Layout>} />

        <Route path="/rentalhome" element={<Layout><Hhome /></Layout>} />
        <Route path="/machinerylist" element={<Layout><MachineryList /></Layout>} />
        <Route path="/hire-machine" element={<Layout><MachineryDetail /></Layout>} />
        <Route path="/category/:categoryName" element={<Layout><CategoryPage /></Layout>} />

        <Route path="/requests" element={<Layout>{isAuthenticated ? <MyRequests /> : <Navigate to="/login" />}</Layout>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
