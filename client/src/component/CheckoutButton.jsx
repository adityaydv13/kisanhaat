// src/components/CheckoutButton.jsx
import React, { useState } from "react";
import axios from "axios";

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(499); // rupees

  const payNow = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/pay/create`, {
        amount,
      });
      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl; // go to PhonePe
      } else {
        alert("Failed to get redirect URL");
      }
    } catch (e) {
      console.error(e);
      alert("Payment init failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
      <input
        type="number"
        value={amount}
        onChange={(e)=>setAmount(Number(e.target.value))}
        min={1}
        style={{ padding:8 }}
      />
      <button
        disabled={loading}
        onClick={payNow}
        style={{ padding:"10px 18px", background:"#0ca712", color:"#fff", border:"none", borderRadius:8, cursor:"pointer" }}
      >
        {loading ? "Redirecting..." : "Pay with PhonePe"}
      </button>
    </div>
  );
};

export default CheckoutButton;
