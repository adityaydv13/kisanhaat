import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const categories = ["All", "Vegetable", "Fruit", "Grain"];

const FetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidStatus, setBidStatus] = useState(null);
  const bidInputRef = useRef(null);

  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const postsWithDates = response.data.map(post => ({
        ...post,
        createdAt: new Date(post.createdAt || Date.now()),
      }));
      setPosts(postsWithDates);
      setFilteredPosts(postsWithDates);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  useEffect(() => {
    if (selectedCategory === "All") setFilteredPosts(posts);
    else setFilteredPosts(posts.filter(post => post.plants?.some(p => p.toLowerCase().includes(selectedCategory.toLowerCase()))));
  }, [selectedCategory, posts]);

  const openModal = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
    setBidStatus(null);
    setTimeout(() => bidInputRef.current?.focus(), 100);
  };
  const closeModal = () => { setIsModalOpen(false); setBidAmount(''); setBidStatus(null); };

  const submitBid = async () => {
    if (!currentPost || !bidAmount) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/crops/bids`,
        { postId: currentPost._id, bidAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBidStatus({ type: "success", msg: "Bid placed successfully!" });
      setTimeout(closeModal, 1500);
    } catch (error) {
      setBidStatus({ type: "error", msg: error.response?.data?.message || "Error placing bid. Try again." });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
    }, { threshold: 0.1 });
    const hiddenElements = document.querySelectorAll('.hidden-card');
    hiddenElements.forEach(el => observer.observe(el));
    return () => hiddenElements.forEach(el => observer.unobserve(el));
  }, [filteredPosts]);

  const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Active Marketplace</h1>
        <p className="text-gray-500 mt-2">Browse fresh produce from verified farmers and place your bids</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap" role="tablist" aria-label="Filter by category">
        {categories.map(category => (
          <button
            key={category}
            role="tab"
            aria-selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            className={`btn-base px-5 py-2 text-sm ${
              selectedCategory === category
                ? "bg-green-600 text-white shadow-sm focus-visible:ring-green-500"
                : "bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700 focus-visible:ring-green-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading marketplace...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 font-medium">No listings found in this category</p>
          <p className="text-gray-400 text-sm mt-1">Try selecting a different filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPosts.map((post, index) => (
            <div
              key={post._id}
              className="hidden-card bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-base">{post.plants?.join(', ')}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${post.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.isActive ? 'Active' : 'Closed'}
                  </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-sm font-bold text-gray-900">Rs. {post.amount}/Kg</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Quantity</p>
                    <p className="text-sm font-bold text-gray-900">{post.quantity} Kg</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {post.farmerName?.charAt(0)?.toUpperCase() || 'F'}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{post.farmerName}</p>
                    <p className="text-[11px] text-gray-400">{formatDate(post.createdAt)}</p>
                  </div>
                </div>

                <button
                  className="btn-primary w-full py-2.5 text-sm"
                  onClick={() => openModal(post)}
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bid Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Place a bid"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-up" style={{ animationDuration: "0.3s" }}>
            <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4">
              <h2 className="text-lg font-bold text-white">Place Your Bid</h2>
              <p className="text-green-100 text-sm">{currentPost?.plants?.join(', ')}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400">Farmer's Ask</p>
                  <p className="text-base font-bold text-gray-900">Rs. {currentPost?.amount}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400">Quantity</p>
                  <p className="text-base font-bold text-gray-900">{currentPost?.quantity} Kg</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Offer (Rs.)</label>
                <input
                  ref={bidInputRef}
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="input-base text-lg font-semibold !py-3"
                  placeholder="Enter amount"
                />
              </div>

              {bidStatus && (
                <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${bidStatus.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`} role="alert">
                  {bidStatus.msg}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={closeModal} className="btn-secondary flex-1 py-3 text-sm">
                  Cancel
                </button>
                <button onClick={submitBid} disabled={!bidAmount} className="btn-primary flex-1 py-3 text-sm disabled:opacity-50 disabled:active:scale-100">
                  Submit Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchPosts;
