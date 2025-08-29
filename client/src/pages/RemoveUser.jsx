import axios from "axios";

const DeleteAccount = ({ token, userId, onDelete, children }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (onDelete) onDelete();
      window.location.href = "/login"; // redirect after deletion
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <button onClick={handleDelete}>
      {children}
    </button>
  );
};

export default DeleteAccount;
