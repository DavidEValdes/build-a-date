import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Edit2, User } from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

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

  return (
    <div className="profile-page flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="profile-card bg-white rounded-xl shadow-lg max-w-md w-full p-8 flex flex-col items-center space-y-8">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="self-start flex items-center text-gray-600 hover:text-gray-900 transition duration-200 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back</span>
        </button>

        {/* Profile Avatar */}
        <div className="w-24 h-24 rounded-full border-4 border-gray-200 bg-gray-100 flex items-center justify-center shadow-md">
          <User className="w-12 h-12 text-gray-400" />
        </div>

        {/* Profile Information with Labels */}
        <div className="text-center space-y-4 w-full">
          <div className="text-left">
            <p className="text-sm font-bold text-gray-500 uppercase">Username</p>
            <p className="text-lg text-gray-800">{user.username}</p>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-500 uppercase">Email</p>
            <p className="text-lg text-gray-800">{user.email}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleEditProfile}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Edit2 className="w-4 h-4 mr-2 inline" />
          Edit Profile
        </button>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <EditProfileModal
            user={user}
            onClose={() => setShowEditModal(false)}
            onUpdate={updateUser}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
