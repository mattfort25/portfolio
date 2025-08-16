import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "../../styles/Dashboard/PortfolioPerformance.module.css";

const PortfolioPerformance = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy existing chart before creating a new one
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          datasets: [
            {
              label: "Portfolio Value",
              data: [10000, 10500, 10200, 11000, 10800, 11500, 11200, 12000],
              borderColor: "#0070f3",
              backgroundColor: "rgba(0, 112, 243, 0.1)",
              fill: true,
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.portfolioPerformanceCard}>
      <h2 className={styles.cardHeader}>Portfolio Performance</h2>
      <div className={styles.chartContainer}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className={styles.timeRangeButtons}>
        <button className={styles.timeButton}>1D</button>
        <button className={styles.timeButton}>1W</button>
        <button className={styles.timeButton}>1M</button>
        <button className={styles.timeButton}>YTD</button>
        <button className={styles.timeButton}>M</button>{" "}
      </div>
    </div>
  );
};

export default PortfolioPerformance;
