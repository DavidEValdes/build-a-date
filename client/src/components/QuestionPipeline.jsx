// src/components/QuestionPipeline.jsx
import { useState, useEffect } from 'react';

const questions = [
  {
    id: 'mood',
    question: 'What mood are you in today?',
    type: 'singleChoice',
    options: [
      { value: 'adventurous', label: 'Adventurous' },
      { value: 'relaxed', label: 'Relaxed' },
      { value: 'romantic', label: 'Romantic' },
      { value: 'creative', label: 'Creative' },
    ],
  },
  {
    id: 'timeOfDay',
    question: 'What time of day will your date be?',
    type: 'singleChoice',
    options: [
      { value: 'morning', label: 'Morning' },
      { value: 'afternoon', label: 'Afternoon' },
      { value: 'evening', label: 'Evening' },
      { value: 'night', label: 'Night' },
    ],
  },
  {
    id: 'indoorOutdoor',
    question: 'Do you prefer indoor or outdoor activities?',
    type: 'singleChoice',
    options: [
      { value: 'indoor', label: 'Indoor' },
      { value: 'outdoor', label: 'Outdoor' },
      { value: 'noPreference', label: 'No Preference' },
    ],
  },
  // Conditional question based on 'indoorOutdoor' answer
  {
    id: 'weatherConsideration',
    question: 'Do you want to consider the weather in your planning?',
    type: 'singleChoice',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    condition: (answers) => answers.indoorOutdoor === 'outdoor',
  },
  {
    id: 'budget',
    question: 'What is your budget for this date?',
    type: 'singleChoice',
    options: [
      { value: 'economy', label: 'Economy ($)' },
      { value: 'standard', label: 'Standard ($$)' },
      { value: 'premium', label: 'Premium ($$$)' },
      { value: 'luxury', label: 'Luxury ($$$$)' },
    ],
  },
  {
    id: 'activityLevel',
    question: 'What activity level do you prefer?',
    type: 'singleChoice',
    options: [
      { value: 'low', label: 'Low (e.g., sitting, relaxing)' },
      { value: 'moderate', label: 'Moderate (e.g., walking, light activity)' },
      { value: 'high', label: 'High (e.g., sports, physical activities)' },
    ],
  },
  {
    id: 'distanceWilling',
    question: 'How far are you willing to travel?',
    type: 'singleChoice',
    options: [
      { value: 'local', label: 'Within the city' },
      { value: 'nearby', label: 'Nearby towns' },
      { value: 'far', label: 'A road trip away' },
    ],
  },
  // Final question
  {
    id: 'importance',
    question: 'What is most important for your date?',
    type: 'singleChoice',
    options: [
      { value: 'experience', label: 'Unique Experience' },
      { value: 'comfort', label: 'Comfort & Convenience' },
      { value: 'surprise', label: 'Element of Surprise' },
      { value: 'connection', label: 'Deep Connection' },
    ],
  },
];

const QuestionPipeline = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState(() =>
    questions.filter((q) => {
      if (q.condition) {
        return q.condition(answers);
      }
      return true;
    })
  );

  useEffect(() => {
    // Update visibleQuestions whenever answers change
    const generateVisibleQuestions = () => {
      return questions.filter((q) => {
        if (q.condition) {
          return q.condition(answers);
        }
        return true;
      });
    };
    setVisibleQuestions(generateVisibleQuestions());
  }, [answers]);

  const currentQuestion = visibleQuestions[currentStep];

  const handleAnswer = (value) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };

    setAnswers(updatedAnswers);

    // Calculate new visibleQuestions based on updated answers
    const newVisibleQuestions = questions.filter((q) => {
      if (q.condition) {
        return q.condition(updatedAnswers);
      }
      return true;
    });

    // Move to the next question or complete
    if (currentStep < newVisibleQuestions.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  const handleTryAgain = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  // Check if currentQuestion is defined
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-pipeline">
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentStep + 1) / visibleQuestions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="question-counter">
          Question {currentStep + 1} of {visibleQuestions.length}
        </p>
      </div>

      <h3>{currentQuestion.question}</h3>

      <div className="options-list">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            className="option-button"
            onClick={() => handleAnswer(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="try-again-section">
        <button 
          onClick={handleTryAgain}
          className="secondary-button mt-6"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default QuestionPipeline;