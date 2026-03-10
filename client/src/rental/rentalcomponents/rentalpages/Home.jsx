import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hhome = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL}/api/enquiries`, {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    })
    .then(() => {
      setToast({ type: "success", msg: "Enquiry sent successfully!" });
      e.target.reset();
      setTimeout(() => setToast(null), 3000);
    })
    .catch((err) => {
      setToast({ type: "error", msg: err.response?.data?.message || "Error sending enquiry" });
      setTimeout(() => setToast(null), 3000);
    });
  };

  const categories = [
    { id: 'ploughing', name: 'Ploughing Machines', desc: 'Efficient ploughs for all soil types' },
    { id: 'tractor', name: 'Tractors', desc: 'Modern tractors for every farm size' },
    { id: 'harvester', name: 'Harvesters', desc: 'High-capacity harvesting equipment' },
  ];

  return (
    <div className="bg-white">
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{toast.msg}</p>
        </div>
      )}

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-green-800 to-green-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-medium">Machinery Rental</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Agriculture Machinery <span className="text-green-300">Rental</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
            Access modern farming equipment without the heavy investment. Rent machinery on-demand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={() => navigate("/machinerylist")}
              className="btn-base px-8 py-3 bg-white text-green-800 hover:bg-green-50 shadow-lg focus-visible:ring-white"
            >
              List Your Machine
            </button>
            <button
              onClick={() => navigate("/hire-machine")}
              className="btn-primary px-8 py-3 border border-green-500"
            >
              Hire a Machine
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Explore Categories</h2>
            <p className="text-gray-500">Browse machinery by category to find what you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group card-hover p-8 text-center animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors" aria-hidden="true">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Have Questions?</h2>
            <p className="text-gray-500 text-sm">Fill the form below and we'll get back to you</p>
          </div>
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <input type="text" placeholder="Your Name" required className="input-base !py-3" />
            <input type="email" placeholder="Email" required className="input-base !py-3" />
            <textarea placeholder="Your Message" rows={4} required className="input-base resize-none" />
            <button type="submit" className="btn-primary w-full py-3 text-sm">
              Send Enquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Hhome;
