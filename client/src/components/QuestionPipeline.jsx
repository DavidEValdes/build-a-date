import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

export const questions = [
  {
    id: "atmosphere",
    question: "What kind of vibe are you looking for?",
    type: "singleChoice",
    options: [
      { value: "noPreference", label: "No Preference" },
      { value: "romantic", label: "Romantic & Intimate" },
      { value: "casual", label: "Casual & Relaxed" },
      { value: "energetic", label: "Energetic & Active" },
      { value: "fun", label: "Fun & Playful" },
    ],
  },
  {
    id: "activity_level",
    question: "How active would you like the date to be?",
    type: "singleChoice",
    options: [
      { value: "noPreference", label: "No Preference" },
      { value: "low", label: "Low - Relaxed and easygoing" },
      { value: "moderate", label: "Moderate - Some light activity" },
      { value: "high", label: "High - Very active and engaging" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget range for the date?",
    type: "singleChoice",
    options: [
      { value: "noPreference", label: "No Preference" },
      { value: "free", label: "Free activities" },
      { value: "economy", label: "Budget-friendly (under $30)" },
      { value: "standard", label: "Mid-range ($30-$75)" },
      { value: "premium", label: "Premium ($75-$150)" },
      { value: "luxury", label: "Luxury (Over $150)" },
    ],
  },
  {
    id: "season",
    question: "Do you have a seasonal preference?",
    type: "singleChoice",
    options: [
      { value: "noPreference", label: "No Preference" },
      { value: "spring", label: "Spring" },
      { value: "summer", label: "Summer" },
      { value: "autumn", label: "Autumn" },
      { value: "winter", label: "Winter" },
    ],
  },
  {
    id: "location",
    question: "Where would you prefer the date to take place?",
    type: "singleChoice",
    options: [
      { value: "indoor", label: "Indoor Activities" },
      { value: "outdoor", label: "Outdoor Adventures" },
      { value: "both", label: "Mix of Both" },
    ],
  },
  {
    id: "time_of_day",
    question: "What time of day works best?",
    type: "singleChoice",
    options: [
      { value: "noPreference", label: "No Preference" },
      { value: "morning", label: "Morning - Start the day together" },
      { value: "afternoon", label: "Afternoon - Perfect for day activities" },
      { value: "evening", label: "Evening - Dinner time and beyond" },
      { value: "night", label: "Night - Late night adventures" },
    ],
  },
  {
    id: "activityTypes",
    question: "What kind of experiences interest you? (Choose up to 3)",
    type: "multipleChoice",
    options: [
      { value: "adventure", label: "Adventure & Excitement" },
      { value: "relaxation", label: "Relaxation & Unwinding" },
      { value: "learning", label: "Learning & Discovery" },
      { value: "entertainment", label: "Entertainment & Fun" },
      { value: "wellness", label: "Wellness & Self-care" },
    ],
  },
  {
    id: "interests",
    question: "What specific interests would you like to explore? (Choose up to 3)",
    type: "multipleChoice",
    options: [
      { value: "art", label: "Arts & Creativity" },
      { value: "music", label: "Music & Performance" },
      { value: "sports", label: "Sports & Physical Activities" },
      { value: "technology", label: "Technology & Innovation" },
      { value: "food", label: "Food & Culinary Experiences" },
      { value: "nature", label: "Nature & Outdoors" },
      { value: "history", label: "History & Culture" },
    ],
  },
  {
    id: "groupSize",
    question: "Who will be joining for this date?",
    type: "singleChoice",
    options: [
      { value: "noPreference", label: "No Preference" },
      { value: "couple", label: "Just the two of us" },
      { value: "smallGroup", label: "Double date or small group (3-4 people)" },
      { value: "largeGroup", label: "Group date (5+ people)" },
    ],
  },
];

const QuestionPipeline = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hasVisitedStep, setHasVisitedStep] = useState(new Set([0]));
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  useEffect(() => {
    setCurrentStep(0);
    setAnswers({});
    setSubmittedAnswers({});
    setHasVisitedStep(new Set([0]));
    if (currentStep > 0) {
      setIsFirstVisit(false);
    }
  }, []);

  const getSuggestionHint = useCallback((questionId, value) => {
    const hints = {
      atmosphere: {
        noPreference: "Open to any atmosphere",
        romantic: "Looking for intimate and cozy date spots",
        casual: "Keeping it laid-back and comfortable",
        energetic: "Finding active and upbeat experiences",
        fun: "Searching for playful and entertaining activities",
      },
      activity_level: {
        noPreference: "Flexible with activity level",
        low: "Focusing on relaxed, low-key options",
        moderate: "Including some light physical activity",
        high: "Prioritizing active and engaging experiences",
      },
      budget: {
        noPreference: "Flexible with budget",
        free: "Finding no-cost activities",
        economy: "Looking for budget-friendly options",
        standard: "Including mid-range experiences",
        premium: "Considering premium experiences",
        luxury: "Exploring luxury date options",
      },
      location: {
        indoor: "Focusing on indoor venues",
        outdoor: "Exploring outdoor adventures",
        both: "Mix of indoor and outdoor experiences",
      },
      time_of_day: {
        noPreference: "Flexible with timing",
        morning: "Planning early day activities",
        afternoon: "Looking at daytime options",
        evening: "Considering dinner and evening activities",
        night: "Exploring nighttime experiences",
      },
      activityTypes: {
        adventure: "Including adventurous and exciting activities",
        relaxation: "Adding relaxing and peaceful options",
        learning: "Incorporating educational experiences",
        entertainment: "Including fun entertainment options",
        wellness: "Adding wellness and self-care activities",
      },
      interests: {
        art: "Including artistic and creative activities",
        music: "Adding musical experiences",
        sports: "Including sports-related activities",
        technology: "Adding tech-focused experiences",
        food: "Including culinary experiences",
        nature: "Adding outdoor nature activities",
        history: "Including historical and cultural elements",
      },
      season: {
        noPreference: "Available any season",
        spring: "Planning for spring weather",
        summer: "Considering summer activities",
        autumn: "Including fall-appropriate options",
        winter: "Planning for winter conditions",
      },
      groupSize: {
        noPreference: "Flexible with group size",
        couple: "Planning for just the two of you",
        smallGroup: "Planning for a small group (3-4 people)",
        largeGroup: "Planning for a larger group (5+ people)",
      },
    };
    return hints[questionId]?.[value] || "";
  }, []);

  const getCurrentSuggestions = useCallback(() => {
    return Object.entries(submittedAnswers)
      .map(([questionId, value]) => {
        if (Array.isArray(value)) {
          if (questionId === 'interests') {
            const interestLabels = value.map(v => {
              switch(v) {
                case 'art': return 'art';
                case 'music': return 'music';
                case 'sports': return 'sports';
                case 'technology': return 'technology';
                case 'food': return 'food';
                case 'nature': return 'nature';
                case 'history': return 'history';
                default: return v;
              }
            });
            return <span><strong>Interests:</strong> {interestLabels.join(', ')}</span>;
          } else if (questionId === 'activityTypes') {
            const activityLabels = value.map(v => {
              switch(v) {
                case 'adventure': return 'adventure';
                case 'relaxation': return 'relaxation';
                case 'learning': return 'learning';
                case 'entertainment': return 'entertainment';
                case 'wellness': return 'wellness';
                default: return v;
              }
            });
            return <span><strong>Activities:</strong> {activityLabels.join(', ')}</span>;
          }
          return getSuggestionHint(questionId, value[0]);
        }
        return getSuggestionHint(questionId, value);
      })
      .filter(Boolean);
  }, [submittedAnswers, getSuggestionHint]);

  const currentQuestion = questions[currentStep];

  const handleAnswer = (value) => {
    let updatedAnswers;
    if (currentQuestion.type === "multipleChoice") {
      const existing = answers[currentQuestion.id] || [];
      if (existing.includes(value)) {
        updatedAnswers = {
          ...answers,
          [currentQuestion.id]: existing.filter((v) => v !== value),
        };
      } else if (existing.length < 3) {
        updatedAnswers = {
          ...answers,
          [currentQuestion.id]: [...existing, value],
        };
      } else {
        return;
      }
      setAnswers(updatedAnswers);
    } else {
      updatedAnswers = {
        ...answers,
        [currentQuestion.id]: value,
      };
      setAnswers(updatedAnswers);
      if (currentStep < questions.length - 1) {
        setSubmittedAnswers(updatedAnswers);
        setCurrentStep(currentStep + 1);
        setHasVisitedStep(prev => new Set([...prev, currentStep + 1]));
      }
    }
  };

  const handleNext = () => {
    setSubmittedAnswers(answers);
    setCurrentStep((prevStep) => prevStep + 1);
    setHasVisitedStep(prev => new Set([...prev, currentStep + 1]));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setHasVisitedStep(prev => new Set([...prev, currentStep - 1]));
  };

  const handleComplete = () => {
    setSubmittedAnswers(answers);
    onComplete(answers);
  };

  const handleRandomize = () => {
    const randomAnswers = {};
    questions.forEach(question => {
      if (question.type === 'multipleChoice') {
        // For multiple choice, randomly select 1-3 options
        const numChoices = Math.floor(Math.random() * 3) + 1;
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        randomAnswers[question.id] = shuffledOptions
          .slice(0, numChoices)
          .map(opt => opt.value);
      } else {
        // For single choice, randomly select one option
        const randomIndex = Math.floor(Math.random() * question.options.length);
        randomAnswers[question.id] = question.options[randomIndex].value;
      }
    });
    setAnswers(randomAnswers);
    setSubmittedAnswers(randomAnswers);
    onComplete(randomAnswers);
  };

  const canProceed = (() => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multipleChoice") {
      return answer && answer.length > 0;
    } else {
      return !!answer;
    }
  })();

  const showNextButton = 
    !isFirstVisit || 
    currentStep > 0 || 
    currentStep === questions.length - 1;

  const getQuestionLabel = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    return question?.question || questionId;
  };

  const getOptionLabel = (questionId, value) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return value;
    const option = question.options.find(opt => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className="question-pipeline max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="relative">
        <div className="progress-section mb-4">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentStep + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Question {currentStep + 1} of {questions.length}
          </p>
        </div>

        {Object.keys(submittedAnswers).length > 0 && (
          <div style={{
            marginBottom: "24px",
            borderLeft: "2px solid #6c5ce7",
            paddingLeft: "16px"
          }}>
            <p style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#666",
              marginBottom: "12px"
            }}>
              Based on your choices, we're:
            </p>
            <ul style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "8px 24px",
              width: "100%"
            }}>
              {getCurrentSuggestions().map((suggestion, index) => (
                <li 
                  key={index} 
                  style={{
                    fontSize: "13px",
                    color: "#333",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    minWidth: "240px"
                  }}
                >
                  <span style={{
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#6c5ce7",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginTop: "8px",
                    flexShrink: 0
                  }}></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

        <div className="options-list">
          {currentQuestion.type === "singleChoice" &&
            currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className={`option-button ${
                  answers[currentQuestion.id] === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                } border ${
                  answers[currentQuestion.id] === option.value
                    ? "border-blue-600"
                    : "border"
                }`}
                onClick={() => handleAnswer(option.value)}
              >
                {answers[currentQuestion.id] === option.value && (
                  <span className="mr-2">✅ </span>
                )}
                {option.label}
              </button>
            ))}

          {currentQuestion.type === "multipleChoice" &&
            currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className={`option-button ${
                  answers[currentQuestion.id]?.includes(option.value)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                } border ${
                  answers[currentQuestion.id]?.includes(option.value)
                    ? "border-blue-600"
                    : "border"
                }`}
                onClick={() => handleAnswer(option.value)}
              >
                {hasVisitedStep.has(currentStep) && (
                  <span className="mr-2">
                    {answers[currentQuestion.id]?.includes(option.value)
                      ? "✅ "
                      : "⬜ "}
                  </span>
                )}
                {option.label}
              </button>
            ))}
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '12px',
          marginTop: '24px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '16px' 
          }}>
            {currentStep > 0 && (
              <button
                className="secondary-button flex-shrink-0 w-24"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {(!isFirstVisit || currentStep > 0) && (
              <button
                className={`primary-button flex-shrink-0 w-24 ${
                  !canProceed ? "opacity-30 cursor-not-allowed" : ""
                }`}
                onClick={currentStep === questions.length - 1 ? handleComplete : handleNext}
                disabled={!canProceed}
                style={{
                  backgroundColor: canProceed ? '#4f46e5' : '#e5e7eb',
                  color: canProceed ? 'white' : '#9ca3af',
                  border: canProceed ? 'none' : '1px solid #e5e7eb',
                  transition: 'all 0.2s ease'
                }}
              >
                {currentStep === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="secondary-button"
              onClick={handleRandomize}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                backgroundColor: '#f3f4f6',
                color: '#4b5563',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                minWidth: 'auto'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              🎲 Surprise Me!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

QuestionPipeline.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default QuestionPipeline;