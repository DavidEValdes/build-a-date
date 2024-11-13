import React from "react";
import "../App.css"; // Ensure this path is correct based on your project structure

const SuggestionDisplay = ({ date }) => {
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
        return category; // return the original text if no match
    }
  };

  return (
    <div className="suggestion-display">
      <div className="suggestion-display-image-container">
        <img
          src={date.image_url}
          alt={date.title}
          className="suggestion-display-image"
        />
      </div>

      {/* Title moved outside the image container */}
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
