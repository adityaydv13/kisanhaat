import React, { useEffect, useState } from "react";
import axios from "axios";
import "../cssCrops/ShowBids.css";
const ReceivedBids = () => {
  const [bids, setBids] = useState([]);
  const token = localStorage.getItem("token");

  const fetchReceivedBids = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/crops/bids/received`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Bids from API:", res.data);
      setBids(res.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const updateBidStatus = async (bidId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/crops/bids/${bidId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReceivedBids(); // refresh list
    } catch (error) {
      console.error("Error updating bid:", error);
    }
  };

  useEffect(() => {
    fetchReceivedBids();
  }, []);

  return (
  <div className="received-bids-container">
    <h2>Received Bids</h2>
    {bids.map((bid) => (
      <div key={bid._id} className="bid-card">
        <p><strong>Crop:</strong> {bid.postId?.title}</p>
        <p><strong>Bidder:</strong> {bid.bidderId?.name}</p>
        <p><strong>Amount:</strong> ₹{bid.bidAmount}</p>
        <p><strong>Status:</strong> {bid.status}</p>
        {bid.status === "PENDING" && (
          <div>
            <button onClick={() =>{console.log("Updating bid with ID:", bid._id);
                 updateBidStatus(bid._id, "ACCEPTED")}}>Accept</button>
            <button onClick={() => updateBidStatus(bid._id, "REJECTED")}>Reject</button>
          </div>
        )}
      </div>
    ))}
  </div>
);

};

export default ReceivedBids;
