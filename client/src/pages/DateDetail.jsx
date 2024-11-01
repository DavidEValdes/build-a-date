import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart, MessageCircle, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import { getDateIdea, likeDateIdea, addComment, getComments } from '../api';

const DateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const queryClient = useQueryClient();

  const { data: date, isLoading } = useQuery({
    queryKey: ['dateIdea', id],
    queryFn: () => getDateIdea(id)
  });

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

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!date) {
    return <div className="error-message">Date idea not found</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1>Date Details</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="date-detail-container">
          <div className="date-detail-header">
            <img src={date.image_url} alt={date.title} className="detail-image" />
            
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
                  onClick={() => likeMutation.mutate(id)}
                  disabled={likeMutation.isPending}
                >
                  <Heart />
                  <span>{date.likes_count || 0} Likes</span>
                </button>
                <button 
                  className={`icon-button large ${isSaved ? 'saved' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark />
                  <span>Save</span>
                </button>
                <button className="icon-button large">
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