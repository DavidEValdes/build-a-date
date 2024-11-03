// src/pages/DateDetail.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import { getDateIdea, likeDateIdea, unlikeDateIdea, addComment, getComments, saveDateIdea, unsaveDateIdea } from '../api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

const DateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const COST_CATEGORY_MAP = {
    free: 'Free',
    economy: '$',
    standard: '$$',
    premium: '$$$',
    luxury: '$$$$',
  };

  const getDollarSigns = (category) => {
    return COST_CATEGORY_MAP[category.toLowerCase()] || '$';
  };

  const { data: date, isLoading } = useQuery({
    queryKey: ['dateIdea', id],
    queryFn: () => getDateIdea(id),
  });

  useEffect(() => {
    if (date) {
      setIsSaved(date.is_saved || false);
      setIsLiked(date.is_liked || false);
      setLikesCount(date.likes_count || 0);
    }
  }, [date]);

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
  });

  const likeMutation = useMutation({
    mutationFn: () => (isLiked ? unlikeDateIdea(id) : likeDateIdea(id)),
    onSuccess: () => {
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      queryClient.invalidateQueries(['dateIdea', id]);
      queryClient.invalidateQueries(['dateIdeas']);
    },
    onError: (error) => {
      console.error('Error updating like:', error);
      if (error.response?.status === 403) {
        alert('Please login to like dates');
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => (isSaved ? unsaveDateIdea(id) : saveDateIdea(id)),
    onSuccess: () => {
      setIsSaved(!isSaved);
      queryClient.invalidateQueries(['savedDates']);
      queryClient.invalidateQueries(['feedDateIdeas']);
      queryClient.invalidateQueries(['dateIdeas']);
      queryClient.invalidateQueries(['dateIdea', id]);
      queryClient.invalidateQueries(['allDateIdeas']);
    },
    onError: (error) => {
      console.error('Error saving date:', error);
      if (error.response?.status === 403) {
        alert('Please login to save dates');
      }
    },
  });

  const commentMutation = useMutation({
    mutationFn: (content) => addComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
      setComment('');
    },
    onError: (error) => {
      console.error('Error adding comment:', error);
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
    navigator.clipboard.writeText(window.location.origin + `/dates/${date.id}`)
      .then(() => {
        alert('Date link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy the link.');
      });
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to save dates');
      return;
    }
    saveMutation.mutate();
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to like dates');
      return;
    }
    if (!likeMutation.isLoading) {
      likeMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="app-container">
        <main className="main-content">
          <div className="loading-spinner-container">
            <Spinner size={50} />
          </div>
        </main>
      </div>
    );
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
                <span className="cost-tag">{getDollarSigns(date.cost_category)}</span>
                <span className="duration-tag">{date.duration}</span>
              </div>
            </div>
          </div>
          <div className="detail-content">
            <section className="detail-section">
              <h3>About this Date</h3>
              <p>{date.description}</p>
            </section>
            <section className="detail-section details-info-section" style={{
              backgroundColor: '#4b5563 !important',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              margin: '1rem 0'
            }}>
              <h3>Details</h3>
              <div className="detail-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  { label: 'Location', value: date.location },
                  { label: 'Time of Day', value: date.time_of_day },
                  { label: 'Activity Level', value: date.activity_level },
                  { label: 'Distance', value: date.distance }
                ].map((item) => (
                  <div 
                    key={item.label} 
                    className="detail-item"
                    style={{
                      backgroundColor: 'white',
                      padding: '1.25rem',
                      borderRadius: '0.5rem',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                      border: '1px solid #f3f4f6'
                    }}
                  >
                    <span className="detail-label" style={{ 
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      display: 'block',
                      marginBottom: '0.25rem',
                      fontWeight: '500'
                    }}>
                      {item.label}
                    </span>
                    <span className="detail-value" style={{
                      color: '#1f2937',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="detail-section">
              <div className="interaction-buttons detail-actions">
                <button
                  className={`icon-button large ${isLiked ? 'liked' : ''}`}
                  onClick={handleLike}
                  disabled={likeMutation.isLoading}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                  <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
                </button>
                <button
                  className={`icon-button large ${isSaved ? 'saved' : ''}`}
                  onClick={handleSave}
                  disabled={saveMutation.isLoading}
                >
                  <Bookmark className={`w-5 h-5 transition-all duration-200 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button 
                  className="icon-button large" 
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </section>
            <section className="detail-section">
              <h3>Comments</h3>
              <form 
                onSubmit={handleSubmitComment} 
                className="comment-form"
              >
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
                <button type="submit" className="primary-button">
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
      <Footer />
    </div>
  );
};

export default DateDetail;
