import { useState, useEffect } from "react";

const FarmerDash = () => {
  const [farmer, setFarmer] = useState({ name: "", email: "" });
  const [bids, setBids] = useState([]);
  const [successfulContracts, setSuccessfulContracts] = useState([]);
  const [cropSales, setCropSales] = useState([]);
  const [ongoingDeals, setOngoingDeals] = useState([]);

  useEffect(() => {
    // Replace with actual API calls
    setFarmer({ name: "Madhav Verma", email: "madhav@example.com" });
    setBids([
      { id: 1, productName: "Tomatoes", contractor: "Kisan Kumar", amount: "500" },
      { id: 2, productName: "Potatoes", contractor: "Suraj Singh", amount: "600" },
      { id: 3, productName: "Wheat", contractor: "Sitaram Chand", amount: "550" },
    ]);
    setSuccessfulContracts([
      { id: 1, crop: "Wheat", quantity: "100 kg", amount: "2000", date: "2024-08-15" },
      { id: 2, crop: "Rice", quantity: "50 kg", amount: "1500", date: "2024-08-20" },
      { id: 3, crop: "Tomatoes", quantity: "200 kg", amount: "3000", date: "2024-08-25" },
    ]);
    setCropSales([
      { crop: "Wheat", quantity: "500 kg", revenue: "10000" },
      { crop: "Rice", quantity: "300 kg", revenue: "9000" },
      { crop: "Tomatoes", quantity: "400 kg", revenue: "6000" },
      { crop: "Potatoes", quantity: "350 kg", revenue: "5250" },
    ]);
    setOngoingDeals([
      { id: 1, productName: "Wheat", contractor: "Kisan Kumar", closedDate: "2024-09-01", expectedCompletion: "2024-10-15", status: "In Progress" },
      { id: 2, productName: "Rice", contractor: "Suraj Singh", closedDate: "2024-09-05", expectedCompletion: "2024-10-20", status: "Pending Delivery" },
      { id: 3, productName: "Tomatoes", contractor: "Sitaram Chand", closedDate: "2024-09-10", expectedCompletion: "2024-09-25", status: "Completed" },
    ]);
  }, []);

  const statusColors = {
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    "Pending Delivery": "bg-amber-50 text-amber-700 border-amber-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-6 text-white">
        <p className="text-green-200 text-sm font-medium">Farmer Dashboard</p>
        <h1 className="text-2xl font-bold mt-1">Welcome, {farmer.name}</h1>
        <p className="text-green-100 text-sm mt-1">{farmer.email}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Bids", value: bids.length, color: "text-blue-600" },
          { label: "Ongoing Deals", value: ongoingDeals.filter((d) => d.status !== "Completed").length, color: "text-amber-600" },
          { label: "Completed", value: successfulContracts.length, color: "text-green-600" },
          { label: "Total Revenue", value: `Rs. ${cropSales.reduce((sum, s) => sum + parseInt(s.revenue), 0).toLocaleString()}`, color: "text-green-700" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Current Bids */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Bids</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bids.map((bid) => (
            <div key={bid.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">{bid.productName}</h3>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Contractor</span>
                  <span className="text-gray-900">{bid.contractor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-medium text-green-700">Rs. {bid.amount}</span>
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

      {/* Ongoing Contracts */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ongoing Contracts</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Contractor</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Closed</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Expected</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ongoingDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4 font-medium text-gray-900">{deal.productName}</td>
                    <td className="px-5 py-4 text-gray-600">{deal.contractor}</td>
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Successful Contracts</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Crop</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Quantity</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {successfulContracts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4 font-medium text-gray-900">{c.crop}</td>
                    <td className="px-5 py-4 text-gray-600">{c.quantity}</td>
                    <td className="px-5 py-4 font-medium text-green-700">Rs. {c.amount}</td>
                    <td className="px-5 py-4 text-gray-600">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Crop Sales Summary */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Crop Sales Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cropSales.map((sale, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900">{sale.crop}</h3>
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-400">Quantity Sold</span>
                <span className="text-gray-900">{sale.quantity}</span>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span className="text-gray-400">Revenue</span>
                <span className="font-medium text-green-700">Rs. {sale.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FarmerDash;
