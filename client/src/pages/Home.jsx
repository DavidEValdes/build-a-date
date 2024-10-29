// src/pages/Home.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionPipeline from '../components/QuestionPipeline';
import DateCard from '../components/DateCard';
import { getDateIdeas, createDateIdea } from '../api';

const Home = () => {
  const [stage, setStage] = useState('welcome');
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const queryClient = useQueryClient();

  const { data: dates = [] } = useQuery({
    queryKey: ['dateIdeas'],
    queryFn: getDateIdeas
  });

  const createDateMutation = useMutation({
    mutationFn: createDateIdea,
    onSuccess: () => {
      queryClient.invalidateQueries(['dateIdeas']);
    },
  });

  const handleQuestionnaireComplete = async (answers) => {
    // Create a date idea based on answers
    const suggestion = {
      title: `${answers.preference.charAt(0).toUpperCase() + answers.preference.slice(1)} Date`,
      description: `A ${answers.preference} date perfect for ${answers.duration} of fun!`,
      location: answers.location,
      cost_category: answers.budget,
      activity_type: answers.preference,
      duration: answers.duration,
      image_url: "/api/placeholder/400/300"
    };

    setCurrentSuggestion(suggestion);
    setStage('suggestion');
  };

  const handleShareToFeed = async () => {
    if (currentSuggestion) {
      await createDateMutation.mutateAsync(currentSuggestion);
      setStage('feed');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Build a Date</h1>
        </div>
      </header>
      
      <main className="main-content">
        {stage === 'welcome' && (
          <div className="welcome-screen">
            <h2>Find Your Perfect Date</h2>
            <p>Let us help you plan the perfect date based on your preferences!</p>
            <button 
              className="primary-button"
              onClick={() => setStage('questions')}
            >
              Start Planning
            </button>
          </div>
        )}

        {stage === 'questions' && (
          <QuestionPipeline onComplete={handleQuestionnaireComplete} />
        )}

        {stage === 'suggestion' && currentSuggestion && (
          <div className="suggestion-screen">
            <h2>Your Perfect Date Idea</h2>
            <DateCard date={currentSuggestion} />
            <div className="suggestion-actions">
              <button 
                className="primary-button"
                onClick={handleShareToFeed}
                disabled={createDateMutation.isPending}
              >
                {createDateMutation.isPending ? 'Sharing...' : 'Share to Feed'}
              </button>
            </div>
          </div>
        )}

        {(stage === 'feed' || dates.length > 0) && (
          <div className="feed-section">
            <div className="feed-header">
              <h2>Date Ideas Feed</h2>
              {stage === 'feed' && (
                <button 
                  className="secondary-button"
                  onClick={() => {
                    setStage('welcome');
                    setCurrentSuggestion(null);
                  }}
                >
                  Plan Another Date
                </button>
              )}
            </div>
            <div className="dates-grid">
              {dates.map((date) => (
                <DateCard key={date.id} date={date} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;