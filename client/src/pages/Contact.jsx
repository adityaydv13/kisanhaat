import { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiries`, {
        name: e.target.firstName.value + ' ' + e.target.lastName.value,
        email: e.target.email.value,
        message: e.target.message.value,
      });
      setSubmitted(true);
      e.target.reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Try again.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Have questions or need assistance? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                label: 'Phone',
                value: '+91-123-234-4567',
              },
              {
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                label: 'Email',
                value: 'support@kisanhaat.com',
              },
              {
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                label: 'Address',
                value: 'Muradnagar, Ghaziabad, UP 201206',
              },
              {
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                label: 'Working Hours',
                value: 'Mon - Fri, 9:00 AM - 5:00 PM',
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl" role="alert">
                  <p className="text-sm text-green-700 font-medium">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl" role="alert">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                    <input id="firstName" name="firstName" type="text" placeholder="John" className="input-base" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Doe" className="input-base" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input id="email" name="email" type="email" placeholder="you@example.com" className="input-base" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input id="phone" name="phone" type="text" placeholder="+91-XXXXX-XXXXX" className="input-base" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="How can we help you?" className="input-base resize-none" required />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
