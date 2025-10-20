// src/components/CTA.js
import { useState } from "react";
import styles from "../styles/CTA.module.css";
import { subscribeEmail } from "../services";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFeedback("Please enter a valid business email address.");
      setFeedbackType("error");
      return;
    }

    setIsLoading(true);
    try {
      const result = await subscribeEmail(email);

      if (result.success) {
        setFeedback(result.message);
        setFeedbackType("success");
        setEmail("");
      } else {
        setFeedback(result.message);
        setFeedbackType("error");
      }
    } catch (error) {
      console.error("CTA submission failed:", error);
      setFeedback("An unexpected error occurred. Please try again.");
      setFeedbackType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.leadSection}>
      <div className={styles.container}>
        <h2>Stay Ahead of Global Risk</h2>
        <p className={styles.lead}>
          Join senior strategists and analysts who rely on Metanym Risk to
          transform uncertainty into clarity. Subscribe for briefings,
          early-access tools, and deep insights into geopolitical risk.
        </p>

        <form onSubmit={handleSubmit} className={styles.emailForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.emailInput}
            placeholder="Enter your business email"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Request Access"}{" "}
          </button>
        </form>

        {feedback && (
          <div className={`${styles.feedback} ${styles[feedbackType]}`}>
            {feedback}
          </div>
        )}
      </div>
    </section>
  );
}
