import { useState, useCallback  } from "react";
import PropTypes from "prop-types";

const questions = [
  
  {
    id: "atmosphere",
    question: "What atmosphere do you prefer for your date?",
    type: "singleChoice",
    options: [
      { value: "romantic", label: "Romantic" },
      { value: "casual", label: "Casual" },
      { value: "energetic", label: "Energetic" },
      { value: "fun", label: "Fun" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget range for the date?",
    type: "singleChoice",
    options: [
      { value: "free", label: "No cost activities" },
      { value: "economy", label: "Budget-friendly (under $30)" },
      { value: "standard", label: "Mid-range ($30-$75)" },
      { value: "premium", label: "Premium ($75-$150)" },
      { value: "luxury", label: "Luxury (Over $150)" },
    ],
  },
  {
    id: "indoorOutdoor",
    question: "Do you prefer indoor or outdoor activities?",
    type: "singleChoice",
    options: [
      { value: "indoor", label: "Indoor" },
      { value: "outdoor", label: "Outdoor" },
      { value: "noPreference", label: "No Preference" },
    ],
  },
  {
    id: "groupSize",
    question: "Who will be joining you?",
    type: "singleChoice",
    options: [
      { value: "couple", label: "Just us" },
      { value: "smallGroup", label: "Small Group (3-5 people)" },
      { value: "largeGroup", label: "Larger Group (6+ people)" },
    ],
  },
  {
    id: "activityTypes",
    question: "What types of activities do you enjoy?",
    type: "multipleChoice",
    options: [
      { value: "adventure", label: "Adventure" },
      { value: "relaxation", label: "Relaxation" },
      { value: "learning", label: "Learning" },
      { value: "entertainment", label: "Entertainment" },
      { value: "wellness", label: "Wellness" },
    ],
  },
  {
    id: "interests",
    question: "Select interests you'd like to explore.",
    type: "multipleChoice",
    options: [
      { value: "art", label: "Art" },
      { value: "music", label: "Music" },
      { value: "sports", label: "Sports" },
      { value: "technology", label: "Technology" },
      { value: "food", label: "Food" },
      { value: "nature", label: "Nature" },
      { value: "history", label: "History" },
    ],
  },
  {
    id: "time_of_day",
    question: "What time of day do you prefer?",
    type: "singleChoice",
    options: [
      { value: "morning", label: "Morning" },
      { value: "afternoon", label: "Afternoon" },
      { value: "evening", label: "Evening" },
      { value: "night", label: "Night" },
    ],
  },
];

const QuestionPipeline = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hasVisitedStep, setHasVisitedStep] = useState(new Set([0]));

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
      } else {
        updatedAnswers = {
          ...answers,
          [currentQuestion.id]: [...existing, value],
        };
      }
      setAnswers(updatedAnswers);
    } else {
      updatedAnswers = {
        ...answers,
        [currentQuestion.id]: value,
      };
      setAnswers(updatedAnswers);
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setHasVisitedStep(prev => new Set([...prev, currentStep + 1]));
      }
    }
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prevStep) => prevStep + 1);
    setHasVisitedStep(prev => new Set([...prev, currentStep + 1]));
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prevStep) => prevStep - 1);
    setHasVisitedStep(prev => new Set([...prev, currentStep - 1]));
  };

  const handleComplete = () => {
    window.scrollTo(0, 0);
    onComplete(answers);
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
    currentQuestion.type === "singleChoice" || 
    hasVisitedStep.has(currentStep);

  return (
    <div className="question-pipeline max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
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

      <div className="flex items-center justify-center gap-4 mt-6">
        {currentStep > 0 && (
          <button
            className="secondary-button flex-shrink-0 w-24"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {(showNextButton || currentStep === questions.length - 1) && (
          <button
            className={`primary-button flex-shrink-0 w-24 ${
              !canProceed ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={currentStep === questions.length - 1 ? handleComplete : handleNext}
            disabled={!canProceed}
          >
            {currentStep === questions.length - 1 ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

QuestionPipeline.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default QuestionPipeline;