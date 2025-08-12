import styles from "../styles/Hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Elevate Your Investing Game.
          <br />
          Track, Analyze, Succeed.
        </h1>
        <p className={styles.subtitle}>
          Get a comprehensive view of your portfolio performance, real-time
          market news, and manage your investments effortlessly. Join thousands
          of smart investors today.
        </p>
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h2>Portfolio Performance</h2>
            <p>
              Visualize your gains and losses with clear, interactive charts.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h2>Real-time Market News</h2>
            <p>
              Stay ahead of the curve with the latest headlines and insights.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h2>Sandbox Trading</h2>
            <p>Practice and test your strategies without any risk.</p>
          </div>
        </div>
        <button className={styles.ctaButton}>Sign Up Now & Get Started</button>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/dashboard.png"
            alt="A sleek, modern investment dashboard"
            width={800}
            height={600}
            layout="responsive"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
