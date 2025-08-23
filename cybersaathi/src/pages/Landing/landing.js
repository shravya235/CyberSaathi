// src/pages/Landing/landing.js

import React from 'react';

const Landing = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Welcome to CYBERSAATHI</h1>
    <p style={styles.text}>
      Empowering you to navigate the digital world safely. Learn to recognize, prevent,
      and respond to cyber threats—whether you are a student, professional, homemaker,
      rural user, or senior citizen.
    </p>
    <p style={styles.callToAction}>
      Start your journey towards better online safety and security!
    </p>
  </div>
);

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    color: '#333',
    lineHeight: '1.6',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#0D47A1', // Dark blue
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: '1.25rem',
    fontWeight: '500',
    marginBottom: '2rem',
    color: '#444',
  },
  callToAction: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#0D47A1',
  },
};

export default Landing;