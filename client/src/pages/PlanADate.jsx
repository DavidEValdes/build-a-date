import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import PlanADateCard from "../components/PlanADateCard";
import { planADateCards } from "../services/plan-a-date";
import MovieCard from "../components/MovieCard";

const PlanADate = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        padding: "40px 20px",
        color: "#333333",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
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
            color: "#1e90ff",
          }}
        >
          Plan A Date
        </h1>
      </header>

      {/* Grid Cards Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
          padding: "0 20px",
          maxWidth: "1000px",
          width: "100%",
          marginBottom: "60px",
        }}
      >
        {planADateCards.slice(0, 2).map((card, index) => (
          <PlanADateCard key={index} index={index} {...card} />
        ))}
        <MovieCard />
        {planADateCards.slice(2).map((card, index) => (
          <PlanADateCard key={index + 2} index={index + 2} {...card} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PlanADate;
