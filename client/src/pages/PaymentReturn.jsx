// src/pages/PaymentReturn.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentReturn = () => {
  const [status, setStatus] = useState("Checking...");
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const transactionId = url.searchParams.get("transactionId");

    const checkStatus = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/pay/status`,
          { params: { transactionId } }
        );

        setRaw(data);
        const code = data?.data?.code;          
        const statusText = data?.data?.data?.state; 
        if (code === "PAYMENT_SUCCESS" || statusText === "COMPLETED") {
          setStatus("Payment Successful ✅");
        } else if (statusText === "PENDING") {
          setStatus("Payment Pending ⏳");
        } else {
          setStatus("Payment Failed");
        }
      } catch (e) {
        console.error(e);
        setStatus("Error while checking status");
      }
    };

    if (transactionId) checkStatus();
  }, []);

  return (
    <div style={{ maxWidth:600, margin:"60px auto", padding:"20px" }}>
      <h2>{status}</h2>
      <pre style={{ background:"#f5f5f5", padding:12, overflow:"auto" }}>
        {JSON.stringify(raw, null, 2)}
      </pre>
    </div>
  );
};

export default PaymentReturn;
