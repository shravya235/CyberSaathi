"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful! Redirecting...");
      // Example: Redirect to homepage after login
      router.push("/Home");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("Successfully logged in with Google!");
      router.push("/Home");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className={styles.formContainer}>
      <h2>Login to Your Account</h2>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className={styles.googleButton}
        disabled={loading}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
        />
        Continue with Google
      </button>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        className={styles.inputField}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        className={styles.inputField}
      />

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "#0070f3", cursor: "pointer", fontWeight: "600" }}
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
