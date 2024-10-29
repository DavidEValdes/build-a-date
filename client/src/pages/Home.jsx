// src/pages/Home.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionPipeline from '../components/QuestionPipeline';
import DateCard from '../components/DateCard';
import { getDateIdeas, getAllDateIdeas, createDateIdea } from '../api';

const Home = () => {
  const [stage, setStage] = useState('welcome');
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const queryClient = useQueryClient();

  // Fetch date ideas for the feed (only shared date ideas)
  const { data: feedDates = [] } = useQuery({
    queryKey: ['feedDateIdeas'],
    queryFn: getDateIdeas,
  });

  // Fetch all date ideas for matching
  const { data: allDates = [] } = useQuery({
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
    // Calculate scores for each date idea based on user answers
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

    // Sort dates by score in descending order
    const sortedDates = scoredDates.sort((a, b) => b.score - a.score);

    // Select the top-scoring date idea
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
      <header className="app-header">
        <div className="header-content">
          <h1>Build a Date</h1>
        </div>
      </header>

      <main className="main-content">
        {stage === 'welcome' && (
          <div className="welcome-screen">
            <h2>Find Your Perfect Date</h2>
            <p>
              Let us help you plan the perfect date based on your preferences!
            </p>
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
                {createDateMutation.isPending ? (
                  <span className="loading-text">Sharing...</span>
                ) : (
                  'Share to Feed'
                )}
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

        {(stage === 'feed' || feedDates.length > 0) && (
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
              {feedDates.map((date) => (
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