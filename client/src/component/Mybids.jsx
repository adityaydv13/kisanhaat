import React, { useEffect, useState } from "react";
import axios from "axios";
import "../cssCrops/Mybids.css";
const MyBids = () => {
  const [bids, setBids] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMyBids = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/crops/bids/mybids`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBids(res.data);
    } catch (error) {
      console.error("Error fetching my bids:", error);
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  return (
  <div className="my-bids-container">
    <h2>My Bids</h2>
    {bids.map(bid => (
      <div key={bid._id} className="bid-card">
        <p><strong>Crop:</strong> {bid.postId.title}</p>
        <p><strong>Amount:</strong> ₹{bid.bidAmount}</p>
        <p><strong>Status:</strong> {bid.status}</p>
        
        {bid.status === "ACCEPTED" && (
          <button>Proceed to Pay</button>
        )}
      </div>
    ))}
  </div>
);

};

export default MyBids;
