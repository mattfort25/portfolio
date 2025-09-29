import styles from "../styles/Benefits.module.css";

export default function Benefits() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Use Cases / Who It&apos;t For</h2>
          <p className={styles.subtitle}>
            Metanym supports professionals across sectors where geopolitical
            clarity is critical:
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-building"></i>
            </div>
            <h3>Businesses</h3>
            <p>
              Anticipate supply chain disruptions and market-entry risks. Stay
              ahead of regulatory changes and political instability that could
              impact operations.
            </p>
            <div className={styles.useCase}>
              <strong>Key Benefits:</strong> Supply chain resilience, market
              intelligence, regulatory compliance
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Financial Institutions</h3>
            <p>
              Evaluate investment exposures and monitor sanctions regimes.
              Assess country risk and political stability for informed
              decision-making.
            </p>
            <div className={styles.useCase}>
              <strong>Key Benefits:</strong> Risk assessment, compliance
              monitoring, investment intelligence
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-handshake"></i>
            </div>
            <h3>Policy & NGOs</h3>
            <p>
              Plan humanitarian responses and track regional instability.
              Monitor conflict zones and assess intervention opportunities.
            </p>
            <div className={styles.useCase}>
              <strong>Key Benefits:</strong> Crisis response planning,
              humanitarian intelligence, policy analysis
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>Academia & Analysts</h3>
            <p>
              Access structured data for research and long-term analysis. Build
              comprehensive datasets for academic and policy research.
            </p>
            <div className={styles.useCase}>
              <strong>Key Benefits:</strong> Research data, trend analysis,
              academic collaboration
            </div>
          </div>
        </div>

        <div className={styles.methodology}>
          <h3>Technology & Methodology</h3>
          <p>
            Metanym integrates trusted open-source intelligence, financial
            indicators, and regional reporting into a single platform. Our
            methodology blends AI-driven analysis with expert validation,
            ensuring accuracy, reliability, and context. By uniting real-time
            updates with historical archives, we deliver a balanced perspective
            that empowers strategic decision-making.
          </p>
        </div>
      </div>
    </section>
  );
}
