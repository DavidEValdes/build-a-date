// src/components/EditProfileModal.jsx

import React, { useState } from "react";

const EditProfileModal = ({ user, onClose, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await onUpdate({ username, email, currentPassword });
      onClose();
    } catch (err) {
      setError(err.error || "Failed to update profile");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">
          ✕
        </button>
        <h2 className="modal-title">Edit Profile</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleUpdate}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="modal-input"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal-input"
            />
          </label>
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="modal-input"
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="modal-button">
              Cancel
            </button>
            <button type="submit" className="modal-button save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
