import styles from "../styles/Benefits.module.css";

export default function Benefits() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Why Leading Enterprises Choose Financial Profile
        </h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-project-diagram"></i>
            </div>
            <h5>Unified Risk Intelligence</h5>
            <p>
              Fuse financial data, news, and qualitative risks into a single
              source of truth—no more siloed spreadsheets or blind spots.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-bolt"></i>
            </div>
            <h5>Critical Insights</h5>
            <p>
              Gain access to exclusive, critical insights into leading political
              and economic developments.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h5>Enterprise‑Grade Trust</h5>
            <p>
              SOC‑2 ready, battle‑tested architecture designed for security,
              compliance, and global scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
