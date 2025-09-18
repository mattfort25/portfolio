import Link from "next/link";
import styles from "../styles/CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>Take Control of Your Risk</h2>
        <p className={styles.lead}>
          Join forward-looking risk teams using Financial Profile to transform
          uncertainty into strategic advantage.
        </p>
        <Link href="/auth/signup" className={styles.ctaButton}>
          Register Now
        </Link>
      </div>
    </section>
  );
}
