import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DateCard from '../components/DateCard';
import Spinner from '../components/Spinner'; // Import Spinner
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSavedDates } from '../api';
import Footer from '../components/Footer';

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
        <button onClick={handleBack} className="back-button">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="saved-dates-header">
          <div className="header-with-divider">
            <h1 className="saved-dates-title">
              Saved Dates
            </h1>
            <div className="styled-divider">
              <span className="divider-line"></span>
              <div className="divider-dot"></div>
              <span className="divider-line"></span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner-container">
            <Spinner size={50} />
          </div>
        ) : savedDates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">You haven't saved any dates yet.</p>
        ) : (
          <div className="dates-grid">
            {savedDates.map((date) => (
              <DateCard key={date.id} date={date} />
            ))}
          </div>
        )}
        
      </main>
      <Footer />
    </div>
  );
};

export default SavedDates;