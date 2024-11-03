import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeDateIdea, saveDateIdea, unsaveDateIdea } from '../api';
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
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setIsSaved(date.is_saved || false);
    }, [date.is_saved]);

    const likeMutation = useMutation({
        mutationFn: likeDateIdea,
        onSuccess: () => {
            queryClient.invalidateQueries(['dateIdeas']);
            queryClient.invalidateQueries(['dateIdea', date.id]);
        },
        onError: (error) => {
            console.error('Error liking date:', error);
        }
    });

    const saveMutation = useMutation({
        mutationFn: (id) => (isSaved ? unsaveDateIdea(id) : saveDateIdea(id)),
        onSuccess: () => {
            setIsSaved(!isSaved);
            queryClient.invalidateQueries({ queryKey: ['savedDates'] });
            queryClient.invalidateQueries({ queryKey: ['feedDateIdeas'] });
            queryClient.invalidateQueries({ queryKey: ['dateIdeas'] });
            queryClient.invalidateQueries({ queryKey: ['dateIdea', date.id] });
        },
        onError: (error) => {
            console.error('Error saving date:', error);
            if (error.response?.status === 403) {
                alert('Please login to save dates');
            }
        }
    });

    const handleLike = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            alert('Please login to like dates');
            return;
        }
        if (!likeMutation.isLoading) {
            likeMutation.mutate(date.id);
        }
    };

    const handleSave = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            alert('Please login to save dates');
            return;
        }
        saveMutation.mutate(date.id);
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
        <div 
            className="date-card" 
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="date-card-header">
                <img src={date.image_url} alt={date.title} />
            </div>
            
            <div className="date-card-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="date-card-title">
                    <div>
                        <h2>{date.title}</h2>
                        <p className="location">{date.location}</p>
                    </div>
                    <div className="cost-tag">
                        <span className="tag">{getDollarSigns(date.cost_category)}</span>
                    </div>
                </div>
                
                <p className="description" style={{ flexGrow: 1 }}>{date.description}</p>
                
                <div className="duration" style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #eee' }}>
                    Duration: {date.duration}
                </div>
            </div>
            
            <div className="date-card-footer">
                <div className="interaction-buttons">
                    <button
                        className={`icon-button ${likeMutation.isSuccess ? 'liked' : ''}`}
                        onClick={handleLike}
                        disabled={likeMutation.isLoading}
                        aria-label={`Like this date idea (${date.likes_count || 0} likes)`}
                    >
                        <Heart 
                            className={`w-5 h-5 transition-all duration-200 ${
                                likeMutation.isLoading ? 'opacity-50' : ''
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
                        disabled={saveMutation.isLoading}
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