"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import motion components
const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(mod => mod.motion.button), { ssr: false });

export default function ResultSummary({ 
  levelId, 
  score, 
  totalQuestions, 
  userAnswers, 
  onRetry, 
  onContinue,
  onViewAnalytics 
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= 60;

  // Calculate analytics
  useEffect(() => {
    if (userAnswers && userAnswers.length > 0) {
      const totalTime = userAnswers.reduce((sum, answer) => sum + answer.timeSpent, 0);
      const averageTime = Math.round(totalTime / userAnswers.length);
      const fastestAnswer = Math.min(...userAnswers.map(a => a.timeSpent));
      const slowestAnswer = Math.max(...userAnswers.map(a => a.timeSpent));
      
      const difficultyBreakdown = {
        easy: userAnswers.filter(a => a.timeSpent < 10).length,
        medium: userAnswers.filter(a => a.timeSpent >= 10 && a.timeSpent <= 20).length,
        hard: userAnswers.filter(a => a.timeSpent > 20).length
      };

      setAnalytics({
        totalTime,
        averageTime,
        fastestAnswer,
        slowestAnswer,
        difficultyBreakdown,
        completionDate: new Date().toISOString()
      });
    }
  }, [userAnswers]);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎯";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Great job! 👍";
    if (percentage >= 60) return "Good work! ✅";
    return "Keep practicing! 📚";
  };

  const getTimeSpentMessage = () => {
    if (!analytics) return "";
    const avg = analytics.averageTime;
    if (avg < 8) return "Lightning fast! ⚡";
    if (avg < 15) return "Quick thinking! 🚀";
    if (avg < 25) return "Steady pace! 🏃";
    return "Take your time! 🧘";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 md:p-8"
        role="region"
        aria-label="Quiz Results Summary"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-2xl font-bold text-white">{percentage}%</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {passed ? "Level Complete! 🎉" : "Practice Makes Perfect"}
          </h2>
          
          <p className="text-lg text-gray-600 mb-4">
            {getPerformanceMessage()}
          </p>
          
          <div className="text-sm text-gray-500">
            Level {levelId} • {correctAnswers} of {totalQuestions} correct
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
            <div className="text-sm text-blue-800">Correct</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
            <div className="text-sm text-red-800">Incorrect</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{totalQuestions}</div>
            <div className="text-sm text-green-800">Total</div>
          </div>
        </div>

        {/* Analytics Summary */}
        {analytics && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Performance Insights</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Avg. time per question:</span>
                <span className="font-semibold ml-2">{analytics.averageTime}s</span>
              </div>
              <div>
                <span className="text-gray-600">Total time:</span>
                <span className="font-semibold ml-2">{analytics.totalTime}s</span>
              </div>
              <div>
                <span className="text-gray-600">Fastest answer:</span>
                <span className="font-semibold ml-2">{analytics.fastestAnswer}s</span>
              </div>
              <div>
                <span className="text-gray-600">Slowest answer:</span>
                <span className="font-semibold ml-2">{analytics.slowestAnswer}s</span>
              </div>
            </div>
            
            <p className="text-sm text-blue-600 mt-2">{getTimeSpentMessage()}</p>
          </div>
        )}

        {/* Detailed Results Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
            aria-expanded={showDetails}
            aria-controls="detailed-results"
          >
            {showDetails ? "Hide detailed results" : "Show detailed results"} ↓
          </button>
        </div>

        {/* Detailed Results */}
        {showDetails && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            id="detailed-results"
            className="mb-6"
          >
            <h4 className="font-semibold text-gray-800 mb-3">Question Breakdown</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {userAnswers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    answer.isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">Q{index + 1}</span>
                    <span className={`text-xs font-semibold ${
                      answer.isCorrect ? "text-green-600" : "text-red-600"
                    }`}>
                      {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{answer.question}</p>
                  <div className="text-xs text-gray-500">
                    Time: {answer.timeSpent}s • 
                    Your answer: {answer.userAnswer} • 
                    Correct: {answer.correctAnswer}
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            aria-label="Retry this level"
          >
            🔄 Retry Level
          </MotionButton>
          
          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            aria-label="Continue to next level"
          >
            {passed ? "➡️ Continue" : "Back to Levels"}
          </MotionButton>
        </div>

        {/* Analytics Button */}
        {analytics && (
          <div className="mt-4">
            <button
              onClick={() => onViewAnalytics && onViewAnalytics(analytics)}
              className="w-full text-center text-gray-600 hover:text-gray-800 text-sm"
            >
              View detailed analytics →
            </button>
          </div>
        )}
      </MotionDiv>
    </div>
  );
}
