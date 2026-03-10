import { useState } from "react";
import axios from "axios";

const RazorpayButton = ({ bidId, initialAmount = 499 }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const showStatus = (type, msg) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus(null), 4000);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    try {
      setLoading(true);
      setStatus(null);
      const isLoaded = await loadRazorpay();
      if (!isLoaded) { showStatus("error", "Razorpay SDK failed to load."); return; }

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/pay/razorpay/create`, { amount: initialAmount, bidId });
      if (!data?.orderId) { showStatus("error", "Failed to create order."); return; }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "KisanHaat",
        description: "Bid Payment",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/pay/razorpay/verify`, {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              bidId,
            });
            showStatus(verifyRes.data.success ? "success" : "error",
              verifyRes.data.success ? "Payment successful!" : "Payment verification failed.");
          } catch {
            showStatus("error", "Payment verification failed.");
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user") || '{}').name || "User",
          email: JSON.parse(localStorage.getItem("user") || '{}').email || "",
        },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      showStatus("error", "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {status && (
        <div className={`mb-3 p-3 rounded-xl text-sm font-medium ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`} role="alert">
          {status.msg}
        </div>
      )}
      <button
        disabled={loading}
        onClick={payNow}
        className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Pay Now
          </span>
        )}
      </button>
    </div>
  );
};

export default RazorpayButton;
