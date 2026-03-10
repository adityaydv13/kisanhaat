import { useEffect, useState } from "react";
import axios from "axios";

const ReceivedBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const token = localStorage.getItem("token");

  const fetchReceivedBids = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/crops/bids/received`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBids(res.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBidStatus = async (bidId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/crops/bids/${bidId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setToast({ type: "success", msg: `Bid ${status.toLowerCase()} successfully!` });
      fetchReceivedBids();
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({ type: "error", msg: "Failed to update bid. Try again." });
      setTimeout(() => setToast(null), 3000);
    }
  };

  useEffect(() => { fetchReceivedBids(); }, []);

  const statusColors = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    ACCEPTED: 'bg-green-50 text-green-700 border-green-200',
    REJECTED: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{toast.msg}</p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Received Bids</h2>
        <p className="text-gray-500 mt-1">Manage bids from contractors on your produce</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading bids...</p>
        </div>
      ) : bids.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500">No bids received yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bids.map((bid, i) => (
            <div
              key={bid._id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Crop</p>
                  <p className="font-semibold text-gray-900">{bid.postId?.plants?.join(', ') || bid.postId?.description || 'N/A'}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[bid.status] || 'bg-gray-50 text-gray-600'}`}>
                  {bid.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Bidder</p>
                  <p className="text-sm font-medium text-gray-900">{bid.bidderId?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Bid Amount</p>
                  <p className="text-sm font-bold text-green-700">Rs. {bid.bidAmount}</p>
                </div>
              </div>

              {bid.status === "PENDING" && (
                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => updateBidStatus(bid._id, "ACCEPTED")}
                    className="btn-primary flex-1 py-2.5 text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateBidStatus(bid._id, "REJECTED")}
                    className="btn-danger flex-1 py-2.5 text-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedBids;
