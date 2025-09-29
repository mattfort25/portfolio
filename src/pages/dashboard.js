import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import PortfolioPerformance from "../components/Dashboard/PortfolioPerformance";
import SandboxPortfolio from "../components/Dashboard/SandboxPortfolio";
import AllNews from "../components/Dashboard/AllNews";
import PortfolioHeatmap from "../components/Dashboard/PortfolioHeatmap";
import UpcomingEvents from "../components/Dashboard/UpcomingEvents";

export default function Dashboard() {
  const [totalValue, setTotalValue] = useState("XX,XXX");
  const [todaysChange, setTodaysChange] = useState("XXX.XX");
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [portfolioCompanies, setPortfolioCompanies] = useState([]);

  const updateDashboardValues = (newTotalValue, newTodaysChange) => {
    setTotalValue(newTotalValue);
    setTodaysChange(newTodaysChange);
  };

  const handleSimulationResults = (results) => {
    setSimulationResults(results);
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.appShell}>
        <div className={styles.sidebar}>
          <div className={styles.navCard}>
            <h6 className={styles.navHeader}>Navigation</h6>
            <div className={styles.navPills}>
              <a className={styles.navLinkActive}>Portfolio Overview</a>
              <a className={styles.navLink}>Portfolio Changes</a>
              <a className={styles.navLink}>Accounting Book View</a>
              <a className={styles.navLink}>Transactions</a>
              <a className={styles.navLink}>Reporting Console</a>
              <a className={styles.navLink}>Client Portal</a>
            </div>
          </div>
          <div className={styles.navCard}>
            <h6 className={styles.navHeader}>Accounts</h6>
            <div className={styles.mutedSmall}>
              Placeholder for account selection.
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <h1 className={styles.dashboardTitle}>Dashboard</h1>

          <div className={styles.kpiRow}>
            <div className={styles.kpiTile}>
              <h2 className={styles.kpiTitle}>Total Value</h2>
              <p className={styles.kpiValue}>${totalValue}</p>
            </div>
            <div className={styles.kpiTile}>
              <h2 className={styles.kpiTitle}>Todays Change</h2>
              <p className={styles.kpiValue}>${todaysChange}</p>
            </div>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.mainPanel}>
              <PortfolioPerformance
                selectedTicker={selectedTicker}
                simulationResults={simulationResults}
                portfolioCompanies={portfolioCompanies}
                onStockSelect={setSelectedTicker}
              />
              <SandboxPortfolio
                updateDashboardValues={updateDashboardValues}
                onStockSelect={setSelectedTicker}
                selectedTicker={selectedTicker}
                onSimulationComplete={handleSimulationResults}
                portfolioCompanies={portfolioCompanies}
                setPortfolioCompanies={setPortfolioCompanies}
              />
            </div>
            <div className={styles.rightPanel}>
              <PortfolioHeatmap />
              <AllNews selectedTicker={selectedTicker} />
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
