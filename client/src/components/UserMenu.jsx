// src/components/UserMenu.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleProfileClick = () => {
    setShowMenu(false);
    navigate('/profile');
  };

  const handleSavedDatesClick = () => {
    setShowMenu(false);
    navigate('/saved-dates');
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.user-menu-container')) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMenu]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowMenu(false);
    }
  };

  return (
    <div className="user-menu-container relative">
      <button
        onClick={toggleMenu}
        className="profile-button p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
        aria-haspopup="true"
        aria-expanded={showMenu}
        aria-label="User menu"
      >
        <UserCircle className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${showMenu ? 'icon-active' : ''}`} />
      </button>

      {showMenu && (
        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-dropdown" ref={menuRef}>
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {user.username}
              </div>
              <button
                onClick={handleProfileClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                My Profile
              </button>
              <button
                onClick={handleSavedDatesClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Saved Dates
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowRegisterModal(true);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}
    </div>
  );
};

export default UserMenu;