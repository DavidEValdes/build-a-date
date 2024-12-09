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
  userPreferences
}) => {
  const allSuggestions = [suggestion, ...alternativeSuggestions];

  // Function to format preference value for display
  const formatPreference = (key, value) => {
    if (!value) return null;
    if (value === 'noPreference') return null;
    if (key === 'location' && value === 'both') return null;
    
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
    
    // Format arrays (for multiple choice answers)
    if (Array.isArray(value)) {
      if (key === 'activityTypes') {
        return '🎯 ' + value.map(v => v.toLowerCase()).join(' • ');
      }
      if (key === 'interests') {
        return '❤️ ' + value.map(v => v.toLowerCase()).join(' • ');
      }
      return value.map(v => v.toLowerCase()).join(' • ');
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
        summary.push(value);
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
            ℹ️ Some matches may vary due to limited options
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
