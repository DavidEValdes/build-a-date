import { useState } from 'react';
import PropTypes from 'prop-types';

const questions = [
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
    id: 'mood',
    question: 'What mood are you in today?',
    type: 'singleChoice',
    options: [
      { value: 'adventurous', label: 'Adventurous' },
      { value: 'relaxed', label: 'Relaxed' },
      { value: 'romantic', label: 'Romantic' },
      { value: 'creative', label: 'Creative' },
      { value: 'energetic', label: 'Energetic' },
      { value: 'serene', label: 'Serene' },
      { value: 'playful', label: 'Playful' },
      { value: 'curious', label: 'Curious' },
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
    id: 'budget',
    question: 'What is your budget for this date?',
    type: 'singleChoice',
    options: [
      { value: 'free', label: 'Free' },
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
      { value: 'learning', label: 'Learning & Growth' },
      { value: 'entertainment', label: 'Entertainment & Fun' },
      { value: 'wellness', label: 'Wellness & Relaxation' },
      { value: 'bonding', label: 'Bonding & Togetherness' },
    ],
  },
  {
    id: 'interests',
    question: 'What interests do you want to focus on for your date?',
    type: 'multipleChoice',
    options: [
      { value: 'arts', label: 'Arts & Culture' },
      { value: 'sports', label: 'Sports & Fitness' },
      { value: 'food', label: 'Food & Drink' },
      { value: 'nature', label: 'Nature & Outdoors' },
      { value: 'technology', label: 'Technology & Innovation' },
      { value: 'music', label: 'Music & Entertainment' },
      { value: 'learning', label: 'Learning & Education' },
      { value: 'wellness', label: 'Wellness & Relaxation' },
    ],
  },
  {
    id: 'groupSize',
    question: 'What is the group size for your date?',
    type: 'singleChoice',
    options: [
      { value: 'couple', label: 'Just the two of us' },
      { value: 'friends', label: 'With friends' },
      { value: 'family', label: 'With family' },
    ],
  },
  {
    id: 'season',
    question: 'Which season will you be in during your date?',
    type: 'singleChoice',
    options: [
      { value: 'spring', label: 'Spring' },
      { value: 'summer', label: 'Summer' },
      { value: 'autumn', label: 'Autumn' },
      { value: 'winter', label: 'Winter' },
      { value: 'noPreference', label: 'No Preference' },
    ],
  },
];

const QuestionPipeline = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentStep];

  const handleAnswer = (value) => {
    let updatedAnswers;
    if (currentQuestion.type === 'multipleChoice') {
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

  const handleTryAgain = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  const isMultipleChoice = currentQuestion.type === 'multipleChoice';
  const canProceed = isMultipleChoice
    ? answers[currentQuestion.id] && answers[currentQuestion.id].length > 0
    : answers[currentQuestion.id];

  return (
    <div className="question-pipeline max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="progress-section mb-4">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentStep + 1) / 10) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Question {currentStep + 1} of 10
        </p>
      </div>

      <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

      <div className="options-list space-y-2">
        {currentQuestion.type === 'singleChoice' &&
          currentQuestion.options.map((option) => (
            <button
              key={option.value}
              className={`option-button ${
                answers[currentQuestion.id] === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              } border ${
                answers[currentQuestion.id] === option.value ? 'border-blue-600' : 'border'
              }`}
              onClick={() => {
                handleAnswer(option.value);
                if (!isMultipleChoice && currentStep < 9) {
                  handleNext();
                } else if (!isMultipleChoice && currentStep === 9) {
                  handleComplete();
                }
              }}
            >
              {option.label}
            </button>
          ))}

        {currentQuestion.type === 'multipleChoice' &&
          currentQuestion.options.map((option) => (
            <button
              key={option.value}
              className={`option-button flex items-center ${
                answers[currentQuestion.id] && answers[currentQuestion.id].includes(option.value)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              } border ${
                answers[currentQuestion.id] && answers[currentQuestion.id].includes(option.value)
                  ? 'border-blue-600'
                  : 'border'
              }`}
              onClick={() => handleAnswer(option.value)}
            >
              <span className="mr-2">
                {answers[currentQuestion.id] && answers[currentQuestion.id].includes(option.value)
                  ? '✅'
                  : '⬜️'}
              </span>
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
        {isMultipleChoice && (
          <button
            className={`primary-button flex-shrink-0 w-24 ${!canProceed ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={currentStep === 9 ? handleComplete : handleNext}
            disabled={!canProceed}
          >
            {currentStep === 9 ? 'Finish' : 'Next'}
          </button>
        )}
      </div>

      <div className="try-again-section mt-6 text-center">
        <button className="secondary-button" onClick={handleTryAgain}>
          Start Over
        </button>
      </div>
    </div>
  );
};

QuestionPipeline.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default QuestionPipeline;