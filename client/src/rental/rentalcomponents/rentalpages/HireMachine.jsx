import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HireMachine = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ location: "", type: "", maxPrice: "" });
  const [toast, setToast] = useState(null);
  const token = localStorage.getItem("token");

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/machinery`)
      .then((res) => setMachines(res.data))
      .catch((err) => console.error("Error fetching machines:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleHire = async (machineId) => {
    if (!token) { navigate("/login"); return; }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/hire`, { machineId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("success", "Rental request sent successfully!");
    } catch (err) {
      showToast("error", err.response?.data?.message || "Error sending request");
    }
  };

  const filteredMachines = machines.filter((machine) =>
    (!filters.location || machine.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.type || machine.name?.toLowerCase().includes(filters.type.toLowerCase())) &&
    (!filters.maxPrice || machine.price <= parseFloat(filters.maxPrice))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{toast.msg}</p>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hire a Machine</h1>
        <p className="text-gray-500 mt-1">Browse and rent agricultural machinery</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Filter Machines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Location</label>
            <input name="location" value={filters.location} onChange={handleFilterChange} placeholder="e.g. Delhi" className="input-base" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Machine Type</label>
            <input name="type" value={filters.type} onChange={handleFilterChange} placeholder="e.g. Tractor" className="input-base" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Max Price (Rs/day)</label>
            <input name="maxPrice" type="number" value={filters.maxPrice} onChange={handleFilterChange} placeholder="e.g. 5000" className="input-base" />
          </div>
        </div>
      </div>

      {/* Machine Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading machines...</p>
        </div>
      ) : filteredMachines.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-500 font-medium">No machines found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMachines.map((machine, i) => (
            <div
              key={machine._id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-lg">{machine.name}</h3>
                {machine.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{machine.description}</p>
                )}
                <div className="space-y-2 mt-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-medium text-green-700">Rs. {machine.price}/day</span>
                  </div>
                  {machine.location && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location</span>
                      <span className="text-gray-900">{machine.location}</span>
                    </div>
                  )}
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

export default HireMachine;
