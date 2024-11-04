// src/components/DateCard.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { likeDateIdea, unlikeDateIdea, saveDateIdea, unsaveDateIdea } from '../api';
import { useAuth } from '../context/AuthContext';

const COST_CATEGORY_MAP = {
  free: 'Free',
  economy: '$',
  standard: '$$',
  premium: '$$$',
  luxury: '$$$$',
};

const DateCard = ({ date }) => {
  const [isSaved, setIsSaved] = useState(date.is_saved || false);
  const [isLiked, setIsLiked] = useState(date.is_liked || false);
  const [likesCount, setLikesCount] = useState(Number(date.likes_count) || 0); // Ensure it's a number
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Format the date
  const dateObj = new Date(date.created_at);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to like dates');
      return;
    }

    // Capture the previous isLiked value
    const wasLiked = isLiked;

    // Optimistically update the like count and isLiked state
    if (wasLiked) {
      setLikesCount((prev) => Number(prev) - 1);
    } else {
      setLikesCount((prev) => Number(prev) + 1);
    }
    setIsLiked(!wasLiked);

    // Send the request to the backend, but don't wait for the response
    if (wasLiked) {
      // User is unliking
      unlikeDateIdea(date.id).catch((error) => {
        console.error('Error unliking date idea:', error);
        // Revert state if there's an error
        setLikesCount((prev) => Number(prev) + 1);
        setIsLiked(true);
      });
    } else {
      // User is liking
      likeDateIdea(date.id).catch((error) => {
        console.error('Error liking date idea:', error);
        // Revert state if there's an error
        setLikesCount((prev) => Number(prev) - 1);
        setIsLiked(false);
      });
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to save dates');
      return;
    }

    const wasSaved = isSaved;
    setIsSaved(!wasSaved);

    if (wasSaved) {
      unsaveDateIdea(date.id).catch((error) => {
        console.error('Error unsaving date idea:', error);
        setIsSaved(true);
      });
    } else {
      saveDateIdea(date.id).catch((error) => {
        console.error('Error saving date idea:', error);
        setIsSaved(false);
      });
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(window.location.origin + `/dates/${date.id}`)
      .then(() => {
        alert('Date link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy the link.');
      });
  };

  const handleCardClick = () => {
    navigate(`/dates/${date.id}`);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    navigate(`/dates/${date.id}?focus=comments`);
  };

  const getDollarSigns = (category) => {
    return COST_CATEGORY_MAP[category.toLowerCase()] || '$';
  };

  return (
    <div className="date-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="date-card-header">
        <img src={date.image_url} alt={date.title} />
      </div>

      <div
        className="date-card-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '1.5rem',
          position: 'relative', // Added to position the time-added text
        }}
      >
        <div className="date-card-title">
          <div>
            <h2>{date.title}</h2>
            <p className="location">{date.location}</p>
          </div>
          <div className="cost-tag">
            <span className="tag">{getDollarSigns(date.cost_category)}</span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <p
            className="description"
            style={{
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              borderTop: '1px solid #eee',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {date.description}
          </p>

          <div
            className="duration"
            style={{
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              borderTop: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            Duration: {date.duration}
          </div>
        </div>

        {/* Time Added */}
        <div
  className="time-added"
  style={{
    fontSize: '0.6rem',         // Reduced from 0.7rem
    color: '#6b7280',
    position: 'absolute',
    bottom: '0.8rem',          // Reduced from 1rem
    left: '1.2rem',            // Reduced from 1.5rem
    backgroundColor: '#f3f4f6',
    borderRadius:'4px'
        // Reduced from 1px 6px
   
    
  }}
>
  @ {formattedDate}
</div>
      </div>

      <div className="date-card-footer">
        <div className="interaction-buttons">
          <button
            className={`icon-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-label={`Like this date idea (${likesCount} likes)`}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isLiked ? 'fill-current text-red-500' : ''
              }`}
            />
            <span className="ml-1">{likesCount}</span>
          </button>

          <button
            className="icon-button"
            onClick={handleCommentClick}
            aria-label={`${date.comments_count || 0} comments`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="ml-1">{date.comments_count || 0}</span>
          </button>
        </div>

        <div className="action-buttons">
          <button
            className={`icon-button ${isSaved ? 'saved' : ''}`}
            onClick={handleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save this date idea'}
          >
            <Bookmark
              className={`w-5 h-5 transition-all duration-200 ${isSaved ? 'fill-current' : ''}`}
            />
          </button>

          <button className="icon-button" onClick={handleShare} aria-label="Share this date idea">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateCard;