"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import QuizComponent from "../../components/Quiz/QuizComponent";

// Dynamically import motion to avoid SSR issues
const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), {
  ssr: false
});

const levels = [
  { id: 1, title: "Level 1 - Basics", description: "True/False questions", unlocked: true },
  { id: 2, title: "Level 2 - Intermediate", description: "Multiple choice questions", unlocked: false },
  { id: 3, title: "Level 3 - Advanced", description: "Scenario-based questions", unlocked: false },
];

export default function QuizPage() {
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizResults, setQuizResults] = useState({});

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">CyberSaathi Quiz</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Test your cybersecurity knowledge across three difficulty levels. Complete each level to unlock the next!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level) => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const levelResult = quizResults[level.id];
            const isCompleted = levelResult && levelResult.score >= 60;

            return (
              <MotionDiv
                key={level.id}
                whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: level.id * 0.1 }}
                className={`p-6 rounded-2xl shadow-lg cursor-pointer transition-all ${
                  isUnlocked
                    ? isCompleted
                      ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                      : "bg-white hover:shadow-xl border-2 border-blue-200"
                    : "bg-gray-100 text-gray-400"
                }`}
                onClick={() => isUnlocked && handleLevelSelect(level.id)}
                role="button"
                tabIndex={isUnlocked ? 0 : -1}
                aria-label={isUnlocked ? `Start ${level.title}` : `${level.title} is locked`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                    <span className="text-2xl font-bold">{level.id}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">{level.title}</h2>
                  <p className="text-sm mb-4 opacity-80">{level.description}</p>

                  {isCompleted && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold">Score: {levelResult.score}%</div>
                      <div className="text-xs">
                        {levelResult.correctAnswers}/{levelResult.totalQuestions} correct
                      </div>
                    </div>
                  )}

                  {!isUnlocked ? (
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-sm font-semibold"
                    >
                      🔒 Complete previous level
                    </MotionDiv>
                  ) : (
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        isCompleted
                          ? "bg-white text-green-600 hover:bg-green-50"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isCompleted ? "Play Again" : "Start Quiz"}
                    </button>
                  )}
                </div>
              </MotionDiv>
            );
          })}
        </div>
        </div>
        

        {Object.keys(quizResults).length > 0 && (
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
            </div>
        )
    } </div>
    );
}