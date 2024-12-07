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
    navigate(path);
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

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/");
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu-container" ref={menuRef}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <Spinner size={40} />
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="profile-button"
        aria-label="Toggle user menu"
      >
        <UserCircle
          size={24}
          className={isAuthenticated ? "text-blue-600" : "text-gray-600"}
        />
      </button>

      {showMenu && (
        <div className="dropdown-menu">
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
                onClick={handleLogout}
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

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
};

export default UserMenu;
