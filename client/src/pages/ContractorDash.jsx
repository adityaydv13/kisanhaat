import { useState, useEffect } from "react";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>
  </div>
);

const ContractorDash = () => {
  const [contractor, setContractor] = useState({ name: "", email: "" });
  const [contracts, setContracts] = useState([]);
  const [successfulContracts, setSuccessfulContracts] = useState([]);
  const [ongoingDeals, setOngoingDeals] = useState([]);

  useEffect(() => {
    // Replace with actual API calls
    setContractor({ name: "Rajiv Sharma", email: "rajiv@example.com" });
    setContracts([
      { id: 1, productName: "Tomatoes", farmer: "Madhav Verma", amount: "500" },
      { id: 2, productName: "Potatoes", farmer: "Anil Kumar", amount: "600" },
      { id: 3, productName: "Wheat", farmer: "Ram Singh", amount: "550" },
    ]);
    setSuccessfulContracts([
      { id: 1, productName: "Tomatoes", farmer: "Madhav Verma", rating: 4.5, weight: 500 },
      { id: 2, productName: "Potatoes", farmer: "Anil Kumar", rating: 5, weight: 1000 },
    ]);
    setOngoingDeals([
      { id: 1, productName: "Apples", farmer: "Vikram Yadav", closedDate: "2024-05-15", expectedCompletion: "2024-09-15", status: "In Progress" },
      { id: 2, productName: "Grapes", farmer: "Sanjay Gupta", closedDate: "2024-06-01", expectedCompletion: "2024-08-30", status: "Pending Delivery" },
    ]);
  }, []);

  const statusColors = {
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    "Pending Delivery": "bg-amber-50 text-amber-700 border-amber-200",
    "Quality Check": "bg-purple-50 text-purple-700 border-purple-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-6 text-white">
        <p className="text-green-200 text-sm font-medium">Contractor Dashboard</p>
        <h1 className="text-2xl font-bold mt-1">Welcome, {contractor.name}</h1>
        <p className="text-green-100 text-sm mt-1">{contractor.email}</p>
      </div>

      {/* Available Contracts */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Contracts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">{c.productName}</h3>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Farmer</span>
                  <span className="text-gray-900">{c.farmer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-medium text-green-700">Rs. {c.amount}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors">Accept</button>
                <button className="flex-1 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-xl transition-colors">Decline</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ongoing Deals */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ongoing Deals</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Farmer</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Closed</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Expected</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ongoingDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4 font-medium text-gray-900">{deal.productName}</td>
                    <td className="px-5 py-4 text-gray-600">{deal.farmer}</td>
                    <td className="px-5 py-4 text-gray-600">{deal.closedDate}</td>
                    <td className="px-5 py-4 text-gray-600">{deal.expectedCompletion}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[deal.status] || ""}`}>
                        {deal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Successful Contracts */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Successful Contracts</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Farmer</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Weight (kg)</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {successfulContracts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4 font-medium text-gray-900">{c.productName}</td>
                    <td className="px-5 py-4 text-gray-600">{c.farmer}</td>
                    <td className="px-5 py-4 text-gray-600">{c.weight}</td>
                    <td className="px-5 py-4"><StarRating rating={c.rating} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContractorDash;
