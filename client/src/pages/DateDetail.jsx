// src/pages/DateDetail.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Bookmark, Share2, ArrowLeft } from "lucide-react";
import {
  getDateIdea,
  likeDateIdea,
  unlikeDateIdea,
  addComment,
  getComments,
  saveDateIdea,
  unsaveDateIdea,
  deleteComment,
  updateComment,
} from "../api";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const DateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  // State for editing comments
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const COST_CATEGORY_MAP = {
    free: "Free",
    economy: "$",
    standard: "$$",
    premium: "$$$",
    luxury: "$$$$",
  };

  const getDollarSigns = (category) => {
    return COST_CATEGORY_MAP[category.toLowerCase()] || "$";
  };

  // Fetch date idea details
  const { data: date, isLoading } = useQuery({
    queryKey: ["dateIdea", id],
    queryFn: () => getDateIdea(id),
    refetchOnMount: "always",
    staleTime: 0,
  });

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    refetchOnMount: "always",
    staleTime: 0,
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
      alert("Please login to like dates");
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
        console.error("Error unliking date idea:", error);
        setLikesCount((prev) => Number(prev) + 1);
        setIsLiked(true);
      });
    } else {
      // User is liking
      likeDateIdea(id).catch((error) => {
        console.error("Error liking date idea:", error);
        setLikesCount((prev) => Number(prev) - 1);
        setIsLiked(false);
      });
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to save dates");
      return;
    }

    const wasSaved = isSaved;
    setIsSaved(!wasSaved);

    if (wasSaved) {
      unsaveDateIdea(id).catch((error) => {
        console.error("Error unsaving date idea:", error);
        setIsSaved(true);
      });
    } else {
      saveDateIdea(id).catch((error) => {
        console.error("Error saving date idea:", error);
        setIsSaved(false);
      });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to add comments");
      return;
    }

    if (comment.trim()) {
      addComment(id, comment)
        .then(() => {
          setComment("");
          queryClient.invalidateQueries(["comments", id]);
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  };

  const handleDeleteComment = (commentId) => {
    if (!isAuthenticated) {
      alert("Please login to delete comments");
      return;
    }

    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(commentId)
        .then(() => {
          queryClient.invalidateQueries(["comments", id]);
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
          alert("Failed to delete comment.");
        });
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleUpdateComment = (e, commentId) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to edit comments");
      return;
    }

    if (editedContent.trim()) {
      updateComment(commentId, editedContent)
        .then(() => {
          setEditingCommentId(null);
          setEditedContent("");
          queryClient.invalidateQueries(["comments", id]);
        })
        .catch((error) => {
          console.error("Error updating comment:", error);
          alert("Failed to update comment.");
        });
    }
  };

  const handleImageError = () => {
    const img = document.getElementById("detail-image");
    if (img) {
      img.src = "https://via.placeholder.com/400x300?text=No+Image+Available";
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
        alert("Date link copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy the link.");
      });
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <Spinner size={50} />
      </div>
    );
  }

  if (!date) {
    return <div style={styles.errorMessage}>Date idea not found</div>;
  }

  // Format the date added
  const dateObj = new Date(date.created_at);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;

  return (
    <div style={styles.container}>
      <main style={styles.mainContent}>
        <div style={styles.dateDetailContainer}>
          {/* Header Section */}
          <div style={styles.headerSection}>
            <div style={styles.imageContainer}>
              <button
                onClick={handleBack}
                style={styles.backButton}
                aria-label="Go Back"
              >
                <ArrowLeft size={20} />
              </button>
              <img
                src={date.image_url}
                alt={date.title}
                style={styles.detailImage}
                id="detail-image"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
            <div style={styles.detailInfo}>
              <h2 style={styles.title}>{date.title}</h2>
              <div style={styles.tagsContainer}>
                {/* Cost Tag */}
                <span
                  style={{
                    ...styles.tag,
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "black",
                  }}
                >
                  {getDollarSigns(date.cost_category)}
                </span>
                {/* Duration Tag */}
                <span
                  style={{
                    ...styles.tag,
                    backgroundColor: "rgba(255, 255, 0, 0.2)",
                    color: "black",
                  }}
                >
                  {date.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div style={styles.contentSection}>
            {/* About This Date */}
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>About this Date</h3>
              <p style={styles.sectionContent}>{date.description}</p>
            </section>

            {/* Details */}
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>Details</h3>
              <div style={styles.detailsGrid}>
                {[
                  { label: "Location", value: date.location },
                  { label: "Time of Day", value: date.time_of_day },
                  { label: "Activity Level", value: date.activity_level },
                  { label: "Distance", value: date.distance },
                ].map((item) => (
                  <div key={item.label} style={styles.detailItem}>
                    <span style={styles.detailLabel}>{item.label}</span>
                    <span style={styles.detailValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Interaction Buttons */}
            <section style={styles.section}>
              <div className="detail-actions">
                <div className="detail-interaction-row">
                  <button
                    className={`icon-button ${isLiked ? "liked" : ""}`}
                    onClick={handleLike}
                    aria-label="Like Date Idea"
                  >
                    <Heart
                      size={20}
                      style={{
                        marginRight: "6px",
                        ...(isLiked
                          ? { color: "#e0245e" }
                          : { color: "#555555" }),
                      }}
                    />
                    <span>
                      {likesCount} {likesCount === 1 ? "Like" : "Likes"}
                    </span>
                  </button>
                  <button
                    className={`icon-button ${isSaved ? "saved" : ""}`}
                    onClick={handleSave}
                    aria-label="Save Date Idea"
                  >
                    <Bookmark
                      size={20}
                      style={{
                        marginRight: "6px",
                        ...(isSaved
                          ? { color: "#1da1f2" }
                          : { color: "#555555" }),
                      }}
                    />
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </button>
                </div>
                <div className="detail-share-row">
                  <button
                    className="icon-button"
                    onClick={handleShare}
                    aria-label="Share Date Idea"
                  >
                    <Share2
                      size={20}
                      style={{ marginRight: "6px", color: "#555555" }}
                    />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              <div style={styles.postedDate}>Posted: {formattedDate}</div>
            </section>

            {/* Comments Section */}
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>Comments</h3>
              <form onSubmit={handleSubmitComment} style={styles.commentForm}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  style={styles.commentInput}
                  aria-label="Add a comment"
                />
                <button type="submit" style={styles.postButton}>
                  Post
                </button>
              </form>
              <div style={styles.commentsList}>
                {comments.map((comment) => (
                  <div key={comment.id} style={styles.commentItem}>
                    {editingCommentId === comment.id ? (
                      // Editing mode
                      <form
                        onSubmit={(e) => handleUpdateComment(e, comment.id)}
                        style={styles.editForm}
                      >
                        <input
                          type="text"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          style={styles.editInput}
                          aria-label="Edit comment"
                        />
                        <div style={styles.editButtons}>
                          <button type="submit" style={styles.saveButton}>
                            Save
                          </button>
                          <button
                            type="button"
                            style={styles.cancelButton}
                            onClick={() => setEditingCommentId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Display mode
                      <>
                        <div style={styles.commentHeader}>
                          <strong style={styles.commentUsername}>
                            {comment.username}
                          </strong>
                          {/* Edit and Delete buttons */}
                          {isAuthenticated &&
                            user &&
                            comment.user_id === user.id && (
                              <div style={styles.commentActions}>
                                <button
                                  onClick={() => handleEditComment(comment)}
                                  style={styles.actionButton}
                                  aria-label="Edit Comment"
                                >
                                  ✎
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                  style={styles.actionButton}
                                  aria-label="Delete Comment"
                                >
                                  &times;
                                </button>
                              </div>
                            )}
                        </div>
                        <p style={styles.commentContent}>{comment.content}</p>
                        <div style={styles.commentDateContainer}>
                          <span style={styles.commentDate}>
                            @{" "}
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </>
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

// Inline Styles Object
const styles = {
  /* Reset and Base Styles */
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "20px",
    color: "#333333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
  },

  mainContent: {
    width: "100%",
    maxWidth: "800px", // Reduced maxWidth for a more compact layout
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dateDetailContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "24px", // Reduced gap for tighter spacing
  },
  /* Header Section */
  headerSection: {
    display: "flex",
    flexDirection: "row",
    gap: "16px", // Reduced gap for a more compact header
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    width: "300px", // Reduced image width
    height: "225px", // Adjusted height to maintain aspect ratio
    flexShrink: 0,
    borderRadius: "15px", // Slightly reduced border radius
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Softer shadow
  },
  backButton: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "rgba(255, 255, 255, 0.9)", // Slightly more opaque
    border: "none",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s ease, transform 0.2s ease",
  },
  detailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  detailInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px", // Reduced gap for tighter spacing
  },
  title: {
    fontSize: "1.75rem", // Slightly reduced font size
    fontWeight: "700",
    color: "#1e90ff",
    margin: 0,
  },
  tagsContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  tag: {
    padding: "4px 10px", // Reduced padding for smaller tags
    borderRadius: "10px",
    fontSize: "0.8rem", // Slightly reduced font size
    fontWeight: "500",
  },
  /* Content Sections */
  contentSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px", // Reduced gap for tighter content sections
    width: "100%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "1.25rem", // Reduced font size
    fontWeight: "700",
    color: "#333333",
    margin: 0,
  },
  sectionContent: {
    fontSize: "0.95rem", // Slightly reduced font size
    color: "#555555",
    lineHeight: "1.5",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", // Adjusted minWidth for grid items
    gap: "16px",
  },
  detailItem: {
    backgroundColor: "#e2e8f0",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
  },
  detailLabel: {
    fontSize: "0.8rem",
    color: "#888888",
    marginBottom: "3px",
  },
  detailValue: {
    fontSize: "0.95rem",
    color: "#333333",
    fontWeight: "600",
  },
  /* Interaction Section */
  interactionButtons: {
    display: "flex",
    gap: "12px", // Reduced gap for tighter button spacing
    marginBottom: "6px",
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#e2e8f0",
    color: "#555555",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.375rem",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    border: "none",
  },
  likedButton: {
    color: "#e0245e",
    backgroundColor: "#fee2e2",
  },
  savedButton: {
    color: "#1da1f2",
    backgroundColor: "#dbeafe",
  },
  postedDate: {
    fontSize: "0.8rem", // Reduced font size
    color: "#888888",
    marginLeft: "6px",
  },
  /* Comments Section */
  commentsSection: {
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  commentForm: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  commentInput: {
    flex: 1,
    padding: "10px 14px", // Reduced padding
    borderRadius: "8px",
    border: "1px solid #dddddd",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    backgroundColor: "#f9fafb",
  },
  postButton: {
    backgroundColor: "#1e90ff",
    color: "#ffffff",
    padding: "10px 20px", // Reduced padding
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  commentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  commentItem: {
    backgroundColor: "#e2e8f0",
    padding: "14px",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "2px",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  commentUsername: {
    fontWeight: "700",
    color: "#333333",
    fontSize: "0.9rem",
  },
  commentDateContainer: {
    marginTop: "8px",
  },
  commentDate: {
    fontSize: "0.75rem",
    color: "black",
    backgroundColor: "rgba(169, 169, 169, 0.3)",
    padding: "2px 6px",
    borderRadius: "4px",
    display: "inline-block",
  },
  commentContent: {
    fontSize: "0.95rem",
    color: "#555555",
    margin: 0,
  },
  commentActions: {
    display: "flex",
    gap: "6px",
  },
  actionButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#1e90ff",
    fontSize: "1rem",
    padding: 0,
    lineHeight: 1,
    transition: "color 0.2s ease",
  },
  /* Editing Mode */
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  editInput: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #dddddd",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    backgroundColor: "#f9fafb",
  },
  editButtons: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },
  saveButton: {
    backgroundColor: "#1e90ff",
    color: "#ffffff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  cancelButton: {
    backgroundColor: "#cccccc",
    color: "#ffffff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  /* Loading and Error Styles */
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
  },
  errorMessage: {
    color: "#ff0000",
    fontSize: "1.1rem",
    textAlign: "center",
    marginTop: "30px",
  },
};
