// src/pages/SavedDates.jsx

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DateCard from "../components/DateCard";
import Spinner from "../components/Spinner"; // Import Spinner
import {
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSavedDates } from "../api";
import Footer from "../components/Footer";

// Sort Options Array (Same as Home Page)
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "priceLowToHigh", label: "Price: Low to High" },
  { value: "priceHighToLow", label: "Price: High to Low" },
  { value: "durationShortToLong", label: "Duration: Short to Long" },
  { value: "durationLongToShort", label: "Duration: Long to Short" },
  { value: "indoors", label: "Indoor Activities" },
  { value: "outdoors", label: "Outdoor Activities" },
  { value: "mostLiked", label: "Most Liked" },
  { value: "leastLiked", label: "Least Liked" },
  { value: "mostCommented", label: "Most Commented" },
  { value: "alphabetical", label: "A-Z" },
];

const SavedDates = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Sorting States
  const [sortBy, setSortBy] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch Saved Dates
  const {
    data: savedDates = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["savedDates"],
    queryFn: getSavedDates,
    enabled: isAuthenticated,
  });

  // Redirect to Home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Back Navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Sorting Logic
  const getSortedDates = (dates) => {
    // Helper function to convert cost categories to numeric values for sorting
    const costMap = {
      free: 0,
      economy: 1,
      standard: 2,
      premium: 3,
      luxury: 4,
    };

    // Helper function to parse duration strings into total minutes
    const parseDuration = (duration) => {
      let totalMinutes = 0;
      const regex = /(\d+)\s*h(?:ours?)?|\d+\s*m(?:inutes?)?/g;
      let match;
      while ((match = regex.exec(duration)) !== null) {
        if (match[1]) {
          totalMinutes += parseInt(match[1], 10) * 60;
        } else {
          const minutes = match[0].match(/(\d+)/);
          if (minutes) {
            totalMinutes += parseInt(minutes[1], 10);
          }
        }
      }
      return totalMinutes;
    };

    // Sorting Logic
    return [...dates].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "priceLowToHigh":
          return (
            (costMap[a.cost_category] || 0) - (costMap[b.cost_category] || 0)
          );
        case "priceHighToLow":
          return (
            (costMap[b.cost_category] || 0) - (costMap[a.cost_category] || 0)
          );
        case "durationShortToLong":
          return parseDuration(a.duration) - parseDuration(b.duration);
        case "durationLongToShort":
          return parseDuration(b.duration) - parseDuration(a.duration);
        case "indoors":
          return a.location === "indoor" ? -1 : 1;
        case "outdoors":
          return a.location === "outdoor" ? -1 : 1;
        case "mostLiked":
          return (b.likes_count || 0) - (a.likes_count || 0);
        case "leastLiked":
          return (a.likes_count || 0) - (b.likes_count || 0);
        case "mostCommented":
          return (b.comments_count || 0) - (a.comments_count || 0);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  // Get Sorted Dates
  const sortedSavedDates = getSortedDates(savedDates);

  return (
    <div
      className="app-container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <main className="main-content" style={{ flex: "1", padding: "2rem" }}>
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="back-button"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            backgroundColor: "#f3f4f6",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            marginBottom: "1.5rem",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#e5e7eb")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#f3f4f6")
          }
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>

        {/* Header with Divider */}
        <div className="saved-dates-header" style={{ marginBottom: "1rem" }}>
          <div
            className="header-with-divider"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <h1
              className="saved-dates-title"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              Saved Dates
            </h1>
          </div>
        </div>

        {/* Sorting Menu (Placed Above the Divider) */}
        <div
          className="sort-container"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
          ref={dropdownRef}
        >
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="sort-toggle-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              color: "#374151",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              minWidth: "150px",
            }}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <SlidersHorizontal size={16} />
            <span>
              {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                "Sort By"}
            </span>
            {isDropdownOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {isDropdownOpen && (
            <ul
              className="sort-dropdown"
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                width: "100%",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
                maxHeight: "200px",
                overflowY: "auto",
                marginTop: "0.5rem",
                listStyle: "none",
                padding: "0.5rem 0",
              }}
              role="listbox"
            >
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className="sort-option"
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "background-color 0.2s ease",
                    backgroundColor:
                      sortBy === option.value ? "#f3f4f6" : "#ffffff",
                    fontSize: "0.875rem",
                  }}
                  role="option"
                  aria-selected={sortBy === option.value}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      sortBy === option.value ? "#f3f4f6" : "#ffffff")
                  }
                >
                  {sortBy === option.value && (
                    <span style={{ color: "#4f46e5" }}>&#10003;</span>
                  )}
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Divider */}
        <div
          className="styled-divider"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            height: "2px",
            backgroundColor: "#ccc",
            marginBottom: "1.5rem",
          }}
        >
          <span
            className="divider-line"
            style={{ flex: 1, height: "2px", backgroundColor: "#ccc" }}
          ></span>
          <div
            className="divider-dot"
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#4f46e5",
              borderRadius: "50%",
            }}
          ></div>
          <span
            className="divider-line"
            style={{ flex: 1, height: "2px", backgroundColor: "#ccc" }}
          ></span>
        </div>

        {/* Content */}
        {isLoading ? (
          <div
            className="loading-spinner-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Spinner size={50} />
          </div>
        ) : isError ? (
          <div style={{ textAlign: "center", color: "red", marginTop: "2rem" }}>
            <p>Failed to load saved dates. Please try again later.</p>
          </div>
        ) : savedDates.length === 0 ? (
          <p
            className="text-gray-500 text-center py-4"
            style={{ textAlign: "center", color: "#6b7280", fontSize: "1rem" }}
          >
            You haven't saved any dates yet.
          </p>
        ) : (
          <div
            className="dates-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {sortedSavedDates.map((date) => (
              <DateCard key={date.id} date={date} />
            ))}
          </div>
        )}
      </main>

      {/* Inline Styles for Scrollbars and Responsive Grid */}
      <style>
        {`
          /* Responsive Grid */
          @media (max-width: 1024px) {
            .dates-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 768px) {
            .dates-grid {
              grid-template-columns: 1fr;
            }
          }

          /* Scrollbar Styles for sort-dropdown */
          .sort-dropdown::-webkit-scrollbar {
            width: 6px;
          }

          .sort-dropdown::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }

          .sort-dropdown::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 3px;
          }

          .sort-dropdown::-webkit-scrollbar-thumb:hover {
            background: #ccc;
          }

        `}
      </style>

      <Footer />
    </div>
  );
};

export default SavedDates;
