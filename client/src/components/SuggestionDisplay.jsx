import React, { useState, useEffect } from "react";
import "../App.css";
import "./SuggestionDisplay.css";
import Spinner from "./Spinner";
import { Heart, Share2, ArrowRight, ArrowLeft } from 'lucide-react';

const SuggestionDisplay = ({ 
  suggestion, 
  alternativeSuggestions = [], 
  currentIndex,
  setCurrentIndex,
  userPreferences,
  onRandomize,
  setStage,
  setIsSaved,
  setCurrentSuggestion,
  onSave,
  onShare,
  isSaved,
  savedSuggestions,
  sharedSuggestions
}) => {
  const allSuggestions = [suggestion, ...alternativeSuggestions];
  const currentSuggestion = allSuggestions[currentIndex];
  const isCurrentSaved = savedSuggestions?.has(currentSuggestion?.id);
  const isCurrentShared = sharedSuggestions?.has(currentSuggestion?.id);

  // Function to format preference value for display
  const formatPreference = (key, value) => {
    if (!value) return null;
    if (key === 'location' && value === 'both') return null;
    
    // Handle arrays (for multiple choice answers)
    if (Array.isArray(value)) {
      if (key === 'activityTypes') {
        if (value.includes('noPreference')) {
          return '✨ Flexible Activities';
        }
        return value.map(v => {
          switch(v) {
            case 'adventure': return '🎯 adventure';
            case 'relaxation': return '🌿 relaxation';
            case 'learning': return '📚 learning';
            case 'entertainment': return '🎉 entertainment';
            case 'wellness': return '🧘‍♀️ wellness';
            default: return v;
          }
        });
      }
      if (key === 'interests') {
        if (value.includes('noPreference')) {
          return '🎯 Open to All Interests';
        }
        return value.map(v => {
          switch(v) {
            case 'art': return '🎨 art';
            case 'music': return '🎵 music';
            case 'sports': return '⚽ sports';
            case 'technology': return '💻 technology';
            case 'food': return '🍽️ food';
            case 'nature': return '🌲 nature';
            case 'history': return '📜 history';
            default: return v;
          }
        });
      }
      return value.map(v => formatPreference(key, v));
    }

    // Format single values
    if (value === 'noPreference') {
      switch(key) {
        case 'atmosphere': return '🎭 Any Vibe';
        case 'activity_level': return '🌟 Any Activity Level';
        case 'budget': return '💰 Any Budget';
        case 'season': return '🗓️ Any Season';
        case 'time_of_day': return '⏰ Any Time';
        case 'groupSize': return '👥 Any Group Size';
        default: return null;
      }
    }

    // Format budget with dollar signs
    if (key === 'budget') {
      switch(value) {
        case 'free': return '🚫💰 free';
        case 'economy': return '💰 budget-friendly';
        case 'standard': return '💰💰 mid-range';
        case 'premium': return '💰💰💰 premium';
        case 'luxury': return '💰💰💰💰 luxury';
        default: return null;
      }
    }

    // Format atmosphere
    if (key === 'atmosphere') {
      switch(value) {
        case 'romantic': return '💑 romantic';
        case 'casual': return '😊 casual';
        case 'energetic': return '⚡ energetic';
        case 'fun': return '🎉 fun';
        default: return value.toLowerCase();
      }
    }

    // Format activity level
    if (key === 'activity_level') {
      switch(value) {
        case 'low': return '🌟 relaxed';
        case 'moderate': return '🌟🌟 moderate activity';
        case 'high': return '🌟🌟🌟 very active';
        default: return value.toLowerCase();
      }
    }

    // Format location
    if (key === 'location') {
      switch(value) {
        case 'indoor': return '🏠 indoor';
        case 'outdoor': return '🌳 outdoor';
        default: return value.toLowerCase();
      }
    }

    // Format time of day
    if (key === 'time_of_day') {
      switch(value) {
        case 'morning': return '🌅 morning';
        case 'afternoon': return '☀️ afternoon';
        case 'evening': return '🌆 evening';
        case 'night': return '🌙 night';
        default: return value.toLowerCase();
      }
    }

    // Format seasons
    if (key === 'season') {
      switch(value) {
        case 'spring': return '🌸 spring';
        case 'summer': return '☀️ summer';
        case 'autumn': return '🍂 autumn';
        case 'winter': return '❄️ winter';
        default: return value.toLowerCase();
      }
    }

    // Format group size
    if (key === 'groupSize') {
      switch(value) {
        case 'couple': return '👥 couple';
        case 'smallGroup': return '👥👥 small group';
        case 'largeGroup': return '👥👥👥 large group';
        default: return value.toLowerCase();
      }
    }
    
    // Format single values
    return value.toLowerCase();
  };

  // Get simple preference summary
  const getPreferenceSummary = () => {
    if (!userPreferences) return [];
    
    const summary = [];
    const order = [
      'atmosphere', 'activity_level', 'budget', 'location', 
      'time_of_day', 'season', 'groupSize', 'activityTypes', 'interests'
    ];
    
    order.forEach(key => {
      const value = formatPreference(key, userPreferences[key]);
      if (value) {
        if (Array.isArray(value)) {
          summary.push(...value);
        } else {
          summary.push(value);
        }
      }
    });
    
    return summary;
  };

  console.log('Current suggestion:', suggestion); // Debug log
  console.log('Alternative suggestions:', alternativeSuggestions); // Debug log
  console.log('All suggestions:', allSuggestions); // Debug log

  useEffect(() => {
    console.log('Number of suggestions:', allSuggestions.length); // Debug log
    console.log('Current index:', currentIndex);
  }, [allSuggestions, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % allSuggestions.length;
      console.log('Navigating to next:', next); // Debug log
      return next;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const next = prev === 0 ? allSuggestions.length - 1 : prev - 1;
      console.log('Navigating to prev:', next); // Debug log
      return next;
    });
  };

  const handleSave = () => {
    if (onSave && allSuggestions[currentIndex]) {
      onSave(allSuggestions[currentIndex]);
    }
  };

  const handleShare = () => {
    if (onShare && allSuggestions[currentIndex]) {
      onShare(allSuggestions[currentIndex]);
    }
  };

  return (
    <div className="suggestion-display">
      {/* Preference Summary */}
      {userPreferences && (
        <div className="preference-summary">
          {getPreferenceSummary().map((pref, index) => (
            <span key={index} className="preference-tag">
              {pref}
            </span>
          ))}
          <div className="preference-disclaimer">
            ℹ️ Some matches may vary due to limited date ideas
          </div>
        </div>
      )}

      {/* Main Display */}
      <div className="suggestion-main">
        <div className="suggestion-card">
          <img 
            src={allSuggestions[currentIndex].image_url || '/placeholder.jpg'} 
            alt={allSuggestions[currentIndex].title}
            className="suggestion-image"
          />
          <div className="suggestion-content">
            <h3 className="suggestion-title">{allSuggestions[currentIndex].title}</h3>
            <p className="suggestion-description">{allSuggestions[currentIndex].description}</p>
            
            <div className="suggestion-details">
              <span className="detail-item">
                <strong>Duration:</strong> {allSuggestions[currentIndex].duration}
              </span>
              <span className="detail-item">
                <strong>Cost:</strong> {allSuggestions[currentIndex].cost_category}
              </span>
              <span className="detail-item">
                <strong>Location:</strong> {allSuggestions[currentIndex].location}
              </span>
            </div>
          </div>
        </div>

        {/* Only show navigation when there are multiple suggestions */}
        {allSuggestions.length > 1 && (
          <>
            <div className="navigation-arrows">
              <button 
                onClick={handlePrev}
                className="nav-button prev"
                aria-label="Previous suggestion"
              >
                <ArrowLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="nav-button next"
                aria-label="Next suggestion"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <div className="pagination-dots">
              {allSuggestions.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to suggestion ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '12px',
          marginTop: '24px',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            maxWidth: '300px',
            marginBottom: '12px'
          }}>
            <button
              onClick={handleSave}
              className="primary-button"
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: isCurrentSaved ? '#4CAF50' : '#6c5ce7',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isCurrentSaved ? '✓ Saved' : 'Save Date'}
            </button>
            <button
              onClick={handleShare}
              className="secondary-button"
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: isCurrentShared ? '#4CAF50' : '#f3f4f6',
                color: isCurrentShared ? 'white' : '#4b5563',
                border: isCurrentShared ? 'none' : '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isCurrentShared ? '✓ Shared' : 'Share to Feed'}
            </button>
          </div>
          <button
            onClick={() => {
              setStage("questions");
              setIsSaved(false);
              setCurrentSuggestion(null);
            }}
            className="secondary-button"
            style={{
              padding: '12px 24px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              width: '100%',
              maxWidth: '300px',
              textAlign: 'center'
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#e5e7eb')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#f3f4f6')
            }
          >
            Try Different Preferences
          </button>
          <button
            className="secondary-button"
            onClick={onRandomize}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '12px 24px',
              backgroundColor: '#f3f4f6',
              color: '#4b5563',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              width: '100%',
              maxWidth: '300px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
          >
            🎲 Surprise Me!
          </button>
        </div>
      </div>

      {/* Only show preview when there are multiple suggestions */}
      {allSuggestions.length > 1 && (
        <div className="suggestions-preview">
          {allSuggestions.map((item, index) => (
            <div
              key={index}
              className={`preview-card ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img 
                src={item.image_url || '/placeholder.jpg'} 
                alt={item.title}
                className="preview-image"
              />
              <div className="preview-title">{item.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionDisplay;
