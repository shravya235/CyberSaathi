"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import motion components
const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(mod => mod.motion.button), { ssr: false });

// Import quiz data and components
import level1 from "../../Data/quiz/level1";
import level2 from "../../Data/quiz/level2";
import level3 from "../../Data/quiz/level3";
import ResultSummary from "./ResultSummary";
import { recordQuizSession } from "../../utils/quizAnalytics";

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

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswer(null); // Time's up
    }
  }, [timeLeft, showFeedback, quizCompleted]);

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

    // Record user answer
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
        // Always call onLevelComplete to record results, regardless of passing score
        onLevelComplete(levelId, finalScore, userAnswers);
      }
    }, 1500);
  };

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
          // This will be integrated with the analytics system later
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBackToLevels}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Levels
            </button>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Timer */}
          <div className="text-center mb-4">
            <div className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-700'}`}>
              ⏱️ {timeLeft}s
            </div>
          </div>

          {/* Score */}
          <div className="text-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              Score: {score}
            </span>
          </div>
        </div>

        {/* Question */}
        <MotionDiv
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {Array.isArray(currentQ.options) ? (
              // Multiple Choice
              currentQ.options.map((option, index) => (
                <MotionButton
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full py-3 px-4 rounded-lg text-left font-medium transition ${
                    showFeedback
                      ? option === currentQ.answer
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : option === selectedAnswer
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                      : selectedAnswer === option
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </MotionButton>
              ))
            ) : (
              // True/False
              <>
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !showFeedback && handleAnswer("true")}
                  disabled={showFeedback}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                    showFeedback
                      ? "true" === currentQ.answer.toString()
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : selectedAnswer === "true"
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                      : selectedAnswer === "true"
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  True
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !showFeedback && handleAnswer("false")}
                  disabled={showFeedback}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                    showFeedback
                      ? "false" === currentQ.answer.toString()
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : selectedAnswer === "false"
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                      : selectedAnswer === "false"
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  False
                </MotionButton>
              </>
            )}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-lg text-center font-semibold ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </div>
  );
}
