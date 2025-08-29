 

import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [hires, setHires] = useState([]);   // ✅ Added
  const [loading, setLoading] = useState(true); // ✅ Added
  const token = localStorage.getItem("token");

  // Fetch My Hires
  useEffect(() => {
    const fetchHires = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/hires/my-hires`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHires(res.data);
      } catch (err) {
        console.error("Error fetching my hires:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchHires();
  }, [token]);

  // Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/hire/my-requests`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
  
  const handledelete = async (hireId) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/deletehire/${hireId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Optimistically update UI
    setHires((prev) => prev.filter((hire) => hire._id !== hireId));
  } catch (err) {
    console.error("Error deleting the hire:", err);
  }
};

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100vw",
        margin: "0 auto",
        backgroundColor: "#191717ff",
        color: "#fff",
        minHeight: "100vh"
      }}
    >
      {/* ================= Hire Requests ================= */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Hire Requests
      </h2>
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
              backgroundColor: "#111",
              boxShadow: "0 2px 8px rgba(255, 255, 255, 0.1)"
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{r.machineId?.name}</h3>
            <p>
              <strong>Requested by:</strong> {r.requester?.name}
            </p>
            <p>Address: {r.requester?.location}</p>
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

      {/* ================= My Hires ================= */}
     {/* ================= My Hires ================= */}
<div className="p-6">
  <h2 className="text-2xl font-semibold mb-6 text-center text-white">
    My Hires
  </h2>
  {loading ? (
    <p className="text-center text-gray-400">Loading hires...</p>
  ) : hires.length === 0 ? (
    <p className="text-center text-gray-400">No approved hires yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hires
        .filter((hire) => hire.status === "approved")
        .map((hire) => (
          <div
            key={hire._id}
            className="p-4 bg-[#222] border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl 
                       transition transform hover:-translate-y-1 hover:scale-[1.02]"
          >
            <h3 className="text-lg font-bold text-yellow-300 mb-2">
              {hire.machineId?.name || "Unnamed Machine"}
            </h3>
            <p className="text-gray-300 mb-1">
              <strong className="text-gray-400">Location:</strong>{" "}
              {hire.machineId?.location}
            </p>
            <p className="text-gray-300 mb-1">
              <strong className="text-gray-400">Price:</strong> ₹
              {hire.machineId?.price}
            </p>
            <p className="mb-1">
              <strong className="text-gray-400">Status:</strong>{" "}
              <span className="text-green-400 font-medium">{hire.status}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Hired on:{" "}
              {hire.hireDate
                ? new Date(hire.hireDate).toLocaleDateString()
                : "N/A"}
            </p>
            <button
              onClick={() => handledelete(hire._id)}
              className="w-full py-2 mt-2 bg-red-600 hover:bg-blue-700 
                         text-white rounded-xl transition font-medium shadow-md"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  )}
</div>

    </div>
  );
};

export default MyRequests;
