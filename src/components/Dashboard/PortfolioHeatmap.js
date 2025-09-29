import React from "react";

const mockHoldings = [
  { ticker: "GOOGL", value: 1500000 },
  { ticker: "MSFT", value: 1200000 },
  { ticker: "AAPL", value: 900000 },
  { ticker: "AMZN", value: 750000 },
  { ticker: "NVDA", value: 600000 },
  { ticker: "TSLA", value: 450000 },
  { ticker: "META", value: 300000 },
  { ticker: "JPM", value: 200000 },
  { ticker: "V", value: 150000 },
  { ticker: "HD", value: 100000 },
  { ticker: "INTC", value: 80000 },
  { ticker: "NFLX", value: 50000 },
];

const PortfolioHeatmap = () => {
  const styles = {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(15, 23, 32, 0.06)",
      padding: "20px",
      marginBottom: "20px",
    },
    navHeader: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#0f1720",
    },
    heatmapGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
      gap: "8px",
      padding: "8px",
    },
    heatmapTile: {
      borderRadius: "6px",
      padding: "8px",
      color: "white",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80px",
      textAlign: "center",
    },
  };

  const getColor = (value) => {
    const maxVal = Math.max(...mockHoldings.map((h) => h.value));
    const shade = Math.min(220, Math.floor((value / maxVal) * 220));
    return `rgb(${11 + shade}, ${35 + shade}, ${64 + shade})`;
  };

  return (
    <div style={styles.card}>
      <h6 style={styles.navHeader}>Portfolio Heatmap</h6>
      <div style={styles.heatmapGrid}>
        {mockHoldings.map((holding, index) => (
          <div
            key={index}
            style={{
              ...styles.heatmapTile,
              backgroundColor: getColor(holding.value),
            }}
          >
            {holding.ticker}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioHeatmap;
