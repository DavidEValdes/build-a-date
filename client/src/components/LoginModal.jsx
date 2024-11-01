// src/components/LoginModal.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        <h2 className="modal-title">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal-input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modal-input"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="modal-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
