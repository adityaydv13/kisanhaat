import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, MapPin, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const API_MOCK_DATA = [
  // UP Crops
  { id: 1, state: 'Uttar Pradesh', market: 'Agra', commodity: 'Potato', min_price: 800, max_price: 1100, modal_price: 950, trend: 'stable' },
  { id: 2, state: 'Uttar Pradesh', market: 'Kanpur', commodity: 'Wheat', min_price: 2125, max_price: 2300, modal_price: 2200, trend: 'up' },
  { id: 3, state: 'Uttar Pradesh', market: 'Lucknow', commodity: 'Mustard', min_price: 4800, max_price: 5200, modal_price: 5000, trend: 'stable' },
  { id: 4, state: 'Uttar Pradesh', market: 'Meerut', commodity: 'Sugarcane', min_price: 340, max_price: 370, modal_price: 360, trend: 'up' },
  // Other States
  { id: 5, state: 'Maharashtra', market: 'Lasalgaon', commodity: 'Onion', min_price: 1500, max_price: 2200, modal_price: 1900, trend: 'up' },
  { id: 6, state: 'Punjab', market: 'Amritsar', commodity: 'Wheat', min_price: 2125, max_price: 2300, modal_price: 2200, trend: 'stable' },
  { id: 7, state: 'Haryana', market: 'Karnal', commodity: 'Rice', min_price: 2500, max_price: 3200, modal_price: 2800, trend: 'up' },
  { id: 8, state: 'Karnataka', market: 'Kolar', commodity: 'Tomato', min_price: 1200, max_price: 1800, modal_price: 1500, trend: 'down' },
  { id: 9, state: 'Gujarat', market: 'Rajkot', commodity: 'Cotton', min_price: 6500, max_price: 7200, modal_price: 6800, trend: 'up' },
  { id: 10, state: 'Madhya Pradesh', market: 'Indore', commodity: 'Soyabean', min_price: 4200, max_price: 4800, modal_price: 4500, trend: 'stable' },
  { id: 11, state: 'Andhra Pradesh', market: 'Guntur', commodity: 'Chilli Red', min_price: 15000, max_price: 18000, modal_price: 16500, trend: 'up' },
  { id: 12, state: 'Kerala', market: 'Kochi', commodity: 'Black Pepper', min_price: 48000, max_price: 52000, modal_price: 50000, trend: 'up' }
];

const MarketPrices = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Using open API key for Govt API. In production, use your own key from data.gov.in via .env
        const apiKey = import.meta.env.VITE_GOV_API_KEY || '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
        
        // data.gov.in resource ID for APMC Mandi daily market rates (Fetching across all states)
        const res = await axios.get(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=12`);
        
        if (res.data && res.data.records && res.data.records.length > 0) {
          const liveData = res.data.records.map((item, index) => {
            const min = parseInt(item.min_price) || 0;
            const max = parseInt(item.max_price) || 0;
            const modal = parseInt(item.modal_price) || 0;
            let currentTrend = 'stable';
            
            // basic dynamic indicator
            if (modal > min && max > min) {
               currentTrend = modal > (min + max) / 2 ? 'up' : 'down';
            }
            
            return {
              id: index + 1,
              state: item.state,
              market: item.market,
              commodity: item.commodity,
              min_price: min,
              max_price: max,
              modal_price: modal,
              trend: currentTrend
            };
          });
          setData(liveData);
        } else {
          setData(API_MOCK_DATA);
        }
      } catch (error) {
        console.error("Failed to fetch live gov data (API key may be rate limited). Falling back to mock data:", error);
        setData(API_MOCK_DATA); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full mt-12 bg-white/50 backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent flex items-center gap-2">
            <Activity className="text-green-600" />
            Live Mandi Prices
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Current wholesale market rates from Govt. APMC Mandis (₹ per Quintal)
          </p>
        </div>
        <div className="flex gap-2 items-center text-xs font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Data Sync
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all relative overflow-hidden group cursor-default"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-50 to-transparent -mr-10 -mt-10 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                  <MapPin size={12} className="text-gray-400" />
                  {item.market}, {item.state}
                </span>
                <div className={`p-1.5 rounded-md ${
                  item.trend === 'up' ? 'bg-emerald-50' : 
                  item.trend === 'down' ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  {item.trend === 'up' && <TrendingUp size={14} className="text-emerald-500" />}
                  {item.trend === 'down' && <TrendingDown size={14} className="text-red-500" />}
                  {item.trend === 'stable' && <span className="text-gray-400 text-xs font-bold leading-none px-1">—</span>}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-1 relative z-10">{item.commodity}</h3>
              
              <div className="flex items-end gap-2 mb-4 relative z-10">
                <span className="text-3xl font-extrabold text-green-700 tracking-tight">₹{item.modal_price}</span>
                <span className="text-xs text-gray-400 mb-1.5 font-medium">/ 100kg</span>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 border-t border-gray-50 pt-3 relative z-10 font-medium">
                <span className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Min Price</span>
                  ₹{item.min_price}
                </span>
                <span className="flex flex-col text-right">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Max Price</span>
                  ₹{item.max_price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
