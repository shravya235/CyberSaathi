import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { getRandomTips } from '../../Data/Quiz/tipsData';

const PersonalizedTips = ({ demographic, onContinue }) => {
  const tips = getRandomTips(demographic, 5);

  return (
    <div className="personalized-tips-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="tips-content"
      >
        <div className="tips-header">
          <FiShield className="tips-icon" size={32} />
          <h2>Personalized Cyber Safety Tips</h2>
          <p className="tips-subtitle">
            Based on your selection as a <strong>{demographic}</strong>, here are some important tips:
          </p>
        </div>

        <div className="tips-list">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="tip-item"
            >
              <FiCheckCircle className="tip-icon" />
              <span>{tip}</span>
            </motion.div>
          ))}
        </div>

        <div className="tips-footer">
          <p className="tips-note">
            <FiAlertCircle className="note-icon" />
            Remember to practice these safety measures regularly to protect yourself online.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="continue-button"
          >
            Start Quiz
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalizedTips;
