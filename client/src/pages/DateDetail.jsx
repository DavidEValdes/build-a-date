// src/pages/DateDetail.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import {
  getDateIdea,
  likeDateIdea,
  unlikeDateIdea,
  addComment,
  getComments,
  saveDateIdea,
  unsaveDateIdea,
  deleteComment, // Import deleteComment
} from '../api';
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
  const { isAuthenticated, user } = useAuth(); // Get user info
  const queryClient = useQueryClient();

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

  // Fetch date idea details
  const { data: date, isLoading } = useQuery({
    queryKey: ['dateIdea', id],
    queryFn: () => getDateIdea(id),
  });

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
  });

  useEffect(() => {
    if (date) {
      setIsSaved(date.is_saved || false);
      setIsLiked(date.is_liked || false);
      setLikesCount(Number(date.likes_count) || 0);
    }
  }, [date]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to like dates');
      return;
    }

    const wasLiked = isLiked;

    if (wasLiked) {
      setLikesCount((prev) => Number(prev) - 1);
    } else {
      setLikesCount((prev) => Number(prev) + 1);
    }
    setIsLiked(!wasLiked);

    if (wasLiked) {
      // User is unliking
      unlikeDateIdea(id).catch((error) => {
        console.error('Error unliking date idea:', error);
        setLikesCount((prev) => Number(prev) + 1);
        setIsLiked(true);
      });
    } else {
      // User is liking
      likeDateIdea(id).catch((error) => {
        console.error('Error liking date idea:', error);
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
      unsaveDateIdea(id).catch((error) => {
        console.error('Error unsaving date idea:', error);
        setIsSaved(true);
      });
    } else {
      saveDateIdea(id).catch((error) => {
        console.error('Error saving date idea:', error);
        setIsSaved(false);
      });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add comments');
      return;
    }

    if (comment.trim()) {
      addComment(id, comment)
        .then(() => {
          setComment('');
          queryClient.invalidateQueries(['comments', id]);
        })
        .catch((error) => {
          console.error('Error adding comment:', error);
        });
    }
  };

  const handleDeleteComment = (commentId) => {
    if (!isAuthenticated) {
      alert('Please login to delete comments');
      return;
    }

    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentId)
        .then(() => {
          queryClient.invalidateQueries(['comments', id]);
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
          alert('Failed to delete comment.');
        });
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
    navigator.clipboard
      .writeText(window.location.origin + `/dates/${id}`)
      .then(() => {
        alert('Date link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy the link.');
      });
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
              <button onClick={handleBack} className="back-button">
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
            <section
              className="detail-section details-info-section"
              style={{
                backgroundColor: '#4b5563 !important',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                margin: '1rem 0',
              }}
            >
              <h3>Details</h3>
              <div
                className="detail-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                {[
                  { label: 'Location', value: date.location },
                  { label: 'Time of Day', value: date.time_of_day },
                  { label: 'Activity Level', value: date.activity_level },
                  { label: 'Distance', value: date.distance },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="detail-item"
                    style={{
                      backgroundColor: 'white',
                      padding: '1.25rem',
                      borderRadius: '0.5rem',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                      border: '1px solid #f3f4f6',
                    }}
                  >
                    <span
                      className="detail-label"
                      style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        display: 'block',
                        marginBottom: '0.25rem',
                        fontWeight: '500',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="detail-value"
                      style={{
                        color: '#1f2937',
                        fontWeight: '600',
                        fontSize: '1rem',
                      }}
                    >
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
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                  <span>
                    {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
                  </span>
                </button>
                <button
                  className={`icon-button large ${isSaved ? 'saved' : ''}`}
                  onClick={handleSave}
                >
                  <Bookmark
                    className={`w-5 h-5 transition-all duration-200 ${
                      isSaved ? 'fill-current' : ''
                    }`}
                  />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button className="icon-button large" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
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
                <button type="submit" className="primary-button">
                  Post
                </button>
              </form>
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item" style={{ position: 'relative' }}>
                    <p className="comment-content">
                      <strong>{comment.username}:</strong> {comment.content}
                    </p>
                    <span className="comment-date">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                    {isAuthenticated && user && comment.user_id === user.id && (
                      <button
                        className="delete-comment-button"
                        onClick={() => handleDeleteComment(comment.id)}
                        aria-label="Delete Comment"
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '5px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#ff0000',
                          fontSize: '1.2em',
                        }}
                      >
                        &times;
                      </button>
                    )}
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
