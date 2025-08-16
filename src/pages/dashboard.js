import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import PortfolioPerformance from "../components/Dashboard/PortfolioPerformance";
import SandboxPortfolio from "../components/Dashboard/SandboxPortfolio";
import AllNews from "../components/Dashboard/AllNews";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Personal Lending</title>
        <meta
          name="description"
          content="Your personal investment dashboard."
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </Head>

      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>

        <div className={styles.topSection}>
          <PortfolioPerformance />
          <div className={styles.valueAndNewsSection}>
            <div className={styles.totalValueCard}>
              <h2 className={styles.cardHeader}>Total Value</h2>
              <p className={styles.valueText}>$XX,XXX</p>
            </div>
            <div className={styles.todaysChangeCard}>
              <h2 className={styles.cardHeader}>Today's Change</h2>
              <p className={styles.valueText}>$XXX.XX</p>
            </div>
            <AllNews />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <SandboxPortfolio />
        </div>
      </div>
    </>
  );
}
