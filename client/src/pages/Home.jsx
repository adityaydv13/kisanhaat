import React, { useEffect, useState } from 'react';
import Hero from '../component/Hero';
import Farmer from '../component/Farmer';
import Contractor from '../component/Contractor';
import axios from 'axios';
import Testimonials from '../component/Testimonials';

const Home = ({ userRole }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="bg-white">
      {isLoggedIn ? (
        userRole === "farmer" ? <Farmer /> : <Contractor />
      ) : (
        <>
          <Hero />
          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How KisanHaat Works</h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">Simple, transparent, and fair marketplace for agricultural trade</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    ),
                    title: 'List Your Produce',
                    desc: 'Farmers create listings with crop details, quantities, and asking prices.'
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: 'Receive Fair Bids',
                    desc: 'Contractors browse listings and place competitive bids directly.'
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    title: 'Secure Payment',
                    desc: 'Complete transactions safely with integrated Razorpay payment gateway.'
                  }
                ].map((feature) => (
                  <div key={feature.title} className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Testimonials />
        </>
      )}
    </div>
  );
};

export default Home;
