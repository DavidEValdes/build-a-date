import React, { useEffect, useState } from "react";
import { fetchMovies } from "../services/plan-a-date/movies";

export default function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [showMovieSuggestions, setShowMovieSuggestions] = useState(false);
  const [searchParams, setSearchParams] = useState({
    title: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    if (showMovieSuggestions) {
      const fetchInitialMovies = async () => {
        const initialMovies = await fetchMovies(searchParams);
        setMovies(initialMovies);
      };
      fetchInitialMovies();
    }
  }, [showMovieSuggestions, searchParams]);

  const handleSearch = async () => {
    const movies = await fetchMovies(searchParams);
    setMovies(movies);
  };

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
        gridColumn: "span 2",
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
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          color: "#333333",
          marginBottom: "16px",
        }}
      >
        Movie Suggestions
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#555555",
          marginBottom: "24px",
          lineHeight: "1.6",
        }}
      >
        Get movie recommendations for your date night.
      </p>
      <button
        onClick={() => setShowMovieSuggestions(!showMovieSuggestions)}
        style={{
          marginTop: "24px",
          alignSelf: "flex-start",
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
        Browse Movies
      </button>
      {showMovieSuggestions && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              name="title"
              value={searchParams.title}
              onChange={(e) =>
                setSearchParams({ ...searchParams, title: e.target.value })
              }
              placeholder="Search by title"
              style={{
                padding: "10px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            />
            <input
              type="text"
              name="year"
              value={searchParams.year}
              onChange={(e) =>
                setSearchParams({ ...searchParams, year: e.target.value })
              }
              placeholder="Search by year"
              style={{
                padding: "10px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "#1e90ff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Search
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {movies.map((movie, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", height: "auto" }}
                />
                <div style={{ padding: "10px" }}>
                  <h3 style={{ fontSize: "1.2rem", margin: "0 0 10px 0" }}>
                    {movie.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                    {movie.overview?.slice(0, 150)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
