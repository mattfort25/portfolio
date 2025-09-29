// pages/about.js
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Us – Metanym</title>
        <meta
          name="description"
          content="Learn about Metanym's mission to make sense of the world's complexity through actionable geopolitical intelligence."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>About us</h1>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.content}>
              {/* Mission Section */}
              <div className={styles.missionSection}>
                <h2 className={styles.sectionTitle}>
                  <strong>About Metanym</strong>
                </h2>
                <p className={styles.missionText}>
                  Metanym was built with a clear mission: to make sense of the
                  world&apos;s complexity. We believe that actionable
                  geopolitical intelligence should be accessible, structured,
                  and grounded in both real-time signals and historical context.
                  Whether for risk management, strategy, or awareness, Metanym
                  is designed to help users move from uncertainty to clarity.
                </p>
              </div>

              {/* Trust & Credibility Section */}
              <div className={styles.trustSection}>
                <h3 className={styles.subsectionTitle}>Trust & Credibility</h3>
                <p className={styles.trustText}>
                  We know that decisions demand confidence. That&apos;s why
                  Metanym emphasizes transparency in sourcing, clarity in
                  methodology, and rigor in analysis. Our platform provides case
                  studies, sample reports, and ongoing thought leadership so
                  users can see the intelligence in action before they act on
                  it.
                </p>
              </div>

              {/* Call to Action Section */}
              <div className={styles.ctaSection}>
                <h3 className={styles.subsectionTitle}>Call to Action</h3>
                <p className={styles.ctaText}>
                  Discover how Metanym can transform the way you navigate global
                  complexity.
                </p>

                <div className={styles.ctaButtons}>
                  <Link href="/auth/signup" className={styles.ctaButton}>
                    <i className="fas fa-envelope"></i>
                    Request a demo
                  </Link>
                  <Link href="/dashboard" className={styles.ctaButton}>
                    <i className="fas fa-chart-line"></i>
                    View a sample dashboard
                  </Link>
                  <Link href="/auth/signup" className={styles.ctaButton}>
                    <i className="fas fa-bell"></i>
                    Subscribe for updates
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className={styles.additionalInfo}>
          <div className={styles.container}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-globe-americas"></i>
                </div>
                <h4>Global Coverage</h4>
                <p>
                  Comprehensive intelligence coverage across all major regions
                  and emerging markets, providing insights that matter to your
                  operations.
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4>Enterprise Security</h4>
                <p>
                  Built with enterprise-grade security and compliance standards,
                  ensuring your sensitive intelligence remains protected and
                  confidential.
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-brain"></i>
                </div>
                <h4>AI-Powered Analysis</h4>
                <p>
                  Advanced machine learning algorithms process vast amounts of
                  data to identify patterns and provide actionable insights for
                  strategic decision-making.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
