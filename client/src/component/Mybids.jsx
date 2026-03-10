import { useEffect, useState } from "react";
import axios from "axios";
import RazorpayButton from "./RazorpayButton";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchMyBids = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/crops/bids/mybids`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBids(res.data);
    } catch (error) {
      console.error("Error fetching my bids:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyBids(); }, []);

  const statusColors = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    ACCEPTED: 'bg-green-50 text-green-700 border-green-200',
    REJECTED: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Bids</h2>
        <p className="text-gray-500 mt-1">Track your placed bids and make payments</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading your bids...</p>
        </div>
      ) : bids.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500">You haven't placed any bids yet</p>
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

              <div className="mb-4">
                <p className="text-xs text-gray-400">Your Bid</p>
                <p className="text-lg font-bold text-green-700">Rs. {bid.bidAmount}</p>
              </div>

              {bid.status === "ACCEPTED" && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">Complete Payment</p>
                  <RazorpayButton bidId={bid._id} initialAmount={bid.bidAmount} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBids;
