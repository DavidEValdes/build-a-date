// src/components/QuestionPipeline.jsx
import { useState, useEffect } from 'react';

const questions = [
  {
    id: 'mood',
    question: 'What mood are you in?',
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

  const resetPipeline = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  const handleAnswer = (value) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    const newVisibleQuestions = questions.filter((q) => {
      if (q.condition) {
        return q.condition(updatedAnswers);
      }
      return true;
    });

    if (currentStep < newVisibleQuestions.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  return (
    <div className="question-pipeline">
      {currentQuestion ? (
        <>
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
        </>
      ) : (
        <div>
          <h3>Thank you for completing the questionnaire!</h3>
          <button className="primary-button" onClick={resetPipeline}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionPipeline;
