// src/pages/dashboard.js
import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import { useState } from "react";
import PortfolioPerformance from "../components/Dashboard/PortfolioPerformance";
import SandboxPortfolio from "../components/Dashboard/SandboxPortfolio";
import AllNews from "../components/Dashboard/AllNews";

export default function Dashboard() {
  const [totalValue, setTotalValue] = useState("XX,XXX");
  const [todaysChange, setTodaysChange] = useState("XXX.XX");
  const [selectedTicker, setSelectedTicker] = useState(null);

  const updateDashboardValues = (newTotalValue, newTodaysChange) => {
    setTotalValue(newTotalValue);
    setTodaysChange(newTodaysChange);
  };

  return (
    <>
      <Head>
        <title>Dashboard | Financial profile</title>
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
          <PortfolioPerformance selectedTicker={selectedTicker} />
          <div className={styles.valueAndNewsSection}>
            <div className={styles.totalValueCard}>
              <h2 className={styles.cardHeader}>Total Value</h2>
              <p className={styles.valueText}>${totalValue}</p>
            </div>
            <div className={styles.todaysChangeCard}>
              <h2 className={styles.cardHeader}>Todays Change</h2>
              <p className={styles.valueText}>${todaysChange}</p>
            </div>
            <AllNews selectedTicker={selectedTicker} />{" "}
          </div>
        </div>

        <div className={styles.bottomSection}>
          <SandboxPortfolio
            updateDashboardValues={updateDashboardValues}
            onStockSelect={setSelectedTicker}
            selectedTicker={selectedTicker}
          />
        </div>
      </div>
    </>
  );
}
