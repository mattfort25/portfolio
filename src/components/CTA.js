// import Link from "next/link";
// import styles from "../styles/CTA.module.css";

// export default function CTA() {
//   return (
//     <section className={styles.section}>
//       <div className={styles.container}>
//         <h2>Take Control of Your Risk</h2>
//         <p className={styles.lead}>
//           Join forward-looking risk teams using Financial Profile to transform
//           uncertainty into strategic advantage.
//         </p>
//         <Link href="/auth/signup" className={styles.ctaButton}>
//           Register Now
//         </Link>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import styles from "../styles/CTA.module.css";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
      setFeedback("Thank you — your request has been received.");
      setFeedbackType("success");
      setEmail("");
    } else {
      setFeedback("Please enter a valid business email address.");
      setFeedbackType("error");
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
          />
          <button type="submit" className={styles.submitBtn}>
            Request Access
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
