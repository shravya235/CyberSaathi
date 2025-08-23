"use client";

import React from "react";

export default function Article() {
  return (
    <main style={styles.container}>
      <h1 style={styles.header}>Safety and Security in the Digital Age</h1>

      <section style={styles.section}>
        <h2 style={styles.subheader}>The Growing Challenge of Cyber Fraud in India</h2>
        <p style={styles.paragraph}>
          With cyber fraud cases rapidly increasing in India—from phishing emails and fake OTP calls to UPI scams and identity theft—different demographics such as students, professionals, homemakers, rural users, and senior citizens face unique risks and challenges.
        </p>
        <p style={styles.paragraph}>
          Your task is to design an innovative and adaptable platform that raises awareness, educates users, and empowers them to recognize, prevent, and respond to such threats.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheader}>Our Cyber Safety Mission</h2>
        <p style={styles.paragraph}>
          The solution should make cyber safety simple, relatable, and trustworthy, while remaining flexible enough to reach diverse groups.
        </p>
        <p style={styles.paragraph}>
          By educating and empowering users, we aim to reduce the risks posed by increasingly sophisticated cyberattacks and build a safer digital community for all.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheader}>Key Focus Areas</h2>
        <ul style={styles.list}>
          <li>Raising awareness through clear, accessible information tailored to all user groups.</li>
          <li>Providing tools and resources that enable recognition and prevention of cyber threats.</li>
          <li>Delivering timely, actionable updates on emerging cybercrime incidents.</li>
          <li>Fostering a trustworthy platform where users feel supported to report and respond to threats.</li>
        </ul>
      </section>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: "3rem auto",
    padding: "0 2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#1d1d1d",
    lineHeight: 1.6,
    backgroundColor: "#f9fbff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  header: {
    fontSize: "2.8rem",
    fontWeight: "700",
    color: "#0d47a1",
    marginBottom: "1.2rem",
    textAlign: "center",
  },
  section: {
    marginBottom: "2.2rem",
  },
  subheader: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#0a3c91",
    marginBottom: "0.8rem",
    borderBottom: "3px solid #0d47a1",
    paddingBottom: "0.3rem",
  },
  paragraph: {
    fontSize: "1.15rem",
    marginBottom: "1.2rem",
  },
  list: {
    fontSize: "1.15rem",
    paddingLeft: "1.25rem",
    listStyleType: "disc",
    color: "#333",
  },
};
