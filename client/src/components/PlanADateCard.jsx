import React from "react";

const PlanADateCard = (props) => {
  const { title, description, buttonText, fetchData, data } = props;

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9", // Light gray background for subtle contrast
        padding: "32px",
        borderRadius: "20px", // Increased border radius for a softer look
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Softer shadow
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)"; // Subtle lift effect
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#333333",
            marginBottom: "16px",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#555555",
            marginBottom: "24px",
            lineHeight: "1.6",
          }}
        >
          {description}
        </p>
        {/* Mini Dashboard Sections */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "16px",
          }}
        >
          {Object.entries(data || {}).map(([key, value], idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#ffffff",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#888888",
                  marginBottom: "4px",
                }}
              >
                {key}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#333333",
                  fontWeight: "600",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={fetchData}
        style={{
          marginTop: "24px",
          alignSelf: "flex-end",
          backgroundColor: "#1e90ff", // Softer blue accent
          color: "#ffffff",
          padding: "12px 24px",
          border: "none",
          borderRadius: "12px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#1c86ee"; // Slightly darker on hover
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#1e90ff";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PlanADateCard;
