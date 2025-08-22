"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiDownload, FiTrash2, FiRefreshCw, FiTrendingUp, FiAward, FiClock, FiBarChart2 } from "react-icons/fi";
// Import analytics utilities
import { getProgressAnalytics, getLevelAnalytics, getStreakData, exportAnalyticsData, clearAnalyticsData } from "../../utils/quizAnalytics";
import "./AnalyticsDashboard.css";

export default function AnalyticsDashboard({ onClose }) {
  const [analytics, setAnalytics] = useState(null);
  const [levelAnalytics, setLevelAnalytics] = useState({});
  const [streakData, setStreakData] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const progress = getProgressAnalytics();
    const streak = getStreakData();
    
    setAnalytics(progress);
    setStreakData(streak);
    
    // Load analytics for each level
    const levelData = {};
    [1, 2, 3].forEach(levelId => {
      const levelStats = getLevelAnalytics(levelId);
      if (levelStats) {
        levelData[levelId] = levelStats;
      }
    });
    setLevelAnalytics(levelData);
  };

  const handleExport = () => {
    const data = exportAnalyticsData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybersaathi-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      clearAnalyticsData();
      loadAnalytics();
    }
  };

  if (!analytics) {
    return (
      <div className="analytics-container">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-wrapper">
        {/* Header */}
        <div className="analytics-header">
          <div className="analytics-header-content">
            <h1 className="analytics-title">Quiz Analytics Dashboard</h1>
            <button
              onClick={onClose}
              className="close-button"
              aria-label="Close analytics"
            >
              <FiX />
            </button>
          </div>

          {/* Overall Stats */}
          <div className="stats-grid">
            <div className="stat-card stat-card-blue">
              <div className="stat-value stat-value-blue">{analytics.totalQuizzes}</div>
              <div className="stat-label stat-label-blue">Total Quizzes</div>
            </div>
            
            <div className="stat-card stat-card-green">
              <div className="stat-value stat-value-green">{analytics.overallAccuracy}%</div>
              <div className="stat-label stat-label-green">Overall Accuracy</div>
            </div>
            
            <div className="stat-card stat-card-purple">
              <div className="stat-value stat-value-purple">{analytics.bestScore}%</div>
              <div className="stat-label stat-label-purple">Best Score</div>
            </div>
            
            <div className="stat-card stat-card-orange">
              <div className="stat-value stat-value-orange">{Math.round(analytics.totalTimeSpent / 60)}m</div>
              <div className="stat-label stat-label-orange">Total Time</div>
            </div>
          </div>

          {/* Streak Information */}
          <div className="streak-section">
            <h3 className="streak-title">
              <FiAward /> Current Streak
            </h3>
            <div className="streak-value">{streakData.currentStreak} days</div>
            <p className="streak-subtext">Longest streak: {streakData.longestStreak} days</p>
          </div>
        </div>

        {/* Level-wise Analytics */}
        <div className="levels-grid">
          {[1, 2, 3].map(levelId => {
            const levelStats = levelAnalytics[levelId];
            if (!levelStats) return null;

            return (
              <motion.div
                key={levelId}
                whileHover={{ scale: 1.02 }}
                className="level-card"
                onClick={() => setSelectedLevel(selectedLevel === levelId ? null : levelId)}
              >
                <div className="level-header">
                  <div className="level-number">
                    {levelId}
                  </div>
                  <h3 className="level-title">Level {levelId}</h3>
                  
                  <div className="level-stats">
                    <div>
                      <div className="stat-number stat-number-blue">{levelStats.totalAttempts}</div>
                      <div className="stat-label-gray">Attempts</div>
                    </div>
                    <div>
                      <div className="stat-number stat-number-green">{levelStats.completionRate}%</div>
                      <div className="stat-label-gray">Completion</div>
                    </div>
                  </div>
                  
                  {selectedLevel === levelId && (
                    <div className="level-details">
                      <div className="detail-text">Best: {levelStats.bestScore}%</div>
                      <div className="detail-text">Average: {levelStats.averageScore}%</div>
                      <div className="detail-text">Latest: {levelStats.latestScore}%</div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Chart Placeholder */}
        <div className="chart-section">
          <h3 className="chart-title">Progress Over Time</h3>
          <div className="chart-placeholder">
            <p className="placeholder-text">Progress chart visualization would be implemented here</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          <div className="actions-grid">
            <button
              onClick={handleExport}
              className="action-button"
            >
              <FiDownload /> Export Data
            </button>
            
            <button
              onClick={handleClear}
              className="action-button action-button-red"
            >
              <FiTrash2 /> Clear Data
            </button>
            
            <button
              onClick={loadAnalytics}
              className="action-button action-button-gray"
            >
              <FiRefreshCw /> Refresh
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="tips-section">
          <h3 className="tips-title">
            <FiTrendingUp /> Improvement Tips
          </h3>
          <ul className="tips-list">
            <li>• Practice regularly to maintain your streak</li>
            <li>• Review questions you got wrong</li>
            <li>• Aim for consistency across all levels</li>
            <li>• Take your time to understand scenarios</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
