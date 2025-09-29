// components/Hero.js
import Link from "next/link";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Smarter Enterprise{"  "}
            <br></br>
            <span className={styles.highlight}>Risk Management</span>
          </h1>
          <h2 className={styles.subtitle}>
            Make decisions with confidence in the moments that matter.
          </h2>

          <div className={styles.description}>
            <p>
              <strong>
                Actionable geopolitical intelligence at your fingertips.
              </strong>
              Metanym transforms complex global events into clear, structured
              insights. With real-time monitoring, interactive visualizations,
              and risk assessments, our dashboard equips decision-makers with
              the intelligence needed to anticipate challenges and seize
              opportunities.
            </p>
          </div>

          <div className={styles.ctaSection}>
            <Link href="/demo" className={styles.ctaButton}>
              Request a Demo
            </Link>
            <Link href="/auth/login" className={styles.secondaryButton}>
              Sign In
            </Link>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>
                Trusted by Global Organizations
              </span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeText}>
                Enterprise-Grade Security
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
