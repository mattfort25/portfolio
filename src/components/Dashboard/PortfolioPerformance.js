import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "../../styles/Dashboard/PortfolioPerformance.module.css";
import { getStockHistory } from "../../services";

const timeRanges = [
  { label: "1M", interval: "1d", range: "1mo" },
  { label: "3M", interval: "1d", range: "3mo" },
  { label: "6M", interval: "1d", range: "6mo" },
  { label: "1Y", interval: "1d", range: "1y" },
  { label: "YTD", interval: "1d", range: "ytd" },
];

const PortfolioPerformance = ({
  selectedTicker,
  simulationResults,
  portfolioCompanies,
  onStockSelect,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const simChartRef = useRef(null);
  const simChartInstance = useRef(null);
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
        const historyData = result.data;
        if (historyData.length === 0) {
          setChartMessage("No historical data available for this stock.");
          return;
        }

        const labels = historyData.map((item) => item.date);
        const dataPoints = historyData.map((item) => item.open);

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
                    maxTicksLimit: 6,
                  },
                },
                y: {
                  grid: { display: true },
                  ticks: {
                    display: true,
                    callback: (value) => "$" + value.toFixed(2),
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

  useEffect(() => {
    if (simChartInstance.current) {
      simChartInstance.current.destroy();
    }

    if (simulationResults && simulationResults.simulated_returns_preview) {
      const returns = simulationResults.simulated_returns_preview;
      const ctx = simChartRef.current.getContext("2d");

      const bins = 20;
      const minReturn = Math.min(...returns);
      const maxReturn = Math.max(...returns);
      const range = maxReturn - minReturn;
      const binSize = range / bins;

      const histogram = new Array(bins).fill(0);
      const labels = [];
      for (let i = 0; i < bins; i++) {
        const lowerBound = minReturn + i * binSize;
        const upperBound = lowerBound + binSize;
        labels.push(
          `${(lowerBound * 100).toFixed(1)}% to ${(upperBound * 100).toFixed(
            1
          )}%`
        );
      }

      returns.forEach((r) => {
        let binIndex = Math.floor((r - minReturn) / binSize);
        if (binIndex === bins) {
          binIndex--;
        }
        histogram[binIndex]++;
      });

      simChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Frequency",
              data: histogram,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
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
            title: {
              display: true,
              text: "Simulated Return Distribution (Next 21 Days)",
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  return context[0].label;
                },
                label: (context) => {
                  const frequency = context.raw;
                  const totalSimulations = returns.length;
                  const percentage = (
                    (frequency / totalSimulations) *
                    100
                  ).toFixed(2);
                  return `This outcome occurred in ${percentage}% of simulations. The wider the graph, the more volatile your portfolio.`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Return %",
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45,
              },
            },
            y: {
              title: {
                display: true,
                text: "Frequency",
              },
            },
          },
        },
      });
    }
  }, [simulationResults]);

  return (
    <div className={styles.portfolioPerformanceCard}>
      <h2 className={styles.cardHeader}>Portfolio Performance</h2>

      <div className={styles.stockBadges}>
        {portfolioCompanies && portfolioCompanies.length > 0 ? (
          portfolioCompanies.map((company) => (
            <div
              key={company.ticker}
              className={`${styles.stockBadge} ${
                selectedTicker === company.ticker ? styles.activeBadge : ""
              }`}
              onClick={() => onStockSelect(company.ticker)}
            >
              <span className={styles.badgeTicker}>{company.ticker}</span>
              <span
                className={`${styles.badgeChange} ${
                  company.dailyChange > 0
                    ? styles.positiveChange
                    : styles.negativeChange
                }`}
              >
                {company.dailyChange > 0 ? "▲" : "▼"}{" "}
                {Math.abs(company.dailyChange).toFixed(2)}%
              </span>
            </div>
          ))
        ) : (
          <p className={styles.noStocksMessage}>
            Add stocks in the sandbox portfolio to see them here.
          </p>
        )}
      </div>

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

      <div className={styles.simulationResults}>
        <h3 className={styles.cardHeader}>Simulation Results</h3>
        {simulationResults ? (
          <div className={styles.metrics}>
            <p>
              **VaR 95%**:{" "}
              <span>
                {(simulationResults.metrics.VaR_95 * 100).toFixed(2)}%
              </span>
            </p>
            <p>
              **CVaR 95%**:{" "}
              <span>
                {(simulationResults.metrics.CVaR_95 * 100).toFixed(2)}%
              </span>
            </p>
            <p>
              **Mean Return**:{" "}
              <span>
                {(simulationResults.metrics.mean_return * 100).toFixed(2)}%
              </span>
            </p>
          </div>
        ) : (
          <p className={styles.noResults}>
            **Run a simulation to see portfolio risk metrics.**
          </p>
        )}
      </div>

      <div className={styles.simulationChartContainer}>
        {simulationResults && simulationResults.simulated_returns_preview && (
          <canvas ref={simChartRef}></canvas>
        )}
      </div>
    </div>
  );
};

export default PortfolioPerformance;
