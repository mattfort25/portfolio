// pages/dashboard.js
import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import PortfolioPerformance from "../components/Dashboard/PortfolioPerformance";
import SandboxPortfolio from "../components/Dashboard/SandboxPortfolio";
import AllNews from "../components/Dashboard/AllNews";
import PortfolioHeatmap from "../components/Dashboard/PortfolioHeatmap";
import UpcomingEvents from "../components/Dashboard/UpcomingEvents";
import ReportingConsole from "../components/Dashboard/ReportingConsole";
import EarningsCalendar from "../components/Dashboard/EarningsCalendar";

export default function Dashboard() {
  const [totalValue, setTotalValue] = useState("XX,XXX");
  const [todaysChange, setTodaysChange] = useState("XXX.XX");
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [portfolioCompanies, setPortfolioCompanies] = useState([]);
  const [activeView, setActiveView] = useState("overview");

  const updateDashboardValues = (newTotalValue, newTodaysChange) => {
    setTotalValue(newTotalValue);
    setTodaysChange(newTodaysChange);
  };

  const handleSimulationResults = (results) => {
    setSimulationResults(results);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "overview":
        return (
          <>
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
                <EarningsCalendar portfolioCompanies={portfolioCompanies} />
                <UpcomingEvents />
              </div>
            </div>
          </>
        );

      case "reporting":
        return <ReportingConsole />;

      case "changes":
        return (
          <div className={styles.comingSoon}>
            <i className="fa-solid fa-chart-line"></i>
            <h2>Portfolio Changes</h2>
            <p>This feature is coming soon!</p>
          </div>
        );

      case "accounting":
        return (
          <div className={styles.comingSoon}>
            <i className="fa-solid fa-book"></i>
            <h2>Accounting Book View</h2>
            <p>This feature is coming soon!</p>
          </div>
        );

      case "transactions":
        return (
          <div className={styles.comingSoon}>
            <i className="fa-solid fa-receipt"></i>
            <h2>Transactions</h2>
            <p>This feature is coming soon!</p>
          </div>
        );

      case "client":
        return (
          <div className={styles.comingSoon}>
            <i className="fa-solid fa-users"></i>
            <h2>Client Portal</h2>
            <p>This feature is coming soon!</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | Financial Profile</title>
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
            <div className={styles.navPills}>
              <a
                className={
                  activeView === "overview"
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={() => setActiveView("overview")}
              >
                Portfolio Overview
              </a>
              <a
                className={
                  activeView === "changes"
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={() => setActiveView("changes")}
              >
                Portfolio Changes
              </a>
              <a
                className={
                  activeView === "accounting"
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={() => setActiveView("accounting")}
              >
                Accounting Book View
              </a>
              <a
                className={
                  activeView === "transactions"
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={() => setActiveView("transactions")}
              >
                Transactions
              </a>
              <a
                className={
                  activeView === "reporting"
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={() => setActiveView("reporting")}
              >
                Reporting Console
              </a>
              <a
                className={
                  activeView === "client"
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={() => setActiveView("client")}
              >
                Client Portal
              </a>
            </div>
          </div>
          <div className={styles.navCard}>
            <h6 className={styles.navHeader}>Accounts</h6>
            <div className={styles.mutedSmall}>
              Placeholder for account selection.
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>{renderMainContent()}</div>
      </div>
    </>
  );
}
