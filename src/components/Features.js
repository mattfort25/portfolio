import styles from "../styles/Features.module.css";

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Platform Capabilities</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-chart-line"></i>
            </div>
            <h6>Dynamic Risk Scoring</h6>
            <p>
              Continuously updated, explainable risk scores for every position,
              asset, and exposure.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-tachometer-alt"></i>
            </div>
            <h6>Interactive Dashboards</h6>
            <p>
              Scenario analysis, drill‑downs, and portfolio views designed for
              analysts and executives.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-plug"></i>
            </div>
            <h6>Open, Modular API</h6>
            <p>
              Integrate risk intelligence into trading systems, dashboards, or
              custom apps with ease.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-sync-alt"></i>
            </div>
            <h6>Automated Data Ingestion</h6>
            <p>
              Streaming updates from global markets, ESG sources, and breaking
              news keep your view current.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
