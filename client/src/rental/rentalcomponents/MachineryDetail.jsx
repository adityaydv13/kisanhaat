import { useState, useEffect } from 'react';
import axios from 'axios';

const MachineryDetail = () => {
  const [machine, setMachine] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/machinery/cart`);
      setCart(response.data);
    } catch (error) {
      setCart([]);
    }
  };

  const fetchMachinery = async () => {
    if (!searchName.trim()) { setErrorMessage('Please enter a machine name.'); setMachine(null); return; }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/machinery?name=${searchName}`);
      if (response.data) { setMachine(response.data); setErrorMessage(''); }
      else { setMachine(null); setErrorMessage('Machine not found.'); }
    } catch (error) {
      setMachine(null);
      setErrorMessage(error.response?.data?.message || 'Error fetching machinery.');
    }
  };

  const addToCart = async () => {
    if (!machine) return;
    const cartItem = { machineId: machine._id, name: machine.name, description: machine.description || "No description" };
    if (cart.some(item => item.machineId === cartItem.machineId)) {
      showToast("error", `${cartItem.name} is already in the cart!`);
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/machinery/cart`, cartItem, { headers: { "Content-Type": "application/json" } });
      if (response.status === 201) {
        showToast("success", `${response.data.cartItem.name} added to cart!`);
        setCart(prev => [...prev, response.data.cartItem]);
      }
    } catch (error) {
      showToast("error", "Failed to add to cart.");
    }
  };

  const handleHire = async (machineId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?._id) { showToast("error", "You must be logged in."); return; }
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/hire`, { machineId: machineId || machine._id }, { headers: { Authorization: `Bearer ${token}` } });
      showToast("success", "Hire request sent!");
    } catch (err) {
      showToast("error", err.response?.data?.message || "Failed to send hire request.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{toast.msg}</p>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Search Machinery</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter machine name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchMachinery()}
            className="input-base flex-1"
          />
          <button onClick={fetchMachinery} className="btn-primary px-6 py-2.5 text-sm">
            Search
          </button>
        </div>
        {errorMessage && <p className="text-sm text-red-500 mt-3">{errorMessage}</p>}

        {machine && (
          <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-100 animate-fade-up">
            <h3 className="font-semibold text-gray-900 text-lg">{machine.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{machine.description}</p>
            <p className="text-sm font-medium text-green-700 mt-2">Rs. {machine.pricePerDay || machine.price}/day</p>
            <div className="flex gap-3 mt-4">
              <button onClick={addToCart} className="btn-base px-5 py-2 text-sm bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400">
                Add to Cart
              </button>
              <button onClick={() => handleHire()} className="btn-primary px-5 py-2 text-sm">
                Hire Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <button onClick={() => handleHire(item.machineId)} className="btn-primary px-4 py-2 text-xs">
                  Hire
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineryDetail;
