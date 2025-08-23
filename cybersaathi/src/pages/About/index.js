// src/pages/About/index.js

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

const About = () => (
  <div style={styles.container}>
    <Navbar/>
    <h1 style={styles.title}>About CyberSaathi</h1>
    <p style={styles.intro}>
      <strong>CyberSaathi</strong> is your trusted companion for navigating the digital world safely and securely.
    </p>

    <section style={styles.section}>
      <h2 style={styles.heading}>Our Mission</h2>
      <p style={styles.paragraph}>
        With cyber fraud cases rapidly increasing in India—from phishing emails, fake OTP calls, UPI scams, to identity theft—every demographic including students, professionals, homemakers, rural users, and senior citizens faces unique risks and challenges.
        Our goal is to bridge this gap through a platform that raises awareness, educates, and empowers everyone to recognize, prevent, and respond to cyber threats.
      </p>
    </section>

    <section style={styles.section}>
      <h2 style={styles.heading}>What We Offer</h2>
      <ul style={styles.list}>
        <li>Educational resources tailored for various user groups</li>
        <li>Community forums for support and expert advice</li>
        <li>Real-life scenarios and example cases</li>
        <li>Flexible, relatable, and trustworthy safety solutions</li>
      </ul>
    </section>

    <section style={styles.section}>
      <h2 style={styles.heading}>Why Choose CyberSaathi?</h2>
      <p style={styles.paragraph}>
        We make cyber safety simple, reliable, and accessible to all. Whether you are new to the internet or an experienced user, our easy-to-use resources ensure you learn at your own pace and gain confidence in your online safety.
      </p>
      <p style={styles.callToAction}>
        Let CyberSaathi be your guide to a safer digital world!
      </p>
    </section>
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
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#0D47A1', // Dark blue
    marginBottom: '1rem',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  intro: {
    fontSize: '1.25rem',
    fontWeight: '500',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#555',
  },
  section: {
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1976D2', 
    borderBottom: '3px solid #1976D2',
    paddingBottom: '0.3rem',
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: '1.1rem',
    color: '#444',
  },
  list: {
    marginLeft: '1.5rem',
    fontSize: '1.1rem',
    color: '#444',
    listStyleType: 'disc',
  },
  callToAction: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0D47A1',
    marginTop: '1.5rem',
    textAlign: 'center',
  },
};

export default About;
