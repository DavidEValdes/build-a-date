// src/components/DateCard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeDateIdea, saveDateIdea, unsaveDateIdea } from '../api';
import { useAuth } from '../context/AuthContext';

// 1. Define a mapping from cost_category to dollar signs
const COST_CATEGORY_MAP = {
    free: 'Free',
    economy: '$',
    standard: '$$',
    premium: '$$$',
    luxury: '$$$$',
    // Add more mappings if there are additional categories
};

const DateCard = ({ date }) => {
    const [isSaved, setIsSaved] = useState(date.is_saved || false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    // Update local state when date prop changes
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
            // Optionally, you can add user-facing error handling here
        }
    });

    const saveMutation = useMutation({
        mutationFn: (id) => (isSaved ? unsaveDateIdea(id) : saveDateIdea(id)),
        onSuccess: () => {
            setIsSaved(!isSaved);
            // Invalidate with consistent query keys
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
            // Optionally, handle other error statuses
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
        // Implement share functionality, e.g., copy link to clipboard
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

    // 2. Function to get dollar signs based on cost_category
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
            
            <div className="date-card-content">
                <div className="date-card-title">
                    <div>
                        <h2>{date.title}</h2>
                        <p className="location">{date.location}</p>
                    </div>
                    <div className="cost-tag">
                        {/* 3. Replace cost_category text with dollar signs */}
                        <span className="tag">{getDollarSigns(date.cost_category)}</span>
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
