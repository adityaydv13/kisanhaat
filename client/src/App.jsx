 


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./component/Navbar"; 
import LoginAndSignup from "./pages/LoginandSignup";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

// bids
import ReceivedBids from "./component/ShowBids";
import MyBids from "./component/Mybids";

// Rental imports
import Hhome from "./rental/rentalcomponents/rentalpages/Home";
import CategoryPage from "./rental/rentalcomponents/rentalpages/CategoryPage";
import MachineryList from "./rental/rentalcomponents/MachineryList";
import MachineryDetail from "./rental/rentalcomponents/MachineryDetail";
import MyRequests from "./rental/rentalcomponents/rentalpages/Requester";

// Payment imports
import CheckoutButton from "./component/CheckoutButton";
import PaymentReturn from "./pages/PaymentReturn";

// Layout wrapper defined outside App to prevent remounting on state changes
const AppLayout = ({ children, isAuthenticated, handleLogout, userRole, toggleRole }) => (
  <div>
    <Navbar 
      isAuthenticated={isAuthenticated} 
      handleLogout={handleLogout} 
      userRole={userRole}        
      onSwitchRole={toggleRole}  
    />
    <div>{children}</div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("farmer");  // ✅ keep role here

  const toggleRole = () => {
    setUserRole(prev => (prev === "farmer" ? "contractor" : "farmer"));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Home with role toggle */}
        <Route 
          path="/" 
          element={
            <AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}>
              <Home userRole={userRole} setUserRole={setUserRole} />
            </AppLayout>
          } 
        />

        {/* Payment Routes */}
        <Route path="/checkout" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><CheckoutButton /></AppLayout>} />
        <Route path="/payment-return" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><PaymentReturn /></AppLayout>} />

        {/* Other Pages */}
        <Route path="/faq" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><FAQ /></AppLayout>} />
        <Route path="/contact" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><Contact /></AppLayout>} />


       {/* Bids */}
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/received-bids" element={<ReceivedBids />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}>
              {isAuthenticated ? <Profile handleLogout={handleLogout} /> : <Navigate to="/login" />}
            </AppLayout>
          }
        />

        {/* Rental Routes */}
        <Route path="/rentalhome" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><Hhome /></AppLayout>} />
        <Route path="/machinerylist" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><MachineryList /></AppLayout>} />
        <Route path="/hire-machine" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><MachineryDetail /></AppLayout>} />
        <Route path="/category/:categoryName" element={<AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}><CategoryPage /></AppLayout>} />

        {/* Requests (protected) */}
        <Route
          path="/requests"
          element={
            <AppLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} toggleRole={toggleRole}>
              {isAuthenticated ? <MyRequests /> : <Navigate to="/login" />}
            </AppLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
