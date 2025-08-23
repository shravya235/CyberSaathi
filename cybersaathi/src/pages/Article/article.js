"use client";

import React, { useState, useEffect } from 'react';

const safetyTips = [
  "Beware of phishing emails targeting your personal info.",
  "Keep your software and antivirus up to date.",
  "Use strong, unique passwords and enable two-factor authentication.",
  "Avoid clicking unknown links especially from untrusted sources.",
  "Regularly back up critical data securely.",
];

export default function Article() {
  const [threatFeed, setThreatFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchThreatFeed = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch('/api/threats');
      if (!response.ok) throw new Error("Failed to fetch threat feed");
      const data = await response.json();
      setThreatFeed(data.recentThreats || []);
      setLoading(false);
    } catch (e) {
      setError("Failed to load threat feed");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreatFeed();
    const interval = setInterval(fetchThreatFeed, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={styles.container}>
      {/* Threat Feed Section */}
      <section style={styles.feedSection}>
        <h2 style={styles.feedTitle}>Live Cybercrime Threat Intelligence Feed</h2>
        {loading && <p>Loading recent threats...</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
        {!loading && !error && threatFeed.length === 0 && <p>No recent threats found.</p>}

        {!loading && !error && (
          <ul style={styles.feedList}>
            {threatFeed.map((incident, idx) => (
              <li key={idx} style={styles.feedItem}>
                <strong>{incident.type || "Threat"}</strong>:{" "}
                {incident.description || incident.title || "Details unavailable."}
                {incident.date && (
                  <span style={styles.feedDate}>{incident.date}</span>
                )}
              </li>
            ))}
          </ul>
        )}

        <div style={styles.tipsBox}>
          <h3>Actionable Safety Tips</h3>
          <ul>
            {safetyTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: '3rem auto',
    padding: '0 1.5rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#222',
  },
  feedSection: {
    backgroundColor: "#f0f4ff",
    borderRadius: "12px",
    padding: "1.5rem 2rem",
    boxShadow: "0 4px 20px rgba(13,64,128,0.15)",
  },
  feedTitle: {
    color: "#0D47A1",
    fontWeight: "700",
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  feedList: {
    listStyleType: "none",
    paddingLeft: 0,
    marginBottom: "1.5rem",
  },
  feedItem: {
    backgroundColor: "white",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    marginBottom: "0.75rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  feedDate: {
    display: "block",
    fontSize: "0.85rem",
    color: "#607d8b",
    marginTop: "0.3rem",
  },
  tipsBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "1rem 1.5rem",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
};
