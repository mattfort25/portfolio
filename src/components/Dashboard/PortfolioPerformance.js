// src/components/Dashboard/PortfolioPerformance.js
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "../../styles/Dashboard/PortfolioPerformance.module.css";
import { getStockHistory } from "@/services";

const timeRanges = [
  { label: "1M", interval: "1d", range: "1mo" },
  { label: "3M", interval: "1d", range: "3mo" },
  { label: "6M", interval: "1d", range: "6mo" },
  { label: "1Y", interval: "1d", range: "1y" },
  { label: "YTD", interval: "1d", range: "ytd" },
];

const PortfolioPerformance = ({ selectedTicker }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);
  const [chartMessage, setChartMessage] = useState(
    "Select a stock to view its performance."
  );

  useEffect(() => {
    const fetchAndRenderChart = async () => {
      if (!selectedTicker) {
        setChartMessage("Select a stock to view its performance.");
        if (chartInstance.current) {
          chartInstance.current.destroy();
          chartInstance.current = null;
        }
        return;
      }
      setChartMessage("Loading chart data...");

      const result = await getStockHistory(
        selectedTicker,
        selectedRange.interval,
        selectedRange.range
      );

      if (result.success && result.data) {
        const historyData = Object.values(result.data);
        if (historyData.length === 0) {
          setChartMessage("No historical data available for this stock.");
          return;
        }

        // Extract dates & prices
        const labels = historyData.map((item) => item.Date);
        const dataPoints = historyData.map((item) => item.Open);

        // Always destroy old chart before creating a new one
        if (chartInstance.current) {
          chartInstance.current.destroy();
          chartInstance.current = null;
        }

        if (chartRef.current) {
          const ctx = chartRef.current.getContext("2d");
          chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
              labels,
              datasets: [
                {
                  label: `${selectedTicker} Price`,
                  data: dataPoints,
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
                legend: { display: false },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: {
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 6, // show fewer dates
                  },
                },
                y: {
                  grid: { display: true },
                  ticks: {
                    display: true,
                    callback: (value) => "$" + value.toFixed(2), // format as price
                  },
                },
              },
            },
          });
        }
        setChartMessage("");
      } else {
        setChartMessage(result.message || "Failed to load chart data.");
      }
    };

    fetchAndRenderChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedTicker, selectedRange]);

  return (
    <div className={styles.portfolioPerformanceCard}>
      <h2 className={styles.cardHeader}>Portfolio Performance</h2>
      <div className={styles.chartContainer}>
        {selectedTicker && <canvas ref={chartRef}></canvas>}
        {!selectedTicker && (
          <p className={styles.chartMessage}>{chartMessage}</p>
        )}
      </div>
      <div className={styles.timeRangeButtons}>
        {timeRanges.map((range) => (
          <button
            key={range.label}
            className={`${styles.timeButton} ${
              selectedRange.label === range.label ? styles.activeTimeButton : ""
            }`}
            onClick={() => setSelectedRange(range)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPerformance;
