 

// export default DeleteAccount;
import { useState } from "react";
import axios from "axios";

const DeleteAccount = ({ token, userId, onDelete, children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (onDelete) onDelete();
      setShowModal(false);
      window.location.href = "/login"; // redirect after deletion
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="btn btn-warning w-full"
        onClick={() => setShowModal(true)}
      >
        {children || "Delete Account"}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
           <h2 className="text-xl font-semibold mb-4 text-green-600">Confirm Deletion</h2>
<p className="mb-6 text-green-600">
  Are you sure you want to delete your account? This action cannot be undone.
</p>
            <div className="flex justify-between space-x-4">
              <button
                className="btn btn-gray w-1/2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error w-1/2"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
