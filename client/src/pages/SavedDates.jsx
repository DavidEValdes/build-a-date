import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DateCard from '../components/DateCard';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSavedDates } from '../api';

const SavedDates = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { data: savedDates = [], isLoading } = useQuery({
    queryKey: ['savedDates'],
    queryFn: getSavedDates,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="app-container">
      <main className="main-content">
        <button
          onClick={handleBack}
          className="back-button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="saved-dates-header">
          <h1 className="saved-dates-title">
            Saved Dates
          </h1>
        </div>

        <div className="dates-grid">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : savedDates.length === 0 ? (
            <p className="text-gray-500 text-center py-4">You haven't saved any dates yet.</p>
          ) : (
            savedDates.map((date) => (
              <DateCard key={date.id} date={date} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedDates;