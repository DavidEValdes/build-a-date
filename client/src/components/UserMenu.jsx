import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Spinner from "./Spinner";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleNavigation = (path) => {
    setShowMenu(false);
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      window.location.reload(); // Refreshes the page
    }, 500); // Delay to show spinner briefly
  };

  const handleHomeClick = () => handleNavigation("/");
  const handleProfileClick = () => handleNavigation("/profile");
  const handleSavedDatesClick = () => handleNavigation("/saved-dates");
  const handlePlanADateClick = () => handleNavigation("/plan-a-date");

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowMenu(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setShowMenu(false);
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (!menuRef.current || !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  // Close menu on Escape key press
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMenu]);

  return (
    <div className="user-menu-container relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="profile-button p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
        aria-haspopup="true"
        aria-expanded={showMenu}
        aria-label="User menu"
      >
        {loading ? (
          <Spinner size={24} color="#4f46e5" /> // Spinner replaces UserCircle
        ) : (
          <UserCircle
            className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${showMenu ? "transform rotate-90" : ""}`}
          />
        )}
      </button>

      {showMenu && (
        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {isAuthenticated ? (
            <>
              <div
                className="px-4 py-2 text-sm"
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "#507acf",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "25px",
                  margin: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {user.username}
              </div>

              <button
                onClick={handleHomeClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Home
              </button>
              <button
                onClick={handleProfileClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                My Profile
              </button>
              <button
                onClick={handleSavedDatesClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                style={{ color: "#507acf", fontWeight: "bold" }}
              >
                Saved Dates
              </button>
              
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                  setLoading(true);
                  setTimeout(() => {
                    window.location.reload(); // Refresh after logout
                  }, 500);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleHomeClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Home
              </button>
              <button
                onClick={handleLoginClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={handleRegisterClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Register
              </button>
             
            </>
          )}
        </div>
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
};

export default UserMenu;