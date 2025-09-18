// components/Hero.js
import Link from "next/link";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Smarter Enterprise Risk Management</h1>
        <p className={styles.subtitle}>
          Financial Profile helps you see around corners, quantify exposures,
          and act with confidence.
        </p>
        <Link href="/auth/signup" className={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </section>
  );
}
