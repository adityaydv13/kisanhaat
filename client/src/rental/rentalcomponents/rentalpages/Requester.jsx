
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/hire/my-requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  const handleAction = async (hireId, action) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/hire/${hireId}`,
        { status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100vw",
        margin: "0 auto",
        backgroundColor: "#191717ff", // Black background
        color: "#fff", // White font
        minHeight: "100vh"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Hire Requests</h2>
      {requests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No requests yet.</p>
      ) : (
        requests.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#111", // dark card background
              boxShadow: "0 2px 8px rgba(255, 255, 255, 0.1)"
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{r.machineId?.name}</h3>
            <p>
              <strong>Requested by:</strong> {r.requester?.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    r.status === "approved"
                      ? "lightgreen"
                      : r.status === "rejected"
                      ? "tomato"
                      : "gold"
                }}
              >
                {r.status}
              </span>
            </p>
            {r.status === "pending" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleAction(r._id, "approved")}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "green",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(r._id, "rejected")}
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequests;
