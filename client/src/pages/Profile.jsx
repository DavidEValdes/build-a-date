import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Edit2, User } from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';
import Footer from '../components/Footer';

const Profile = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  
  // States for hover effects
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
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
    background: 'linear-gradient(to bottom, #e0e7ff, #f8fafc)', // Soft gradient background
    minHeight: '100vh', // Full viewport height
    display: 'flex',
    justifyContent: 'center', // Horizontal centering
    alignItems: 'center', // Vertical centering
    padding: '1rem', // Optional padding
    position: 'relative', // To position elements absolutely within
  };

  const profileContainerStyle = {
    maxWidth: '500px', // Fixed max width
    width: '100%', // Full width within max-width
    backgroundColor: 'white', // White background
    borderRadius: '1.5rem', // Rounded corners
    padding: '2.5rem', // Inner padding
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Subtle shadow
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    gap: '2.5rem', // Space between items
    position: 'relative', // For positioning child elements
  };

  const profileCardStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column', // Stack content vertically
    alignItems: 'center',
    gap: '2rem', // Space between avatar and info
    position: 'relative', // To position the back button inside the card
  };

  const avatarStyle = {
    width: '100px', // Reduced size from 128px to 100px
    height: '100px', // Reduced size from 128px to 100px
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solid #f8fafc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const textSmStyle = {
    fontSize: '0.875rem', // Equivalent to text-sm
    color: '#6b7280', // Gray-500
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
  };

  const textXlStyle = {
    fontSize: '1.25rem', // Equivalent to text-xl
    color: '#1f2937', // Gray-900
    fontWeight: '500',
  };

  const editButtonStyle = {
    padding: '0.5rem 1.5rem', // Reduced padding for smaller button
    backgroundColor: isEditHovered ? '#4338ca' : '#4f46e5', // Change color on hover
    color: 'white',
    fontSize: '1rem', // Reduced font size
    fontWeight: '500',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the content
    gap: '0.5rem', // Space between icon and text
    marginTop: '1rem', // Added top margin for spacing
  };

  const backButtonStyle = {
    position: 'absolute', // Position within the profile card
    top: '10px', // Adjust as needed
    left: '10px', // Adjust as needed
    background: isBackHovered ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)', // Darker on hover
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10, // Ensure it's above other elements
    transition: 'background 0.3s ease',
  };

  return (
    <div style={profilePageStyle} className="profile-page">
      {/* Profile Container */}
      <div style={profileContainerStyle} className="profile-container">
        {/* Profile Card */}
        <div style={profileCardStyle} className="profile-card">
          {/* Back Button */}
          <button
            onClick={handleBack}
            style={backButtonStyle}
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Profile Avatar */}
          <div style={avatarStyle} className="avatar">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <User className="w-6 h-6 text-gray-400" /> 
            )}
          </div>

          {/* Profile Information */}
          <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={textSmStyle}>Username</p>
              <p style={textXlStyle}>{user.username}</p>
            </div>

            <div>
              <p style={textSmStyle}>Email</p>
              <p style={textXlStyle}>{user.email}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEditProfile}
              style={editButtonStyle}
              onMouseEnter={() => setIsEditHovered(true)}
              onMouseLeave={() => setIsEditHovered(false)}
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
          
        </div>
        
      </div>
      
      {/* Edit Profile Modal */}
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
