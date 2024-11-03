// src/pages/Home.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionPipeline from '../components/QuestionPipeline';
import DateCard from '../components/DateCard';
import SuggestionDisplay from '../components/SuggestionDisplay';
import Spinner from '../components/Spinner';
import { getDateIdeas, getAllDateIdeas, createDateIdea } from '../api';

const Home = () => {
  const [stage, setStage] = useState('welcome');
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const queryClient = useQueryClient();

  const { data: feedDates = [], isLoading: isFeedLoading } = useQuery({
    queryKey: ['feedDateIdeas'],
    queryFn: getDateIdeas,
  });

  const { data: allDates = [], isLoading: isAllDatesLoading } = useQuery({
    queryKey: ['allDateIdeas'],
    queryFn: getAllDateIdeas,
  });

  const createDateMutation = useMutation({
    mutationFn: createDateIdea,
    onSuccess: () => {
      queryClient.invalidateQueries(['feedDateIdeas']);
    },
  });

  const handleQuestionnaireComplete = (answers) => {
    const scoredDates = allDates.map((date) => {
      let score = 0;

      if (date.mood === answers.mood) score += 2;
      if (date.time_of_day === answers.timeOfDay) score += 1;
      if (
        date.location === answers.indoorOutdoor ||
        answers.indoorOutdoor === 'noPreference'
      )
        score += 1;
      if (date.cost_category === answers.budget) score += 1;
      if (date.activity_level === answers.activityLevel) score += 2;
      if (date.distance === answers.distanceWilling) score += 1;
      if (date.importance === answers.importance) score += 1;

      return { ...date, score };
    });

    const sortedDates = scoredDates.sort((a, b) => b.score - a.score);
    const bestMatch = sortedDates[0];

    setCurrentSuggestion(bestMatch);
    setStage('suggestion');
  };

  const handleShareToFeed = async () => {
    if (currentSuggestion) {
      await createDateMutation.mutateAsync(currentSuggestion);
      setStage('feed');
    }
  };

  const handleStartOver = () => {
    setStage('questions');
    setCurrentSuggestion(null);
  };

  return (
    <div className="app-container">
      <main className="main-content">
        {/* Show welcome screen on welcome stage or after sharing to feed */}
        {(stage === 'welcome' || stage === 'feed') && (
          <div className="welcome-screen">
            <h2>Find Your Perfect Date</h2>
            <p style={{ fontSize: '1.125rem' }}>
              Let our <span style={{ fontWeight: 'bold' }}>AI-tailored matchmaker</span> find your perfect date.
            </p>
            <p style={{ fontSize: '1.125rem', marginTop: '0.5rem' }}>
              Choose from over <span style={{ fontWeight: 'bold' }}>200+ unique date ideas</span>, each crafted to create an unforgettable experience.
            </p>
            <button
              className="primary-button"
              onClick={() => setStage('questions')}
              disabled={isAllDatesLoading}
            >
              Start Building
            </button>
          </div>
        )}

        {stage === 'questions' && (
          <QuestionPipeline onComplete={handleQuestionnaireComplete} />
        )}

        {stage === 'suggestion' && currentSuggestion && (
          <div className="suggestion-screen">
            <h2 className="text-2xl font-bold text-center mb-6">Your Perfect Date Match!</h2>
            <SuggestionDisplay date={currentSuggestion} />
            <div className="suggestion-actions mt-8 flex justify-center gap-4">
              <button
                className="primary-button"
                onClick={handleShareToFeed}
                disabled={createDateMutation.isLoading}
              >
                Share to Feed
              </button>
              <button
                className="secondary-button"
                onClick={handleStartOver}
              >
                Try Different Preferences
              </button>
            </div>
          </div>
        )}

        {/* Feed section - always show */}
        <div className="feed-section">
  <div className="feed-header">
    <h2>Date Ideas Feed</h2>
  </div>
  
  {isFeedLoading ? (
    <div className="loading-spinner-container">
      <Spinner size={50} />
    </div>
  ) : feedDates.length > 0 ? (
    <div className="dates-grid">
      {feedDates.map((date) => (
        <DateCard key={date.id} date={date} />
      ))}
    </div>
  ) : (
    <div className="center mt-4">
      <p>No dates found</p>
    </div>
  )}
</div>
      </main>
    </div>
  );
};

export default Home;