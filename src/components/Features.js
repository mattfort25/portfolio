import styles from "../styles/Features.module.css";

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Features & Capabilities</h2>
          <p className={styles.subtitle}>
            Metanym connects critical data, processes, and people to deliver
            dynamic insights and unparalleled context.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-broadcast-tower"></i>
            </div>
            <h3>Real-Time Monitoring</h3>
            <p>
              Stay ahead of breaking developments with live event tracking and
              curated alerts. Get instant notifications on geopolitical shifts
              that matter to your operations.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-globe-americas"></i>
            </div>
            <h3>Interactive Visualization</h3>
            <p>
              Explore regional dynamics through maps, timelines, and comparative
              dashboards. Visualize complex geopolitical relationships and
              trends at a glance.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Risk Assessment Tools</h3>
            <p>
              Access scenario modeling, stability indexes, and tailored impact
              scoring to measure exposure. Quantify geopolitical risks with
              precision and confidence.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-history"></i>
            </div>
            <h3>Historical Context</h3>
            <p>
              Navigate decades of geopolitical data to uncover trends and
              patterns. Learn from the past to better predict future
              developments.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-cogs"></i>
            </div>
            <h3>Custom Insights</h3>
            <p>
              Personalize your dashboard to focus on regions, sectors, or issues
              that matter most. Tailor intelligence to your specific needs and
              priorities.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI-Driven Analysis</h3>
            <p>
              Leverage advanced analytics and machine learning to identify
              patterns and predict outcomes. Transform raw data into actionable
              strategic intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
