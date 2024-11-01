import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DateCard from '../components/DateCard';
import { ArrowLeft } from 'lucide-react';
import api from '../api';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [savedDates, setSavedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchSavedDates = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/users/saved-dates');
        setSavedDates(response.data);
      } catch (error) {
        console.error('Error fetching saved dates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedDates();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <div className="text-gray-600">
          <p className="mb-2"><span className="font-semibold">Username:</span> {user.username}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Saved Dates</h2>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : savedDates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">You haven't saved any dates yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDates.map((date) => (
              <DateCard key={date.id} date={date} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;