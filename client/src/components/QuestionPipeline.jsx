// src/components/QuestionPipeline.jsx
import { useState } from 'react';

const questions = [
  {
    id: 'preference',
    question: "What type of experience are you looking for?",
    options: [
      { value: 'active', label: 'Active & Adventurous' },
      { value: 'relaxed', label: 'Relaxed & Casual' },
      { value: 'romantic', label: 'Romantic & Intimate' },
      { value: 'creative', label: 'Creative & Artistic' }
    ]
  },
  {
    id: 'location',
    question: "Where would you prefer the date to be?",
    options: [
      { value: 'indoor', label: 'Indoor' },
      { value: 'outdoor', label: 'Outdoor' },
      { value: 'both', label: 'Mix of Both' }
    ]
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    options: [
      { value: 'free', label: 'Free' },
      { value: 'low', label: '$' },
      { value: 'medium', label: '$$' },
      { value: 'high', label: '$$$' }
    ]
  },
  {
    id: 'duration',
    question: "How long would you like the date to be?",
    options: [
      { value: 'short', label: '1-2 hours' },
      { value: 'medium', label: '2-4 hours' },
      { value: 'long', label: '4+ hours' }
    ]
  }
];

const QuestionPipeline = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: value
    }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div className="question-pipeline">
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep + 1) / questions.length * 100}%` }}
          ></div>
        </div>
        <p className="question-counter">
          Question {currentStep + 1} of {questions.length}
        </p>
      </div>

      <h3>{questions[currentStep].question}</h3>

      <div className="options-list">
        {questions[currentStep].options.map((option) => (
          <div key={option.value} className="option-item">
            <input
              type="radio"
              name="question"
              id={option.value}
              value={option.value}
              onChange={() => handleAnswer(option.value)}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPipeline;