import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/machinery`);
        const filtered = res.data.filter(
          (m) => m.name?.toLowerCase().includes(categoryName.toLowerCase()) ||
                 m.description?.toLowerCase().includes(categoryName.toLowerCase())
        );
        setMachines(filtered);
      } catch (err) {
        console.error("Error fetching machines:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, [categoryName]);

  const handleHire = async (machineId) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/hire`, { machineId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("success", "Hire request sent!");
    } catch (err) {
      showToast("error", err.response?.data?.message || "Failed to send hire request.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{toast.msg}</p>
        </div>
      )}

      <div className="mb-8">
        <button onClick={() => navigate("/rentalhome")} className="text-sm text-green-600 hover:text-green-700 font-medium mb-4 inline-flex items-center gap-1 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Rental Home
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{displayName} Machines</h1>
        <p className="text-gray-500 mt-1">Browse available {categoryName} machinery for rent</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading machines...</p>
        </div>
      ) : machines.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 font-medium">No {categoryName} machines available right now</p>
          <p className="text-gray-400 text-sm mt-1">Check back later or browse other categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {machines.map((machine, i) => (
            <div
              key={machine._id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-lg">{machine.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{machine.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="font-medium text-green-700">Rs. {machine.price}/day</span>
                  {machine.location && <span className="text-gray-400">{machine.location}</span>}
                </div>
                <button
                  onClick={() => handleHire(machine._id)}
                  className="btn-primary mt-4 w-full py-2.5 text-sm"
                >
                  Hire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
