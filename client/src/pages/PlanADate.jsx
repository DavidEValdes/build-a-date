import React from "react";
import Footer from "../components/Footer";
import PlanADateCard from "../components/PlanADateCard";
import { planADateCards } from "../services/plan-a-date";

const PlanADate = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff", // Changed to white for a cleaner look
        padding: "40px 20px", // Increased padding for better spacing
        color: "#333333",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`, // Apple-like font
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1e90ff", // Softer blue accent
          }}
        >
          Plan A Date
        </h1>
      </header>

      {/* Vertical Cards Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px", // Increased gap for better separation
          padding: "0 20px",
          maxWidth: "1000px", // Adjusted maxWidth for better fit on large screens
          width: "100%",
          marginBottom: "60px",
        }}
      >
        {planADateCards.map((card, index) => (
          <PlanADateCard key={index} {...card} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PlanADate;
