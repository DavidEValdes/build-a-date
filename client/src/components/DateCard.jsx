// src/components/DateCard.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    const [likesCount, setLikesCount] = useState(date.likes_count || 0);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setIsSaved(date.is_saved || false);
        setIsLiked(date.is_liked || false);
        setLikesCount(date.likes_count || 0);
    }, [date]); // Changed dependency array to depend only on 'date'

    const likeMutation = useMutation({
        mutationFn: () => (isLiked ? unlikeDateIdea(date.id) : likeDateIdea(date.id)),
        onSuccess: () => {
            setIsLiked(!isLiked);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
            queryClient.invalidateQueries(['dateIdeas']);
            queryClient.invalidateQueries(['dateIdea', date.id]);
        },
        onError: (error) => {
            console.error('Error updating like:', error);
            if (error.response?.status === 403) {
                alert('Please login to like dates');
            }
        },
    });

    const saveMutation = useMutation({
        mutationFn: () => (isSaved ? unsaveDateIdea(date.id) : saveDateIdea(date.id)),
        onSuccess: () => {
            setIsSaved(!isSaved);
            queryClient.invalidateQueries(['savedDates']);
            queryClient.invalidateQueries(['feedDateIdeas']);
            queryClient.invalidateQueries(['dateIdeas']);
            queryClient.invalidateQueries(['dateIdea', date.id]);
        },
        onError: (error) => {
            console.error('Error saving date:', error);
            if (error.response?.status === 403) {
                alert('Please login to save dates');
            }
        },
    });

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

    const handleSave = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            alert('Please login to save dates');
            return;
        }
        saveMutation.mutate();
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
            
            <div className="date-card-content" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                padding: '1.5rem' 
            }}>
                <div className="date-card-title">
                    <div>
                        <h2>{date.title}</h2>
                        <p className="location">{date.location}</p>
                    </div>
                    <div className="cost-tag">
                        <span className="tag">{getDollarSigns(date.cost_category)}</span>
                    </div>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p className="description" style={{ 
                        marginTop: '0.75rem', 
                        paddingTop: '0.75rem', 
                        paddingBottom: '0.75rem',
                        borderTop: '1px solid #eee',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        {date.description}
                    </p>
                    
                    <div className="duration" style={{ 
                        marginTop: 'auto', 
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        borderTop: '1px solid #eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                        Duration: {date.duration}
                    </div>
                </div>
            </div>
            
            <div className="date-card-footer">
                <div className="interaction-buttons">
                    <button
                        className={`icon-button ${isLiked ? 'liked' : ''}`}
                        onClick={handleLike}
                        disabled={likeMutation.isLoading}
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
