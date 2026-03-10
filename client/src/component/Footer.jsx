import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">KisanHaat</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Bridging the gap between farmers and buyers. Fair prices, transparent deals, modern agriculture.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-green-400 transition-colors no-underline focus-visible:outline-none focus-visible:text-green-400">Marketplace</Link></li>
              <li><Link to="/rentalhome" className="text-sm text-gray-400 hover:text-green-400 transition-colors no-underline focus-visible:outline-none focus-visible:text-green-400">Machinery Rental</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-400 hover:text-green-400 transition-colors no-underline focus-visible:outline-none focus-visible:text-green-400">FAQs</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-green-400 transition-colors no-underline focus-visible:outline-none focus-visible:text-green-400">Contact</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-400">About Us</span></li>
              <li><span className="text-sm text-gray-400">Careers</span></li>
              <li><span className="text-sm text-gray-400">Privacy Policy</span></li>
              <li><span className="text-sm text-gray-400">Terms of Service</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-sm text-gray-400">support@kisanhaat.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-sm text-gray-400">+91-123-234-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                <span className="text-sm text-gray-400">Muradnagar, Ghaziabad, UP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">2024-2026 KisanHaat. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-sm text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Privacy</span>
            <span className="text-sm text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Terms</span>
            <span className="text-sm text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
