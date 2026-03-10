import { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [hires, setHires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const token = localStorage.getItem("token");

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchHires = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/hires/my-hires`, { headers: { Authorization: `Bearer ${token}` } });
        setHires(res.data);
      } catch (err) {
        console.error("Error fetching hires:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchHires();
  }, [token]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/hire/my-requests`, { headers: { Authorization: `Bearer ${token}` } });
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => { if (token) fetchRequests(); }, [token]);

  const handleAction = async (hireId, action) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/hire/${hireId}`, { status: action }, { headers: { Authorization: `Bearer ${token}` } });
      showToast("success", `Request ${action} successfully!`);
      fetchRequests();
    } catch (err) {
      showToast("error", "Failed to update request.");
    }
  };

  const handleDelete = async (hireId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/deletehire/${hireId}`, { headers: { Authorization: `Bearer ${token}` } });
      setHires((prev) => prev.filter((hire) => hire._id !== hireId));
      showToast("success", "Hire removed!");
    } catch (err) {
      showToast("error", "Failed to remove hire.");
    }
  };

  const statusColors = {
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{toast.msg}</p>
        </div>
      )}

      {/* Hire Requests */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hire Requests</h2>
        <p className="text-gray-500 mb-6">Requests from users who want to rent your machines</p>

        {requests.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">No requests yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r, i) => (
              <div
                key={r._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{r.machineId?.name || 'Machine'}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[r.status] || ''}`}>
                    {r.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-xs text-gray-400">Requested by</p>
                    <p className="font-medium text-gray-900">{r.requester?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-medium text-gray-900">{r.requester?.email || 'N/A'}</p>
                  </div>
                </div>
                {r.status === "pending" && (
                  <div className="flex gap-3 pt-3 border-t border-gray-100">
                    <button onClick={() => handleAction(r._id, "approved")} className="btn-primary flex-1 py-2.5 text-sm">
                      Approve
                    </button>
                    <button onClick={() => handleAction(r._id, "rejected")} className="btn-danger flex-1 py-2.5 text-sm">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Hires */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Hires</h2>
        <p className="text-gray-500 mb-6">Machines you've rented</p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading hires...</p>
          </div>
        ) : hires.filter(h => h.status === "approved").length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">No approved hires yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hires.filter(h => h.status === "approved").map((hire, i) => (
              <div
                key={hire._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <h3 className="font-semibold text-gray-900 mb-3">{hire.machineId?.name || "Unnamed Machine"}</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-gray-900">{hire.machineId?.location || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-medium text-green-700">Rs. {hire.machineId?.price}/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="font-medium text-green-700">{hire.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hired on</span>
                    <span className="text-gray-900">
                      {hire.hireDate ? new Date(hire.hireDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleDelete(hire._id)} className="btn-danger w-full py-2.5 text-sm">
                  Remove Hire
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
