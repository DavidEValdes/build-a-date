import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QuestionPipeline from "../components/QuestionPipeline";
import DateCard from "../components/DateCard";
import SuggestionDisplay from "../components/SuggestionDisplay";
import Spinner from "../components/Spinner";
import api, { getDateIdeas, getAllDateIdeas, createDateIdea, fetchImageForDate, saveDateIdea } from "../api";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Footer from "../components/Footer";


const budgetLevels = {
  free: 0,
  economy: 1,
  standard: 2,
  premium: 3,
  luxury: 4,
};


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
  const { isAuthenticated } = useAuth();
  const [stage, setStage] = useState("welcome");
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
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
    // Log user answers
    console.log('\n=== USER PREFERENCES ===');
    console.log(JSON.stringify(answers, null, 2));

    const calculateSimilarity = (arr1, arr2) => {
      // Ensure arrays are defined and convert non-arrays to empty arrays
      const array1 = Array.isArray(arr1) ? arr1 : [];
      const array2 = Array.isArray(arr2) ? arr2 : [];
      
      // If both arrays are empty, return 1 (100% similar)
      if (array1.length === 0 && array2.length === 0) return 1;
      
      // If one array is empty and the other isn't, return 0 (0% similar)
      if (array1.length === 0 || array2.length === 0) return 0;
      
      // Calculate similarity using sets
      const set1 = new Set(array1);
      const set2 = new Set(array2);
      const intersection = [...set1].filter(x => set2.has(x)).length;
      const union = new Set([...set1, ...set2]).size;
      
      return intersection / union;
    };

    console.log('\n=== WEIGHTS USED ===');
    console.log(JSON.stringify(weights, null, 2));

    const scoredDates = allDates.map((date) => {
      let score = 0;
      let totalWeight = 0;
      const contributions = {};
      const matchDetails = {}; // Store detailed matching information

      // Activity Types (Multiple Choice)
      const activityWeight = weights.activityTypes || 1;
      totalWeight += activityWeight;
      const activitySimilarity = calculateSimilarity(
        date.activity_types,
        answers.activityTypes || []
      );
      const activityScore = activitySimilarity * activityWeight;
      score += activityScore;
      contributions.activityTypes = activityScore;
      matchDetails.activityTypes = {
        dateValue: date.activity_types,
        userValue: answers.activityTypes || [],
        similarity: activitySimilarity,
        weight: activityWeight,
        score: activityScore
      };

      // Atmosphere
      const atmosphereWeight = weights.atmosphere || 1;
      totalWeight += atmosphereWeight;
      let atmosphereScore = 0;
      if (answers.atmosphere) {
        if (date.atmosphere === answers.atmosphere) {
          atmosphereScore = atmosphereWeight;
          score += atmosphereWeight;
          contributions.atmosphere = atmosphereWeight;
        } else {
          contributions.atmosphere = 0;
        }
      } else {
        atmosphereScore = atmosphereWeight / 2;
        score += atmosphereWeight / 2;
        contributions.atmosphere = atmosphereWeight / 2;
      }
      matchDetails.atmosphere = {
        dateValue: date.atmosphere,
        userValue: answers.atmosphere,
        exact_match: date.atmosphere === answers.atmosphere,
        weight: atmosphereWeight,
        score: atmosphereScore
      };

      // Budget
      const budgetWeight = weights.budget || 1;
      totalWeight += budgetWeight;
      let budgetScore = 0;
      if (answers.budget) {
        const budgetDifference = Math.abs(
          budgetLevels[date.cost_category] - budgetLevels[answers.budget]
        );
        budgetScore = Math.max(budgetWeight - budgetDifference, 0);
        score += budgetScore;
        contributions.budget = budgetScore;
      } else {
        budgetScore = budgetWeight / 2;
        score += budgetWeight / 2;
        contributions.budget = budgetWeight / 2;
      }
      matchDetails.budget = {
        dateValue: date.cost_category,
        userValue: answers.budget,
        budgetDifference: answers.budget ? Math.abs(budgetLevels[date.cost_category] - budgetLevels[answers.budget]) : null,
        weight: budgetWeight,
        score: budgetScore
      };

      // Indoor/Outdoor
      const locationWeight = weights.indoorOutdoor || 1;
      totalWeight += locationWeight;
      let locationScore = 0;
      if (answers.indoorOutdoor && answers.indoorOutdoor !== "noPreference") {
        if (date.location === answers.indoorOutdoor) {
          locationScore = locationWeight;
          score += locationWeight;
          contributions.indoorOutdoor = locationWeight;
        } else {
          contributions.indoorOutdoor = 0;
        }
      } else {
        locationScore = locationWeight / 2;
        score += locationWeight / 2;
        contributions.indoorOutdoor = locationWeight / 2;
      }
      matchDetails.indoorOutdoor = {
        dateValue: date.location,
        userValue: answers.indoorOutdoor,
        exact_match: answers.indoorOutdoor === "noPreference" || date.location === answers.indoorOutdoor,
        weight: locationWeight,
        score: locationScore
      };

      // Interests (Multiple Choice)
      const interestsWeight = weights.interests || 1;
      totalWeight += interestsWeight;
      const interestsSimilarity = calculateSimilarity(
        date.interests,
        answers.interests || []
      );
      const interestsScore = interestsSimilarity * interestsWeight;
      score += interestsScore;
      contributions.interests = interestsScore;
      matchDetails.interests = {
        dateValue: date.interests,
        userValue: answers.interests || [],
        similarity: interestsSimilarity,
        weight: interestsWeight,
        score: interestsScore
      };

      // Group Size
      const groupSizeWeight = weights.groupSize || 1;
      totalWeight += groupSizeWeight;
      let groupSizeScore = 0;
      if (answers.groupSize) {
        if (date.group_size === answers.groupSize) {
          groupSizeScore = groupSizeWeight;
          score += groupSizeWeight;
          contributions.groupSize = groupSizeWeight;
        } else {
          contributions.groupSize = 0;
        }
      } else {
        groupSizeScore = groupSizeWeight / 2;
        score += groupSizeWeight / 2;
        contributions.groupSize = groupSizeWeight / 2;
      }
      matchDetails.groupSize = {
        dateValue: date.group_size,
        userValue: answers.groupSize,
        exact_match: date.group_size === answers.groupSize,
        weight: groupSizeWeight,
        score: groupSizeScore
      };

      // Time of Day
      const timeOfDayWeight = weights.timeOfDay || 1;
      totalWeight += timeOfDayWeight;
      let timeOfDayScore = 0;
      if (answers.time_of_day) {
        if (date.time_of_day === answers.time_of_day) {
          timeOfDayScore = timeOfDayWeight;
          score += timeOfDayWeight;
          contributions.timeOfDay = timeOfDayWeight;
        } else {
          contributions.timeOfDay = 0;
        }
      } else {
        timeOfDayScore = timeOfDayWeight / 2;
        score += timeOfDayWeight / 2;
        contributions.timeOfDay = timeOfDayWeight / 2;
      }
      matchDetails.timeOfDay = {
        dateValue: date.time_of_day,
        userValue: answers.time_of_day,
        exact_match: date.time_of_day === answers.time_of_day,
        weight: timeOfDayWeight,
        score: timeOfDayScore
      };

      // Calculate normalized score
      const normalizedScore = score / totalWeight;

      return { 
        ...date, 
        score: normalizedScore, 
        contributions,
        matchDetails,
        rawScore: score,
        totalWeight
      };
    });

    // Log detailed matching results
    console.log('\n=== MATCHING RESULTS ===');
    const topResults = scoredDates
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(date => ({
        title: date.title,
        normalizedScore: date.score.toFixed(4),
        rawScore: date.rawScore.toFixed(4),
        totalWeight: date.totalWeight,
        contributions: Object.entries(date.contributions).map(([key, value]) => ({
          category: key,
          contribution: value.toFixed(4)
        })),
        matchDetails: date.matchDetails
      }));

    console.log('Top 5 Matches:');
    console.log(JSON.stringify(topResults, null, 2));

    // Distribution Analysis
    const scores = scoredDates.map(d => d.score);
    const stats = {
      min: Math.min(...scores).toFixed(4),
      max: Math.max(...scores).toFixed(4),
      avg: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(4),
      median: scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)].toFixed(4)
    };
    
    console.log('\n=== SCORE DISTRIBUTION ===');
    console.log(JSON.stringify(stats, null, 2));

    // Continue with the existing logic
    const sortedDates = scoredDates.sort((a, b) => b.score - a.score);
    const highestScore = sortedDates[0]?.score || 0;
    const topScoringDates = sortedDates.filter(
      (date) => date.score === highestScore
    );
    const shuffledTopScoringDates = shuffleArray(topScoringDates);
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
              Choose from over <strong>500+ unique date ideas</strong>, each
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
            <SuggestionDisplay 
              date={currentSuggestion} 
              onDisplay={() => window.scrollTo(0, 0)} 
            />
            <div
              className="suggestion-actions mt-8 flex justify-center gap-4 flex-wrap"
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
                Share to Public Feed
              </button>
              <button
                className="secondary-button"
                onClick={() => {
                  if (!isAuthenticated) {
                    alert("Please login to save dates");
                    return;
                  }
                  if (isSaved) {
                    alert("This date is already saved!");
                    return;
                  }
                  saveDateIdea(currentSuggestion.id)
                    .then(() => {
                      setIsSaved(true);
                      alert("Date saved successfully!");
                    })
                    .catch((error) => {
                      if (error.response?.status === 400) {
                        setIsSaved(true);
                        alert("This date is already saved!");
                      } else {
                        console.error("Error saving date:", error);
                        alert("Failed to save date. Please try again.");
                      }
                    });
                }}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: isSaved ? "#e5e7eb" : "#ffffff",
                  color: isSaved ? "#374151" : "#4f46e5",
                  border: isSaved ? "none" : "2px solid #4f46e5",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  cursor: isSaved ? "default" : "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  if (!isSaved) {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSaved) {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }
                }}
                disabled={isSaved}
              >
                {isSaved ? "Already Saved" : "Save Date"}
              </button>
              <button
                onClick={() => {
                  setStage("welcome");
                  setIsSaved(false);
                }}
                className="secondary-button"
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
          <div className="feed-header-container" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
            <div className="feed-header">
              <h2
                className="feed-title"
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

          /* Feed Header Responsive Layout */
          .feed-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
          }

          .feed-header-container {
            width: 100%;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
          }

          @media (max-width: 388px) {
            .feed-header {
              flex-direction: column;
              align-items: center;
              gap: 1rem;
              text-align: center;
            }

            .feed-title {
              margin-bottom: 0.5rem;
              width: 100%;
              text-align: center;
            }

            .sort-container {
              width: 100%;
              display: flex;
              justify-content: center;
            }

            .sort-container button {
              width: 100%;
              max-width: 250px;
              justify-content: space-between;
            }
          }
        `}
      </style>
      <Footer />
    </div>
  );
};

export default Home;
