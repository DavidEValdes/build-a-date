import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeDateIdea } from '../api';

const DateCard = ({ date }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likeDateIdea,
    onSuccess: () => {
      queryClient.invalidateQueries(['dateIdeas']);
      queryClient.invalidateQueries(['dateIdea', date.id]);
    },
  });

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card navigation when clicking like
    likeMutation.mutate(date.id);
  };

  const handleSave = (e) => {
    e.stopPropagation(); // Prevent card navigation when clicking save
    setIsSaved(!isSaved);
  };

  const handleShare = (e) => {
    e.stopPropagation(); // Prevent card navigation when clicking share
    // Add share functionality here
  };

  const handleCardClick = () => {
    navigate(`/dates/${date.id}`);
  };

  return (
    <div 
      className="date-card" 
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="date-card-header">
        <img src={date.image_url} alt={date.title} />
      </div>
      <div className="date-card-content">
        <div className="date-card-title">
          <div>
            <h2>{date.title}</h2>
            <p className="location">{date.location}</p>
          </div>
          <div className="date-tags">
            <span className="activity-tag">{date.activity_type}</span>
            <span className="cost-tag">{date.cost_category}</span>
          </div>
        </div>
        <p className="description">{date.description}</p>
        <div className="duration">Duration: {date.duration}</div>
      </div>
      <div className="date-card-footer">
        <div className="interaction-buttons">
          <button
            className={`icon-button ${likeMutation.isSuccess ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={likeMutation.isPending}
          >
            <Heart className="w-5 h-5" />
            <span>{date.likes_count || 0}</span>
          </button>
          <button 
            className="icon-button"
            onClick={(e) => e.stopPropagation()} // Just prevent navigation
          >
            <MessageCircle className="w-5 h-5" />
            <span>{date.comments_count || 0}</span>
          </button>
        </div>
        <div className="action-buttons">
          <button
            className={`icon-button ${isSaved ? 'saved' : ''}`}
            onClick={handleSave}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button 
            className="icon-button"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateCard;