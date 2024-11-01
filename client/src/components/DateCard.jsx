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
        onSuccess: (data) => {
            queryClient.invalidateQueries(['dateIdeas']);
            queryClient.invalidateQueries(['dateIdea', date.id]);
        },
        onError: (error) => {
            console.error('Error liking date:', error);
        }
    });

    const handleLike = (e) => {
        e.stopPropagation(); 
        if (!likeMutation.isPending) {
            likeMutation.mutate(date.id);
        }
    };

    const handleSave = (e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    const handleShare = (e) => {
        e.stopPropagation();
    };

    const handleCardClick = () => {
        navigate(`/dates/${date.id}`);
    };

    const handleCommentClick = (e) => {
        e.stopPropagation();
        // Navigate to detail view with a comment parameter
        navigate(`/dates/${date.id}?focus=comments`);
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
                        aria-label={`Like this date idea (${date.likes_count || 0} likes)`}
                    >
                        <Heart 
                            className={`w-5 h-5 transition-all duration-200 ${
                                likeMutation.isPending ? 'opacity-50' : ''
                            }`} 
                        />
                        <span className="ml-1">{date.likes_count || 0}</span>
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
                            className={`w-5 h-5 transition-all duration-200 ${
                                isSaved ? 'fill-current' : ''
                            }`}
                        />
                    </button>

                    <button
                        className="icon-button"
                        onClick={handleShare}
                        aria-label="Share this date idea"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateCard;