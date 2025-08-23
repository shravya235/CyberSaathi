"use client";

import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import styles from "./signupForm.module.css";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      setMessage(
        "Signup successful! Verification email sent. Please check your inbox."
      );

      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("Successfully signed up with Google!");
      // Redirect logic here if needed
      router.push("/Home");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className={styles.formContainer}>
      <h2>Create an Account</h2>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className={styles.googleButton}
        disabled={loading}
      >
        <image
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
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        autoComplete="new-password"
        className={styles.inputField}
      />

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}

      <p className={styles.passwordHint}>
        Password should be at least 6 characters for security.
      </p>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#0070f3", cursor: "pointer", fontWeight: "600" }}
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
