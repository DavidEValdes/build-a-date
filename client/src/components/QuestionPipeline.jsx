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
    question: "What's your budget range?",
    type: "singleChoice",
    options: [
      { value: "free", label: "Free" },
      { value: "economy", label: "$" },
      { value: "standard", label: "$$" },
      { value: "premium", label: "$$$" },
      { value: "luxury", label: "$$$$" },
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
    id: "priorities",
    question: "Rank the following in order of importance for your date.",
    type: "ranking",
    options: [
      { value: "budget", label: "Budget" },
      { value: "activityTypes", label: "Activity Type" },
      { value: "atmosphere", label: "Atmosphere" },
      { value: "indoorOutdoor", label: "Location (Indoor/Outdoor)" },
      { value: "interests", label: "Interests" },
    ],
  },
];

const RankingQuestion = ({ options, onChange, initialRanking = {} }) => {
  const [items, setItems] = useState(() => {
    if (Object.keys(initialRanking).length > 0) {
      return options.map(option => ({
        id: option.value,
        label: option.label,
        rank: initialRanking[option.value] || 0
      })).sort((a, b) => a.rank - b.rank);
    }
    return options.map((option, index) => ({
      id: option.value,
      label: option.label,
      rank: index + 1
    }));
  });

  const handleDragStart = (e, startIndex) => {
    e.dataTransfer.setData('text/plain', startIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    const updatedItems = newItems.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    const rankingObject = updatedItems.reduce((acc, item) => {
      acc[item.id] = item.rank.toString();
      return acc;
    }, {});

    setItems(updatedItems);
    onChange(rankingObject);
  };

  return (
    <div className="question-pipeline max-w-md mx-auto">
      <div className="options-list">
        <p className="text-sm text-gray-600 mb-4">
          Drag items to reorder - #1 being most important
        </p>
        
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`option-button`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'move',
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              padding: '1rem',
              borderRadius: '0.5rem',
              width: '100%',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.2s ease, transform 0.1s ease',
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#9CA3AF' }}>☰</span>
              {item.label}
            </div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {item.rank}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuestionPipeline = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

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
    } else if (currentQuestion.type === "ranking") {
      updatedAnswers = {
        ...answers,
        [currentQuestion.id]: value,
      };
    } else {
      updatedAnswers = {
        ...answers,
        [currentQuestion.id]: value,
      };
    }

    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleComplete = () => {
    onComplete(answers);
  };

  const canProceed = (() => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multipleChoice") {
      return answer && answer.length > 0;
    } else if (currentQuestion.type === "ranking") {
      if (!answer) return false;
      const values = Object.values(answer).filter(val => val !== "");
      return values.length === currentQuestion.options.length;
    } else {
      return !!answer;
    }
  })();

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
              onClick={() => {
                handleAnswer(option.value);
                if (currentStep < questions.length - 1) {
                  handleNext();
                } else {
                  handleComplete();
                }
              }}
            >
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
              <span className="mr-2">
                {answers[currentQuestion.id]?.includes(option.value)
                  ? "✅"
                  : "⬜️"}
              </span>
              {option.label}
            </button>
          ))}

        {currentQuestion.type === "ranking" && (
          <RankingQuestion
            options={currentQuestion.options}
            onChange={(ranking) => handleAnswer(ranking)}
            initialRanking={answers[currentQuestion.id]}
          />
        )}
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
        <button
          className={`primary-button flex-shrink-0 w-24 ${
            !canProceed ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={currentStep === questions.length - 1 ? handleComplete : handleNext}
          disabled={!canProceed}
        >
          {currentStep === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

QuestionPipeline.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default QuestionPipeline;