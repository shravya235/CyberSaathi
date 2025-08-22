"use client"; // ensures this runs as a client component

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLock, FiAward, FiBarChart2, FiPlay, FiRefreshCw } from "react-icons/fi";
import QuizComponent from "../../components/Quiz/QuizComponent";
import AnalyticsDashboard from "../../components/Quiz/AnalyticsDashboard";
import "./Quiz.css";

const levels = [
  { id: 1, title: "Level 1 - Basics", description: "True/False questions", unlocked: true },
  { id: 2, title: "Level 2 - Intermediate", description: "Multiple choice questions", unlocked: false },
  { id: 3, title: "Level 3 - Advanced", description: "Scenario-based questions", unlocked: false },
];

export default function QuizPage() {
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizResults, setQuizResults] = useState({});
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Load unlocked levels from localStorage if available
    const savedUnlocked = localStorage.getItem('quizUnlockedLevels');
    if (savedUnlocked) {
      setUnlockedLevels(JSON.parse(savedUnlocked));
    }

    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      setQuizResults(JSON.parse(savedResults));
    }
  }, []);

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleLevelComplete = (levelId, score, userAnswers) => {
    // Update unlocked levels
    const nextLevel = levelId + 1;
    if (nextLevel <= 3 && !unlockedLevels.includes(nextLevel)) {
      const newUnlocked = [...unlockedLevels, nextLevel];
      setUnlockedLevels(newUnlocked);
      localStorage.setItem('quizUnlockedLevels', JSON.stringify(newUnlocked));
    }

    // Save results
    const newResults = {
      ...quizResults,
      [levelId]: {
        score,
        completedAt: new Date().toISOString(),
        totalQuestions: userAnswers.length,
        correctAnswers: userAnswers.filter(a => a.isCorrect).length,
        userAnswers
      }
    };
    setQuizResults(newResults);
    localStorage.setItem('quizResults', JSON.stringify(newResults));

    setSelectedLevel(null);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
  };

  if (selectedLevel) {
    return (
      <QuizComponent
        levelId={selectedLevel}
        onLevelComplete={handleLevelComplete}
        onBackToLevels={handleBackToLevels}
      />
    );
  }

  if (showAnalytics) {
    return (
      <AnalyticsDashboard onClose={() => setShowAnalytics(false)} />
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <h1 className="quiz-title">CyberSaathi Quiz</h1>
        <p className="quiz-subtitle">
          Test your cybersecurity knowledge across three difficulty levels. Complete each level to unlock the next!
        </p>

        <div className="levels-grid">
          {levels.map((level) => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const levelResult = quizResults[level.id];
            const isCompleted = levelResult && levelResult.score >= 60;

            return (
              <motion.div
                key={level.id}
                whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: level.id * 0.1 }}
                className={`level-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
                role="region"
                aria-label={level.title}
              >
                <div className="level-header">
                  <div className="level-number">
                    {level.id}
                  </div>
                  
                  <h2 className="level-title">{level.title}</h2>
                  <p className="level-description">{level.description}</p>

                  {isCompleted && (
                    <div className="level-stats">
                      <div className="level-score">Score: {levelResult.score}%</div>
                      <div className="level-correct">
                        {levelResult.correctAnswers}/{levelResult.totalQuestions} correct
                      </div>
                    </div>
                  )}

                  <div className="level-action">
                    {!isUnlocked ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="locked-message"
                      >
                        <FiLock className="inline" /> Complete previous level
                      </motion.div>
                    ) : (
                      <button
                        className={`start-button ${isCompleted ? 'secondary' : 'primary'}`}
                        onClick={() => handleLevelSelect(level.id)}
                      >
                        {isCompleted ? (
                          <>
                            <FiRefreshCw /> Play Again
                          </>
                        ) : (
                          <>
                            <FiPlay /> Start Quiz
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {Object.keys(quizResults).length > 0 && (
          <div className="progress-section">
            <h3 className="progress-title">Your Progress</h3>
            <p className="progress-text">
              You've completed {Object.keys(quizResults).length} level(s). Keep learning!
            </p>
            <button
              onClick={() => setShowAnalytics(true)}
              className="analytics-button"
            >
              <FiBarChart2 /> View Analytics Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

