import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionPipeline from '../components/QuestionPipeline';
import DateCard from '../components/DateCard';
import SuggestionDisplay from '../components/SuggestionDisplay';
import Spinner from '../components/Spinner';
import { getDateIdeas, getAllDateIdeas, createDateIdea } from '../api';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import Footer from '../components/Footer';

const Home = () => {
  const [stage, setStage] = useState('welcome');
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
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

  const getSortedDates = (dates) => {
    return [...dates].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'mostLiked':
          return (b.likes_count || 0) - (a.likes_count || 0);
        case 'leastLiked':
          return (a.likes_count || 0) - (b.likes_count || 0);
        case 'mostCommented':
          return (b.comments_count || 0) - (a.comments_count || 0);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  return (
    <div className="app-container">
      <main className="main-content">
        {(stage === 'welcome' || stage === 'feed') && (
          <div className="welcome-screen">
            <h2 style={{ color: '#000000' }}>Find Your Perfect Date</h2>
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
              style={{ marginBottom: '2rem' }}
            >
              Start Building
            </button>
            <div
              style={{
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                borderRadius: '12px',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
              }}
            >
              <Link 
                to="/plan-a-date"
                className="plan-date-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  color: '#507acf',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.01em',
                }}
              >
                <span>Already have a date idea? Plan it here</span>
                <ArrowRight size={18} style={{ marginLeft: '4px', transition: 'transform 0.2s ease' }}/>
              </Link>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #507acf, transparent)',
                  opacity: 0.5,
                }}
              />
            </div>
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

        <div className="feed-section">
          <div
            className="feed-header-container"
            style={{
              marginTop: '1.5rem', 
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h2
                className="feed-title custom-feed-title"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#000000',
                }}
              >
                Date Ideas Feed
              </h2>
              
              <div className="sort-container" style={{ position: 'relative' }}>
                <button
                  onClick={() => document.getElementById('sort-select').click()}
                  className="sort-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <SlidersHorizontal size={16} />
                  <span>Sort By</span>
                </button>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="mostLiked">Most Liked</option>
                  <option value="leastLiked">Least Liked</option>
                  <option value="mostCommented">Most Commented</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
            </div>
            
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                height: '1.5rem',
              }}
            >
              <span
                className="divider-line"
                style={{
                  height: '1px',
                  backgroundColor: '#ccc',
                  flex: 1,
                }}
              ></span>
              <div
                className="divider-dot"
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#4f46e5',
                  borderRadius: '50%',
                }}
              ></div>
              <span
                className="divider-line"
                style={{
                  height: '1px',
                  backgroundColor: '#ccc',
                  flex: 1,
                }}
              ></span>
            </div>
          </div>

          {isFeedLoading ? (
            <div className="loading-spinner-container">
              <Spinner size={50} />
            </div>
          ) : feedDates.length > 0 ? (
            <div 
              className="feed-container"
              style={{ 
                height: '1100px',
                overflow: 'auto',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                marginBottom: '2rem',
              }}
            >
              <div className="dates-grid">
                {getSortedDates(feedDates).map((date) => (
                  <DateCard key={date.id} date={date} />
                ))}
              </div>
            </div>
          ) : (
            <div className="center mt-4">
              <p>No dates found</p>
            </div>
          )}
        </div>
      </main>

      <style>
        {`
          .feed-container::-webkit-scrollbar {
            width: 8px;
          }

          .feed-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          .feed-container::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 4px;
          }

          .feed-container::-webkit-scrollbar-thumb:hover {
            background: #ccc;
          }

          .plan-date-link {
            color: #507acf !important;
          }

         

          .sort-button {
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }

          .sort-button:hover {
            border-color: #507acf;
            color: #507acf;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .sort-container:active .sort-button {
            transform: translateY(0);
          }

          .sort-select {
            outline: none;
          }
        `}
      </style>
      <Footer />
    </div>
  );
};

export default Home;