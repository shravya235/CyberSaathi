import React from 'react';
import styles from './Community.module.css';

// Sample data for experts
const experts = [
  {
    name: "Amit Sharma",
    email: "amit.sharma@email.com",
    linkedin: "https://www.linkedin.com/in/amitsharma/",
    avatar: "/default-avatar.png",
  },
  {
    name: "Priya Verma",
    email: "priya.verma@email.com",
    linkedin: "https://www.linkedin.com/in/priyaverma/",
    avatar: "/default-avatar.png",
  },
  {
    name: "Rohit Sen",
    email: "rohit.sen@email.com",
    linkedin: "https://www.linkedin.com/in/rohitsen/",
    avatar: "/default-avatar.png",
  },
  {
    name: "Maya Rao",
    email: "maya.rao@email.com",
    linkedin: "https://www.linkedin.com/in/mayarao/",
    avatar: "/default-avatar.png",
  },
  {
    name: "Arjun Patel",
    email: "arjun.patel@email.com",
    linkedin: "https://www.linkedin.com/in/arjunpatel/",
    avatar: "/default-avatar.png",
  },
];

export default function Community() {
  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>CyberSaathi</div>
        <div className={styles.links}>
          <a href="/">Home</a>
          <a href="/Contact">Contact</a>
          <a href="/Article">Article</a>
          <a href="/Profile">Profile</a>
        </div>
      </nav>

      {/* Main */}
      <h1 className={styles.heading}>Get in touch with CyberSecurity Experts</h1>
      <div className={styles.cardGrid}>
        {experts.map((expert, idx) => (
          <div className={styles.card} key={idx}>
            <img
              src={expert.avatar}
              alt={expert.name}
              className={styles.avatar}
            />
            <div>
              <div className={styles.name}>{expert.name}</div>
              <div className={styles.email}>{expert.email}</div>
              <div>
                <a className={styles.link} href={expert.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
