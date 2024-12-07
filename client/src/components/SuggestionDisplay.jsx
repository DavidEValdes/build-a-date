import React, { useState } from "react";
import "../App.css";
import Spinner from "./Spinner";

const SuggestionDisplay = ({ date }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Helper function to format the cost category
  const formatCostCategory = (category) => {
    switch (category.toLowerCase()) {
      case "free":
        return "Free";
      case "economy":
        return "$";
      case "standard":
        return "$$";
      case "premium":
        return "$$$";
      case "luxury":
        return "$$$$";
      default:
        return category;
    }
  };

  return (
    <div className="suggestion-display">
      <div className="suggestion-display-image-container">
        {isImageLoading && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1
          }}>
            <Spinner size={40} />
          </div>
        )}
        <img
          src={date.image_url}
          alt={date.title}
          className="suggestion-display-image"
          style={{ opacity: isImageLoading ? 0 : 1, transition: "opacity 0.3s ease" }}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>

      <h2 className="suggestion-display-title">{date.title}</h2>

      <div className="suggestion-display-content">
        <p className="suggestion-display-description">{date.description}</p>

        <div className="suggestion-display-grid">
          <div>
            <h3 className="suggestion-display-grid-title">Location</h3>
            <p className="suggestion-display-grid-value">{date.location}</p>
          </div>
          <div>
            <h3 className="suggestion-display-grid-title">Duration</h3>
            <p className="suggestion-display-grid-value">{date.duration}</p>
          </div>
          <div>
            <h3 className="suggestion-display-grid-title">Cost</h3>
            <p className="suggestion-display-grid-value">
              {formatCostCategory(date.cost_category)}
            </p>
          </div>
          <div>
            <h3 className="suggestion-display-grid-title">Activity Level</h3>
            <p className="suggestion-display-grid-value">
              {date.activity_level}
            </p>
          </div>
        </div>

        <div className="suggestion-display-tags">
          <span className="tag mood" style={{ textTransform: "capitalize" }}>
            {date.mood}
          </span>
          <span
            className="tag time-of-day"
            style={{ textTransform: "capitalize" }}
          >
            {date.time_of_day}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuggestionDisplay;
