import { useState } from 'react';

const faqData = [
  {
    question: 'How do I list my crops for sale?',
    answer: 'After signing up as a farmer, go to the homepage and use the "Create New Listing" form. Fill in crop type, quantity, price per kg, and description. Contractors will be able to see and bid on your listing.'
  },
  {
    question: 'How does the bidding system work?',
    answer: 'Contractors browse active listings and place bids with their offered price. As a farmer, you can view all received bids and choose to accept or reject each one. Once accepted, the contractor can proceed with payment.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'KisanHaat uses Razorpay for secure transactions. Once a bid is accepted, the contractor can complete the payment directly from the platform.'
  },
  {
    question: 'How does machinery rental work?',
    answer: 'Visit the Rental section to browse or list agricultural machinery. Machine owners can post equipment with daily rates and location. Farmers can search, hire machines, and track their rental requests.'
  },
  {
    question: 'Is my data secure on KisanHaat?',
    answer: 'Yes. We use JWT-based authentication, encrypted passwords, and secure payment gateways. Your personal and financial information is protected at every step.'
  },
  {
    question: 'Can I use both farmer and contractor roles?',
    answer: 'Yes! Use the "Switch Role" button in the navigation to toggle between farmer and contractor views. This lets you both sell your produce and bid on others\' listings.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-500">Everything you need to know about KisanHaat</p>
        </div>

        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-5 pb-5 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed pt-4">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-green-50 rounded-2xl border border-green-100 animate-fade-up" style={{ animationDelay: '500ms' }}>
          <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-sm text-gray-500 mb-4">We're here to help. Reach out to our team.</p>
          <a href="/contact" className="btn-primary inline-flex px-6 py-2.5 text-sm no-underline">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
