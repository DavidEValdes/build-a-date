import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QuestionPipeline from "../components/QuestionPipeline";
import DateCard from "../components/DateCard";
import SuggestionDisplay from "../components/SuggestionDisplay";
import Spinner from "../components/Spinner";
import api, { getDateIdeas, getAllDateIdeas, createDateIdea, fetchImageForDate } from "../api";
import {
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Footer from "../components/Footer";

// Updated Sort Options to include Duration Sorting
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
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const fetchImageFromPexels = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large2x;
    }
    
    // If no results with original search, try simplified search
    const simplifiedSearch = searchTerm
      .toLowerCase()
      .replace(/a |the |and |or |at |in |on |to /g, ' ')
      .trim();
      
    if (simplifiedSearch !== searchTerm) {
      const simplifiedResponse = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          simplifiedSearch
        )}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      
      if (simplifiedResponse.ok) {
        const simplifiedData = await simplifiedResponse.json();
        if (simplifiedData.photos && simplifiedData.photos.length > 0) {
          return simplifiedData.photos[0].src.large2x;
        }
      }
    }

    return "/api/placeholder/400/300";
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
    return "/api/placeholder/400/300";
  }
};

// Updated Weight Structure without Budget
const weights = {
  timeOfDay: 1,
  mood: 2, 
  indoorOutdoor: 1,
  activityLevel: 2, 
  distanceWilling: 1,
  importance: 1,
  interests: 2, 
  groupSize: 2,
  season: 1,
};

const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const Home = () => {
  const [stage, setStage] = useState("welcome");
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: feedDates = [], isLoading: isFeedLoading } = useQuery({
    queryKey: ["feedDateIdeas"],
    queryFn: getDateIdeas,
    refetchOnMount: "always",
    staleTime: 0,
  });

  const { data: allDates = [], isLoading: isAllDatesLoading } = useQuery({
    queryKey: ["allDateIdeas"],
    queryFn: getAllDateIdeas,
    refetchOnMount: "always",
    staleTime: 0,
  });

  const createDateMutation = useMutation({
    mutationFn: createDateIdea,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedDateIdeas"]);
    },
  });

  const handleQuestionnaireComplete = async (answers) => {
    // Ensure budget is selected
    if (!answers.budget) {
      console.error("Budget not selected.");
      return;
    }
    
    // Filter date ideas that match the selected budget
    const filteredDates = allDates.filter(date => date.cost_category === answers.budget);
    
    if (filteredDates.length === 0) {
      console.error("No date ideas found for the selected budget.");
      return;
    }
    
    // Function to calculate Jaccard Similarity for multiple-choice questions
    const calculateSimilarity = (arr1 = [], arr2 = []) => {
      if (arr1.length === 0 && arr2.length === 0) return 1;
      if (arr1.length === 0 || arr2.length === 0) return 0;
      const set1 = new Set(arr1);
      const set2 = new Set(arr2);
      const intersection = [...set1].filter(x => set2.has(x)).length;
      const union = new Set([...set1, ...set2]).size;
      return intersection / union;
    };
  
    const scoredDates = filteredDates.map((date) => {
      let score = 0;
      let totalWeight = 0;
      const contributions = {}; // To track individual contributions
  
      // Time of Day
      if (answers.timeOfDay) {
        totalWeight += weights.timeOfDay;
        if (date.time_of_day === answers.timeOfDay) {
          score += weights.timeOfDay;
          contributions.timeOfDay = weights.timeOfDay;
        } else {
          contributions.timeOfDay = 0;
        }
      }
  
      // Mood
      if (answers.mood) {
        totalWeight += weights.mood;
        if (date.mood === answers.mood) {
          score += weights.mood;
          contributions.mood = weights.mood;
        } else {
          contributions.mood = 0;
        }
      }
  
      // Indoor or Outdoor
      if (answers.indoorOutdoor && answers.indoorOutdoor !== "noPreference") {
        totalWeight += weights.indoorOutdoor;
        if (date.location === answers.indoorOutdoor) {
          score += weights.indoorOutdoor;
          contributions.indoorOutdoor = weights.indoorOutdoor;
        } else {
          contributions.indoorOutdoor = 0;
        }
      }
  
      // Activity Level
      if (answers.activityLevel) {
        totalWeight += weights.activityLevel;
        if (date.activity_level === answers.activityLevel) {
          score += weights.activityLevel;
          contributions.activityLevel = weights.activityLevel;
        } else {
          contributions.activityLevel = 0;
        }
      }
  
      // Distance Willing to Travel
      if (answers.distanceWilling) {
        totalWeight += weights.distanceWilling;
        if (date.distance === answers.distanceWilling) {
          score += weights.distanceWilling;
          contributions.distanceWilling = weights.distanceWilling;
        } else {
          contributions.distanceWilling = 0;
        }
      }
  
      // Importance
      if (answers.importance) {
        totalWeight += weights.importance;
        if (date.importance === answers.importance) {
          score += weights.importance;
          contributions.importance = weights.importance;
        } else {
          contributions.importance = 0;
        }
      }
  
      // Interests (Multiple Choice)
      if (answers.interests && answers.interests.length > 0) {
        totalWeight += weights.interests;
        const dateInterests = Array.isArray(date.interests) ? date.interests : [];
        const interestsSimilarity = calculateSimilarity(
          dateInterests,
          answers.interests
        );
        const interestsScore = interestsSimilarity * weights.interests;
        score += interestsScore;
        contributions.interests = interestsScore;
      }
  
      // Group Size
      if (answers.groupSize) {
        totalWeight += weights.groupSize;
        if (date.group_size === answers.groupSize) {
          score += weights.groupSize;
          contributions.groupSize = weights.groupSize;
        } else {
          contributions.groupSize = 0;
        }
      }
  
      // Season
      if (answers.season && answers.season !== "noPreference") {
        totalWeight += weights.season;
        if (date.season === answers.season) {
          score += weights.season;
          contributions.season = weights.season;
        } else {
          contributions.season = 0;
        }
      }
  
      // Calculate normalized score (0 to 1)
      const normalizedScore = score / totalWeight;
  
      return { ...date, score: normalizedScore, contributions };
    });
  
    // Log scored dates with contributions for debugging
    console.log("Scored Dates:", scoredDates.map(date => ({
      id: date.id,
      title: date.title,
      score: date.score.toFixed(4),
      contributions: date.contributions,
    })));
  
    // Sort dates by score in descending order without mutating scoredDates
    const sortedDates = [...scoredDates].sort((a, b) => b.score - a.score);
  
    // Identify the highest score
    const highestScore = sortedDates[0]?.score || 0;
  
    // Filter all dates with the highest score
    const topScoringDates = sortedDates.filter(date => date.score === highestScore);
  
    // Shuffle top scoring dates to introduce randomness
    const shuffledTopScoringDates = shuffleArray(topScoringDates);
  
    // Select the first date from the shuffled top scoring dates
    const bestMatch = shuffledTopScoringDates[0] || null;
  
    if (!bestMatch) {
      console.error("No matching date ideas found.");
      return;
    }
  
    try {
      // Fetch the full date idea from the server to get the image_url
      const response = await api.get(`/dates/${bestMatch.id}`);
      const fetchedDateIdea = response.data;
      setCurrentSuggestion(fetchedDateIdea);
    } catch (error) {
      console.error("Error fetching date idea:", error);
      // Fallback to the bestMatch without image_url if fetching fails
      setCurrentSuggestion(bestMatch);
    }
  
    setStage("suggestion");
  };

  const handleShareToFeed = async () => {
    if (currentSuggestion) {
      // Ensure we include the fetched image URL when sharing to feed
      await createDateMutation.mutateAsync({
        ...currentSuggestion,
        image_url: currentSuggestion.image_url
      });
      setStage("feed");
    }
  };

  const handleStartOver = () => {
    setStage("questions");
    setCurrentSuggestion(null);
  };

  // Enhanced getSortedDates Function with Proper Duration Handling
  const getSortedDates = (dates) => {
    // Helper function to convert duration to total minutes and identify if it's a range
    const parseDuration = (duration) => {
      let minMinutes = 0;
      let maxMinutes = 0;
      let isRange = false;

      // Example formats:
      // "1h 30m" => 1 hour 30 minutes
      // "1 h 30 m" => 1 hour 30 minutes
      // "90m" => 90 minutes
      // "1 30" => 1 hour 30 minutes
      // "1-2 hours" => 1 hour (minimum)
      // "Overnight" => 12 hours
      // "Full day" => 24 hours

      const rangeRegex = /^(\d+)-(\d+)\s*h(?:ours)?$/i;
      const hourMinuteRegex = /^(\d+)\s*h(?:ours)?\s*(\d+)\s*m(?:inutes)?$/i;
      const hourOnlyRegex = /^(\d+)\s*h(?:ours)?$/i;
      const minuteOnlyRegex = /^(\d+)\s*m(?:inutes)?$/i;

      let match = duration.match(rangeRegex);
      if (match) {
        const startHours = parseInt(match[1], 10);
        const endHours = parseInt(match[2], 10);
        if (!isNaN(startHours) && !isNaN(endHours)) {
          minMinutes = startHours * 60;
          maxMinutes = endHours * 60;
          isRange = true;
          return { minMinutes, maxMinutes, isRange };
        }
      }

      match = duration.match(hourMinuteRegex);
      if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        if (!isNaN(hours) && !isNaN(minutes)) {
          minMinutes = hours * 60 + minutes;
          maxMinutes = hours * 60 + minutes;
          return { minMinutes, maxMinutes, isRange };
        }
      }

      match = duration.match(hourOnlyRegex);
      if (match) {
        const hours = parseInt(match[1], 10);
        if (!isNaN(hours)) {
          minMinutes = hours * 60;
          maxMinutes = hours * 60;
          return { minMinutes, maxMinutes, isRange };
        }
      }

      match = duration.match(minuteOnlyRegex);
      if (match) {
        const minutes = parseInt(match[1], 10);
        if (!isNaN(minutes)) {
          minMinutes = minutes;
          maxMinutes = minutes;
          return { minMinutes, maxMinutes, isRange };
        }
      }

      // Handle special durations
      if (/overnight/i.test(duration)) {
        return { minMinutes: 720, maxMinutes: 720, isRange: false }; // 12 hours
      }

      if (/full day/i.test(duration)) {
        return { minMinutes: 1440, maxMinutes: 1440, isRange: false }; // 24 hours
      }

      // Fallback if format is unexpected
      const parts = duration.split(" ");
      if (parts.length === 2) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        if (!isNaN(hours) && !isNaN(minutes)) {
          minMinutes = hours * 60 + minutes;
          maxMinutes = hours * 60 + minutes;
          return { minMinutes, maxMinutes, isRange };
        }
      }

      return { minMinutes: 0, maxMinutes: 0, isRange: false }; // Default to 0 if parsing fails
    };

    return [...dates].sort((a, b) => {
      const durationA = parseDuration(a.duration);
      const durationB = parseDuration(b.duration);

      if (sortBy === "durationShortToLong") {
        if (durationA.minMinutes !== durationB.minMinutes) {
          return durationA.minMinutes - durationB.minMinutes;
        }
        if (durationA.isRange !== durationB.isRange) {
          return durationA.isRange ? 1 : -1; // Exact before range
        }
        return durationA.maxMinutes - durationB.maxMinutes;
      }

      if (sortBy === "durationLongToShort") {
        if (durationA.minMinutes !== durationB.minMinutes) {
          return durationB.minMinutes - durationA.minMinutes;
        }
        if (durationA.isRange !== durationB.isRange) {
          return durationA.isRange ? 1 : -1; // Exact before range
        }
        return durationB.maxMinutes - durationA.maxMinutes;
      }

      // Existing sort cases
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "mostLiked":
          return (b.likes_count || 0) - (a.likes_count || 0);
        case "leastLiked":
          return (a.likes_count || 0) - (b.likes_count || 0);
        case "mostCommented":
          return (b.comments_count || 0) - (a.comments_count || 0);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "priceLowToHigh":
          const costMap = {
            free: 0,
            economy: 1,
            standard: 2,
            premium: 3,
            luxury: 4,
          };
          return costMap[a.cost_category] - costMap[b.cost_category];
        case "priceHighToLow":
          const costMapReverse = {
            free: 0,
            economy: 1,
            standard: 2,
            premium: 3,
            luxury: 4,
          };
          return (
            costMapReverse[b.cost_category] - costMapReverse[a.cost_category]
          );
        case "indoors":
          return b.location === "indoor" ? 1 : -1;
        case "outdoors":
          return b.location === "outdoor" ? 1 : -1;
        default:
          return 0;
      }
    });
  };

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

  return (
    <div
      className="app-container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <main
        className="main-content"
        style={{ flex: "1", paddingBottom: "2rem" }}
      >
        {/* Welcome Screen */}
        {(stage === "welcome" || stage === "feed") && (
          <div
            className="welcome-screen"
            style={{ padding: "2rem", textAlign: "center" }}
          >
            <h2
              style={{
                color: "#000000",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              Find Your Perfect Date
            </h2>
            <p style={{ fontSize: "1.125rem", lineHeight: "1.6" }}>
              Let our <strong>AI-tailored matchmaker</strong> find your perfect
              date.
            </p>
            <p
              style={{
                fontSize: "1.125rem",
                marginTop: "0.5rem",
                lineHeight: "1.6",
              }}
            >
              Choose from over <strong>250+ unique date ideas</strong>, each
              crafted to create an unforgettable experience.
            </p>
            <button
              className="primary-button"
              onClick={() => setStage("questions")}
              disabled={isAllDatesLoading}
              style={{
                marginTop: "2rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#4338ca")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#4f46e5")
              }
            >
              Start Building
            </button>
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                margin: "2rem auto 0",
                borderRadius: "12px",
                position: "relative",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 4px rgba(0, 0, 0, 0.05)";
              }}
            >
              <Link
                to="/plan-a-date"
                className="plan-date-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  color: "#4f46e5",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.01em",
                }}
              >
                <span>Already have a date idea? Plan it here</span>
                <ArrowRight
                  size={18}
                  style={{
                    marginLeft: "4px",
                    transition: "transform 0.2s ease",
                  }}
                />
              </Link>
              <div
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, #4f46e5, transparent)",
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        )}

        {/* Questions Stage */}
        {stage === "questions" && (
          <QuestionPipeline onComplete={handleQuestionnaireComplete} />
        )}

        {/* Suggestion Stage */}
        {stage === "suggestion" && currentSuggestion && (
          <div
            className="suggestion-screen"
            style={{ padding: "2rem", textAlign: "center" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ fontSize: "2rem", color: "#000000" }}
            >
              Your Perfect Date Match!
            </h2>
            <SuggestionDisplay date={currentSuggestion} />
            <div
              className="suggestion-actions mt-8 flex justify-center gap-4"
              style={{ marginTop: "2rem" }}
            >
              <button
                className="primary-button"
                onClick={handleShareToFeed}
                disabled={createDateMutation.isLoading}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#4f46e5",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4338ca")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4f46e5")
                }
              >
                Share to Feed
              </button>
              <button
                className="secondary-button"
                onClick={handleStartOver}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#e5e7eb",
                  color: "#374151",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d1d5db")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e5e7eb")
                }
              >
                Try Different Preferences
              </button>
            </div>
          </div>
        )}

        {/* Feed Section */}
        <div className="feed-section" style={{ padding: "0 2rem" }}>
          <div
            className="feed-header-container"
            style={{ marginTop: "1.5rem", marginBottom: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                className="feed-title custom-feed-title"
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                Date Ideas Feed
              </h2>

              {/* Professional Sort Dropdown */}
              <div
                className="sort-container"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
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
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "white",
                    color: "#374151",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    minWidth: "150px",
                    position: "relative",
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
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
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
                            sortBy === option.value ? "#f3f4f6" : "white",
                          fontSize: "0.75rem", // Reduced font size
                        }}
                        role="option"
                        aria-selected={sortBy === option.value}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f3f4f6")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            sortBy === option.value ? "#f3f4f6" : "white")
                        }
                      >
                        {sortBy === option.value && (
                          <span style={{ color: "#4f46e5" }}>&#10003;</span> // Checkmark
                        )}
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                height: "1.5rem",
                marginTop: "1rem",
              }}
            >
              <span
                className="divider-line"
                style={{
                  height: "1px",
                  backgroundColor: "#ccc",
                  flex: 1,
                }}
              />
              <div
                className="divider-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#4f46e5",
                  borderRadius: "50%",
                }}
              />
              <span
                className="divider-line"
                style={{
                  height: "1px",
                  backgroundColor: "#ccc",
                  flex: 1,
                }}
              />
            </div>
          </div>

          {/* Feed Container */}
          <div
            className="feed-container"
            style={{
              height: "1100px",
              overflow: "auto",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              marginBottom: "2rem",
              position: "relative",
            }}
          >
            {isFeedLoading ? (
              <div
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "200px",
                  backgroundColor: "rgba(248, 249, 250, 0.8)",
                }}
              >
                <Spinner size={50} />
              </div>
            ) : feedDates.length > 0 ? (
              <div className="dates-grid">
                {getSortedDates(feedDates).map((date) => (
                  <DateCard key={date.id} date={date} />
                ))}
              </div>
            ) : (
              <div
                className="center mt-4"
                style={{ textAlign: "center", marginTop: "1rem" }}
              >
                <p>No dates found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Inline Styles for Scrollbars and Grid Layout */}
      <style>
        {`
          .feed-container::-webkit-scrollbar {
            width: 8px;
          }

          .feed-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          .feed-container::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 4px;
          }

          .feed-container::-webkit-scrollbar-thumb:hover {
            background: #ccc;
          }

          .plan-date-link {
            color: #4f46e5 !important;
          }

          /* Hide default arrow for select elements */
          select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            outline: none;
          }

          /* Grid Layout for Dates */
          .dates-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* Three cards per row */
            gap: 1.5rem;
            align-items: stretch; /* Ensures all grid items stretch to match the tallest item */
          }

          /* Responsive Grid: Two Columns on Medium Screens */
          @media (max-width: 1024px) {
            .dates-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          /* Responsive Grid: Single Column on Small Screens */
          @media (max-width: 768px) {
            .dates-grid {
              grid-template-columns: 1fr;
            }
          }

          /* Sort Dropdown Styles */
          .sort-container .sort-dropdown {
            max-height: 200px;
          }

          /* Additional styles if needed */
        `}
      </style>
      <Footer />
    </div>
  );
};

export default Home;
