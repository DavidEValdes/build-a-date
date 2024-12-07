import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Edit2, User } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";
import Footer from "../components/Footer";

const Profile = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  // States for hover effects
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  // Inline Styles
  const profilePageStyle = {
    
    minHeight: "100vh", // Full viewport height
    display: "flex",
    justifyContent: "center", // Horizontal centering
    alignItems: "center", // Vertical centering
    padding: "1rem", // Optional padding
    position: "relative", // To position elements absolutely within
  };

  const profileContainerStyle = {
    maxWidth: "500px",
    width: "90%",
    backgroundColor: "white",
    borderRadius: "1.5rem",
    padding: "1.75rem", // Even padding all around
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.25rem", // Reduced gap
    position: "relative",
  };

  const profileCardStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem", // Slightly reduced gap
    position: "relative",
    margin: "0", // No margin
  };

  const avatarStyle = {
    width: "80px", // Reduced size for mobile
    height: "80px", // Reduced size for mobile
    borderRadius: "50%",
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "4px solid #f8fafc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const textSmStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontWeight: "bold",
    marginBottom: "0.25rem",
    textTransform: "uppercase",
  };

  const textXlStyle = {
    fontSize: "1.125rem", // Slightly reduced for mobile
    color: "#1f2937",
    fontWeight: "500",
    wordBreak: "break-word", // Added to prevent text overflow
    maxWidth: "100%", // Added to contain long text
  };

  const editButtonStyle = {
    padding: "0.5rem 1.25rem",
    backgroundColor: isEditHovered ? "#4338ca" : "#4f46e5",
    color: "white",
    fontSize: "0.875rem",
    fontWeight: "500",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "0.5rem", // Reduced top margin
    width: "auto",
    minWidth: "120px",
  };

  const backButtonStyle = {
    position: "absolute",
    top: "0.75rem", // Reduced from 1rem
    left: "0.75rem", // Reduced from 1rem
    background: isBackHovered ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 10,
    transition: "background 0.3s ease",
  };

  return (
    <div style={profilePageStyle} className="profile-page">
      <div style={profileContainerStyle} className="profile-container">
        <div style={profileCardStyle} className="profile-card">
          <button
            onClick={handleBack}
            style={backButtonStyle}
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div style={avatarStyle} className="avatar">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <User size={24} className="text-gray-400" /> // Reduced icon size
            )}
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "0 1rem", // Added horizontal padding
            }}
          >
            <div>
              <p style={textSmStyle}>Username</p>
              <p style={textXlStyle}>{user.username}</p>
            </div>

            <div>
              <p style={textSmStyle}>Email</p>
              <p style={textXlStyle}>{user.email}</p>
            </div>

            <button
              onClick={handleEditProfile}
              style={editButtonStyle}
              onMouseEnter={() => setIsEditHovered(true)}
              onMouseLeave={() => setIsEditHovered(false)}
            >
              <Edit2 size={16} /> {/* Reduced icon size */}
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onUpdate={updateUser}
        />
      )}
    </div>
  );
};

export default Profile;
