import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MachineList = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [machineData, setMachineData] = useState({ name: "", price: "", location: "", description: "" });
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    fetchMachines();
  }, [navigate]);

  const fetchMachines = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/machinery`);
      setMachines(response.data);
    } catch (error) {
      console.error("Error fetching machines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setMachineData({ ...machineData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/login"); return; }
      await axios.post(`${import.meta.env.VITE_API_URL}/api/machinery`, machineData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("success", "Machine posted successfully!");
      setMachineData({ name: "", price: "", location: "", description: "" });
      fetchMachines();
    } catch (error) {
      showToast("error", "Failed to post machine. Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/machinery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMachines((prev) => prev.filter(m => m._id !== id));
      showToast("success", "Machine deleted!");
    } catch (error) {
      showToast("error", "Failed to delete machine.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{toast.msg}</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
        <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-5">
          <h2 className="text-xl font-bold text-white">List Your Machine</h2>
          <p className="text-green-100 text-sm mt-1">Add machinery for farmers to rent</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Machine Name</label>
              <input type="text" name="name" value={machineData.name} onChange={handleChange} placeholder="e.g. John Deere Tractor" className="input-base" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price Per Day</label>
              <input type="number" name="price" value={machineData.price} onChange={handleChange} placeholder="e.g. 2000" className="input-base" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <input type="text" name="location" value={machineData.location} onChange={handleChange} placeholder="City, State" className="input-base" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea name="description" value={machineData.description} onChange={handleChange} rows={3} placeholder="Describe the machine..." className="input-base" required />
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-sm">
            Post Machine
          </button>
        </form>
      </div>

      {/* Machine List */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Available Machines</h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading machines...</p>
          </div>
        ) : machines.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">No machines listed yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {machines.map((machine, i) => (
              <div
                key={machine._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{machine.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{machine.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="font-medium text-green-700">Rs. {machine.price}/day</span>
                      <span className="text-gray-400">{machine.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(machine._id)}
                    className="btn-base px-3 py-1.5 text-xs bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineList;
