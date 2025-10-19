import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles/EarningsCalendar.module.css";
import { getPortfolioEarnings } from "../../services";

const EarningsCalendar = ({ portfolioCompanies }) => {
  const [earnings, setEarnings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEarnings = useCallback(async () => {
    if (!portfolioCompanies || portfolioCompanies.length === 0) {
      setEarnings([]);
      setIsLoading(true);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tickers = portfolioCompanies.map((c) => c.ticker);
      console.log("Fetching earnings for:", tickers);

      const result = await getPortfolioEarnings(tickers);

      if (result.success) {
        const validEarnings = (result.data || []).filter(
          (e) => e && e.earningsDate
        );
        setEarnings(validEarnings);
        console.log("Earnings fetched:", validEarnings);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error fetching earnings:", err);
      setError("Failed to load earnings calendar");
    } finally {
      setIsLoading(false);
    }
  }, [portfolioCompanies]); // dependency for the callback

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  const formatDate = (dateString) => {
    if (!dateString) return { month: "TBD", day: "?", year: "" };

    try {
      const date = new Date(dateString);
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const day = date.getDate();
      const year = date.getFullYear();
      return { month, day, year };
    } catch (error) {
      return { month: "TBD", day: "?", year: "" };
    }
  };

  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (isLoading) {
    return (
      <div className={styles.earningsCard}>
        <h2 className={styles.cardHeader}>
          <i className="fa-solid fa-calendar-days"></i>
          Earnings Calendar
        </h2>
        <div className={styles.loadingState}>
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Loading earnings data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.earningsCard}>
        <h2 className={styles.cardHeader}>
          <i className="fa-solid fa-calendar-days"></i>
          Earnings Calendar
        </h2>
        <div className={styles.errorState}>
          <i className="fa-solid fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={fetchEarnings} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (earnings.length === 0) {
    return (
      <div className={styles.earningsCard}>
        <h2 className={styles.cardHeader}>
          <i className="fa-solid fa-calendar-days"></i>
          Earnings Calendar
        </h2>
        <div className={styles.emptyState}>
          <i className="fa-solid fa-calendar-xmark"></i>
          <p>No upcoming earnings</p>
          <span className={styles.emptySubtext}>
            {portfolioCompanies.length === 0
              ? "Add stocks to your portfolio to see earnings dates"
              : "No earnings scheduled in the next 3 months"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.earningsCard}>
      <h2 className={styles.cardHeader}>
        <i className="fa-solid fa-calendar-days"></i>
        Earnings Calendar
      </h2>
      <p className={styles.subtitle}>Based on your portfolio stocks</p>

      <div className={styles.earningsList}>
        {earnings.map((earning, index) => {
          const dateInfo = formatDate(earning.earningsDate);
          const todayFlag = isToday(earning.earningsDate);
          const pastFlag = isPast(earning.earningsDate);

          return (
            <div
              key={`${earning.ticker}-${index}`}
              className={`${styles.earningItem} ${
                todayFlag ? styles.today : ""
              } ${pastFlag ? styles.past : ""}`}
            >
              <div className={styles.dateBox}>
                <div className={styles.month}>
                  {dateInfo.month.toUpperCase()}
                </div>
                <div className={styles.day}>{dateInfo.day}</div>
              </div>

              <div className={styles.earningDetails}>
                <div className={styles.companyName}>
                  {earning.companyName || earning.ticker}
                </div>
                <div className={styles.dateTime}>
                  {dateInfo.month} {dateInfo.day}, {dateInfo.year}
                  {todayFlag && (
                    <span className={styles.todayBadge}>Today</span>
                  )}
                </div>
                {earning.estimate && (
                  <div className={styles.estimate}>
                    Est. EPS: ${parseFloat(earning.estimate).toFixed(2)}
                  </div>
                )}
              </div>

              <div className={styles.calendarIcon}>
                <i className="fa-regular fa-calendar-plus"></i>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <small>Powered by AlphaVantage</small>
      </div>
    </div>
  );
};

export default EarningsCalendar;
