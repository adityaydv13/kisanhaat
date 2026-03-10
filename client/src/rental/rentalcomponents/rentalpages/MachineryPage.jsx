import { useEffect, useState } from "react";
import axios from "axios";

const MachineryPage = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/machinery`)
      .then((res) => setMachines(res.data))
      .catch((err) => console.error("Error fetching machinery:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Machinery</h1>
        <p className="text-gray-500 mt-1">All machines currently listed on the platform</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading machinery...</p>
        </div>
      ) : machines.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No machines listed yet</p>
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
                  <h3 className="font-semibold text-gray-900 text-lg">{machine.name}</h3>
                  {machine.description && <p className="text-sm text-gray-500 mt-1">{machine.description}</p>}
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="font-medium text-green-700">Rs. {machine.price}/day</span>
                    {machine.location && <span className="text-gray-400">{machine.location}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MachineryPage;
