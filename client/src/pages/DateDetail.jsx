// src/pages/DateDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import { getDateIdea, likeDateIdea, addComment, getComments, saveDateIdea, unsaveDateIdea } from '../api';
import { useAuth } from '../context/AuthContext';

const DateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const { data: date, isLoading } = useQuery({
    queryKey: ['dateIdea', id],
    queryFn: () => getDateIdea(id)
  });

  // Update local saved state when date data changes
  useEffect(() => {
    if (date) {
      setIsSaved(date.is_saved || false);
    }
  }, [date]);

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id)
  });

  const likeMutation = useMutation({
    mutationFn: likeDateIdea,
    onSuccess: () => {
      queryClient.invalidateQueries(['dateIdea', id]);
    },
  });

  const saveMutation = useMutation({
    mutationFn: (dateId) => (isSaved ? unsaveDateIdea(dateId) : saveDateIdea(dateId)),
    onSuccess: () => {
      setIsSaved(!isSaved);
      // Invalidate all relevant queries
      queryClient.invalidateQueries(['savedDates']);
      queryClient.invalidateQueries(['dateIdeas']);
      queryClient.invalidateQueries(['dateIdea', id]);
      queryClient.invalidateQueries(['allDateIdeas']);
    },
    onError: (error) => {
      console.error('Error saving date:', error);
      if (error.response?.status === 403) {
        alert('Please login to save dates');
      }
    }
  });

  const commentMutation = useMutation({
    mutationFn: (content) => addComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
      setComment('');
    },
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      commentMutation.mutateAsync(comment);
    }
  };

  const handleImageError = () => {
    const img = document.getElementById('detail-image');
    if (img) {
      img.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Implement share functionality
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to save dates');
      return;
    }
    saveMutation.mutate(id);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to like dates');
      return;
    }
    if (!likeMutation.isPending) {
      likeMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!date) {
    return <div className="error-message">Date idea not found</div>;
  }

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="date-detail-container">
          <div className="date-detail-header">
            <div className="image-container">
              <button 
                onClick={handleBack} 
                className="back-button"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img 
                src={date.image_url} 
                alt={date.title} 
                className="detail-image" 
                id="detail-image"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
            
            <div className="detail-info">
              <h2>{date.title}</h2>
              <div className="detail-tags">
                <span className="activity-tag">{date.activity_type}</span>
                <span className="cost-tag">{date.cost_category}</span>
                <span className="duration-tag">{date.duration}</span>
              </div>
            </div>
          </div>

          <div className="detail-content">
            <section className="detail-section">
              <h3>About this Date</h3>
              <p>{date.description}</p>
            </section>

            <section className="detail-section">
              <h3>Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{date.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time of Day</span>
                  <span className="detail-value">{date.time_of_day}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Activity Level</span>
                  <span className="detail-value">{date.activity_level}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Distance</span>
                  <span className="detail-value">{date.distance}</span>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <div className="interaction-buttons detail-actions">
                <button 
                  className={`icon-button large ${likeMutation.isSuccess ? 'liked' : ''}`}
                  onClick={handleLike}
                  disabled={likeMutation.isPending}
                  aria-label={`Like this date idea (${date.likes_count || 0} likes)`}
                >
                  <Heart className={`w-5 h-5 ${likeMutation.isPending ? 'opacity-50' : ''}`} />
                  <span>{date.likes_count || 0} Likes</span>
                </button>
                <button 
                  className={`icon-button large ${isSaved ? 'saved' : ''}`}
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                  aria-label={isSaved ? 'Remove from saved' : 'Save this date idea'}
                >
                  <Bookmark 
                    className={`w-5 h-5 transition-all duration-200 ${
                      isSaved ? 'fill-current' : ''
                    }`}
                  />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button className="icon-button large" onClick={handleShare}>
                  <Share2 />
                  <span>Share</span>
                </button>
              </div>
            </section>

            <section className="detail-section">
              <h3>Comments</h3>
              <form onSubmit={handleSubmitComment} className="comment-form">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
                <button 
                  type="submit" 
                  className="primary-button"
                  disabled={commentMutation.isPending}
                >
                  Post
                </button>
              </form>
              
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <p className="comment-content">{comment.content}</p>
                    <span className="comment-date">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DateDetail;