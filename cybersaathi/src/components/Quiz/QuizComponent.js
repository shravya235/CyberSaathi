"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiClock, FiArrowLeft } from "react-icons/fi";

// Import quiz data and components
import level1 from "../../Data/Quiz/level1";
import level2 from "../../Data/Quiz/level2";
import level3 from "../../Data/Quiz/level3";
import ResultSummary from "@/components/Quiz/ResultSummary";
import "./QuizComponent.css";

const QUIZ_DATA = {
  1: level1,
  2: level2,
  3: level3
};

export default function QuizComponent({ levelId, onLevelComplete, onBackToLevels }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = QUIZ_DATA[levelId];
  const currentQ = questions[currentQuestion];

  // Move handleAnswer above useEffect so it can be added to dependencies
  const handleAnswer = (answer) => {
    const correct = Array.isArray(currentQ.options) 
      ? answer === currentQ.answer
      : answer === currentQ.answer.toString();

    setIsCorrect(correct);
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setUserAnswers(prev => [...prev, {
      questionId: currentQ.id,
      question: currentQ.question,
      userAnswer: answer,
      correctAnswer: currentQ.answer,
      isCorrect: correct,
      timeSpent: 30 - timeLeft
    }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
        const finalScore = (score + (correct ? 1 : 0)) / questions.length * 100;
        onLevelComplete(levelId, finalScore, userAnswers);
      }
    }, 1500);
  };

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswer(null); // Time's up
    }
  }, [timeLeft, showFeedback, quizCompleted, handleAnswer]);

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  if (quizCompleted) {
    const finalScore = Math.round((score / questions.length) * 100);
    const passed = finalScore >= 60;

    return (
      <ResultSummary
        levelId={levelId}
        score={finalScore}
        totalQuestions={questions.length}
        userAnswers={userAnswers}
        onRetry={handleRetry}
        onContinue={passed ? onBackToLevels : handleRetry}
        onViewAnalytics={(analytics) => {
          console.log('Analytics data:', analytics);
          // Integration point for analytics
        }}
      />
    );
  }

  return (
    <div className="quiz-component-container">
      <div className="quiz-content-wrapper">
        {/* Header */}
        <div className="quiz-header">
          <div className="flex justify-between items-center mb-4">
            <button onClick={onBackToLevels} className="back-button">
              <FiArrowLeft /> Back to Levels
            </button>
            <div className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Timer */}
          <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            <FiClock /> {timeLeft}s
          </div>

          {/* Score */}
          <div className="text-center">
            <span className="score-badge">
              Score: {score}
            </span>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="question-card"
        >
          <h2 className="question-text">
            {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className="options-container">
            {Array.isArray(currentQ.options) ? (
              currentQ.options.map((option, index) => {
                let buttonClass = "option-button";
                if (showFeedback) {
                  if (option === currentQ.answer) {
                    buttonClass += " correct";
                  } else if (option === selectedAnswer) {
                    buttonClass += " incorrect";
                  }
                } else if (selectedAnswer === option) {
                  buttonClass += " selected";
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !showFeedback && handleAnswer(option)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    {option}
                  </motion.button>
                );
              })
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !showFeedback && handleAnswer("true")}
                  disabled={showFeedback}
                  className={`option-button ${
                    showFeedback
                      ? "true" === currentQ.answer.toString() ? "correct" : selectedAnswer === "true" ? "incorrect" : ""
                      : selectedAnswer === "true" ? "selected" : ""
                  }`}
                >
                  True
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !showFeedback && handleAnswer("false")}
                  disabled={showFeedback}
                  className={`option-button ${
                    showFeedback
                      ? "false" === currentQ.answer.toString() ? "correct" : selectedAnswer === "false" ? "incorrect" : ""
                      : selectedAnswer === "false" ? "selected" : ""
                  }`}
                >
                  False
                </motion.button>
              </>
            )}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`feedback-container ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}
            >
              <div className="feedback-icon">
                {isCorrect ? '✅' : '❌'}
              </div>
              <div className="feedback-title">
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </div>

              {currentQ.scenario && (
                <div className="scenario-explanation">
                  <strong>Explanation:</strong> {currentQ.scenario}
                </div>
              )}

              <div className="correct-answer">
                Correct answer: {Array.isArray(currentQ.options) ? currentQ.answer : currentQ.answer.toString()}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
