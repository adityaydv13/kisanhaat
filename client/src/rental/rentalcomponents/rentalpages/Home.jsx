 
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styling/Header.css";
import axios from "axios";
import { set } from "mongoose";

const Hhome = () => {
  const navigate = useNavigate();
  const [query,setQuery] = React.useState("");

 const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };
  // send a mail 
  const handlesubmitform = (e) => {
    e.preventDefault(); 
    const res = axios.post(`${import.meta.env.VITE_API_URL}/api/enquiries`, {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    })
    .then(() => {
      // if(res.data.success)
      setQuery("Enquiry sent successfully!");
      // alert("Enquiry sent successfully!");
      e.target.reset(); // Clear the form
    })
    .catch((err) => {
      alert(err.response?.data?.message || "Error sending enquiry");
    });
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/assets/logo.png" alt="Kisan Haat Logo" />
          <span>KisanHaat</span>
        </div>
        <div className="navbar-links">
          <button onClick={() => navigate("/machinerylist")}>Add Machine</button>
          <button onClick={() => navigate("/hire-machine")}>Hire Machine</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <img src="/assets/ground.jpg" alt="Background" className="hero-image" />
        <div className="hero-text">
          <h1>Agriculture Machinery Rental</h1>
          <p>Empowering Farmers to Access Modern Machinery Easily</p>
        </div>
      </div>

      {/* Gallery / Categories */}
     <section className="categories-section">
        <h2>Explore Machinery Categories</h2>
        <div className="gallery">
          <div className="gallery-card" onClick={() => handleCategoryClick("ploughing")}>
            <img src="/assets/plouhing.jpg" alt="Ploughing" />
            <div className="gallery-caption">Ploughing Machines</div>
          </div>
          <div className="gallery-card" onClick={() => handleCategoryClick("tractor")}>
            <img src="/assets/tractor.jpg" alt="Tractor" />
            <div className="gallery-caption">Tractors</div>
          </div>
          <div className="gallery-card" onClick={() => handleCategoryClick("harvester")}>
            <img src="/assets/harvester.jpg" alt="Harvester" />
            <div className="gallery-caption">Harvesters</div>
          </div>
        </div>
      </section>

      {/* Contact & Inquiry Section */}
      <section className="contact-section">
        <h2>Contact & Inquiry</h2>
        <p>Have any questions or need assistance? Fill the form below and we will get back to you.</p>
        <form onSubmit={handlesubmitform} className="contact-form">
          <input type="name" placeholder="Your Name" required />
          <input type="email" placeholder="email" required />
          <textarea type="text" placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Enquiry</button>
               <p id="querystatus">{query}</p>
        </form>
      </section>
    </div>
  );
};

export default Hhome;
