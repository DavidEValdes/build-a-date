import React from 'react';

const EditProfileModal = ({ user, onClose, onUpdate }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">✕</button>
        <h2 className="modal-title">Edit Profile</h2>
        <form onSubmit={onUpdate}>
          <label>
            Username:
            <input type="text" defaultValue={user.username} className="modal-input" />
          </label>
          <label>
            Email:
            <input type="email" defaultValue={user.email} className="modal-input" />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="modal-button">Cancel</button>
            <button type="submit" className="modal-button save-button">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
