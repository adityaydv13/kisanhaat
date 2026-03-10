import { useState, useEffect } from 'react';
import axios from 'axios';
import FarmerSell from './FarmerSell';

import Vegetables from '../assets/image/Vegetables.png';
import Pulses from '../assets/image/Pulses.png';
import Rice1 from '../assets/image/Rice1.png';
import Fruits from '../assets/image/Fruits.png';

const itemImages = {
  vegetables: Vegetables,
  rice: Rice1,
  fruits: Fruits,
  pulses: Pulses,
};

const CreatePost = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    description: '',
    plants: [],
    amount: '',
    quantity: '',
    isActive: false,
    itemType: 'vegetables',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(null);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      if (isEditing) {
        const payload = {
          ...formData,
          plants: typeof formData.plants === 'string'
            ? formData.plants.split(',').map(p => p.trim()).filter(Boolean)
            : formData.plants,
          amount: Number(formData.amount),
          quantity: Number(formData.quantity),
        };
        await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${editingPostId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmitStatus({ type: "success", msg: "Post updated successfully!" });
      } else {
        const payload = {
          ...formData,
          plants: typeof formData.plants === 'string'
            ? formData.plants.split(',').map(p => p.trim()).filter(Boolean)
            : formData.plants,
          amount: Number(formData.amount),
          quantity: Number(formData.quantity),
        };
        await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmitStatus({ type: "success", msg: "Posted successfully!" });
      }
      setIsModalOpen(false);
      resetForm();
      setRefreshKey(k => k + 1);
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      setSubmitStatus({ type: "error", msg });
      setIsModalOpen(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const resetForm = () => {
    setFormData({ mobileNumber: '', description: '', plants: [], amount: '', quantity: '', isActive: false, itemType: 'vegetables' });
    setIsEditing(false);
    setEditingPostId(null);
  };

  const handleUpdate = (post) => {
    setFormData({
      mobileNumber: post.mobileNumber,
      description: post.description,
      plants: post.plants,
      amount: post.amount,
      quantity: post.quantity,
      isActive: post.isActive,
      itemType: post.itemType,
    });
    setIsEditing(true);
    setEditingPostId(post._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefreshKey(k => k + 1);
      setSubmitStatus({ type: "success", msg: "Post deleted!" });
      setTimeout(() => setSubmitStatus(null), 2000);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
      <FarmerSell />

      {/* Status Toast */}
      {submitStatus && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border animate-fade-up ${submitStatus.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`} role="alert">
          <p className="text-sm font-medium">{submitStatus.msg}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-5">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? 'Update Your Post' : 'Create New Listing'}
              </h2>
              <p className="text-green-100 text-sm mt-1">Add your produce details for contractors to bid</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Item Type</label>
                  <select name="itemType" value={formData.itemType} onChange={handleChange} className="input-base" required>
                    <option value="vegetables">Vegetables</option>
                    <option value="rice">Rice</option>
                    <option value="fruits">Fruits</option>
                    <option value="pulses">Pulses</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                  <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit mobile" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" className="input-base" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Plants (comma-separated)</label>
                <input type="text" name="plants" value={formData.plants} onChange={handleChange} placeholder="e.g., Tomato, Potato" className="input-base" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Describe your produce..." className="input-base" required />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (per Kg)</label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0" className="input-base" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (Kg)</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="0" className="input-base" required />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 focus:ring-2" />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-sm">
                {isEditing ? 'Update Post' : 'Create Post'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="w-full py-2.5 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors">
                  Cancel Editing
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Posts List */}
        <FarmerPosts token={token} refreshKey={refreshKey} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-up" style={{ animationDuration: "0.3s" }}>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm {isEditing ? 'Update' : 'Post'}</h3>
              <p className="text-sm text-gray-500 mb-6">
                {isEditing ? 'Are you sure you want to update this post?' : 'Ready to publish this listing?'}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1 py-2.5 text-sm">
                Cancel
              </button>
              <button onClick={handleConfirm} className="btn-primary flex-1 py-2.5 text-sm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FarmerPosts = ({ token, refreshKey, onDelete, onUpdate }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/my-posts/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token, refreshKey]);

  return (
    <div className="w-full lg:w-1/2">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Your Listings</h3>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {posts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-sm">No listings yet. Create your first post!</p>
            </div>
          )}
          {posts.map((post, i) => {
            const imageSrc = itemImages[post.itemType] || Vegetables;
            return (
              <div
                key={post._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <img src={imageSrc} alt={post.itemType} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{post.plants?.join(', ')}</h4>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${post.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {post.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                    <span className="font-medium">Rs. {post.amount}/Kg</span>
                    <span>{post.quantity} Kg</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => onUpdate(post)} className="btn-base px-3 py-1.5 text-xs bg-green-50 text-green-700 hover:bg-green-100 focus-visible:ring-green-400">
                      Edit
                    </button>
                    <button onClick={() => onDelete(post._id)} className="btn-base px-3 py-1.5 text-xs bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-400">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
