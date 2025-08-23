import React from 'react';

export default function Article() {
  // Sample article data
  const article = {
    title: "Understanding Cybersecurity: Protecting Your Digital Life",
    author: "Niharika Niranjan",
    date: "August 23, 2025",
    content: [
      "Cybersecurity is essential in today's digital world. It involves protecting your computers, networks, and data from unauthorized access and attacks.",
      "This article covers important concepts such as recognizing phishing attempts, creating strong passwords, and keeping your software up to date.",
      "By staying informed and vigilant, you can reduce your risk of falling victim to cybercrime.",
      "Remember, cybersecurity is a shared responsibility - individuals and organizations must work together to create a safer online environment."
    ],
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>{article.title}</h1>
      <p style={styles.meta}>
        By <strong>{article.author}</strong> | {article.date}
      </p>

      <article style={styles.article}>
        {article.content.map((paragraph, idx) => (
          <p key={idx} style={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </article>
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
  title: {
    fontSize: '2.8rem',
    fontWeight: 700,
    marginBottom: '0.3rem',
    color: '#0D47A1',
  },
  meta: {
    fontSize: '1rem',
    marginBottom: '2rem',
    fontWeight: 500,
    color: '#4a6fa5',
  },
  article: {
    fontSize: '1.18rem',
    lineHeight: 1.7,
  },
  paragraph: {
    marginBottom: '1.2rem',
  },
};
