// src/components/Dashboard/ReportingConsole.js
import React, { useState, useEffect } from "react";
import styles from "../../styles/ReportingConsole.module.css";
import { getReportingData, downloadReport } from "../../services";

const ReportingConsole = () => {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReportData();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [searchTerm, sortConfig, reportData]);

  const fetchReportData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await getReportingData();
      if (result.success) {
        setReportData(result.data);
        setFilteredData(result.data);
      } else {
        setError(result.message || "Failed to fetch reporting data.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortData = () => {
    let filtered = [...reportData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (
          sortConfig.key === "price" ||
          sortConfig.key === "dailyChange" ||
          sortConfig.key === "shares"
        ) {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(filtered);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDownload = async (format) => {
    setIsLoading(true);
    try {
      const result = await downloadReport(format, filteredData);
      if (result.success) {
        // Create a download link
        const blob = new Blob([result.data], {
          type: result.mimeType,
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `portfolio_report_${
          new Date().toISOString().split("T")[0]
        }.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError(result.message || "Failed to download report.");
      }
    } catch (err) {
      setError("An error occurred during download.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <i className="fa-solid fa-sort"></i>;
    }
    return sortConfig.direction === "asc" ? (
      <i className="fa-solid fa-sort-up"></i>
    ) : (
      <i className="fa-solid fa-sort-down"></i>
    );
  };

  const calculateTotals = () => {
    const totalValue = filteredData.reduce(
      (sum, item) =>
        sum + (parseFloat(item.price) * parseFloat(item.shares) || 0),
      0
    );
    const totalShares = filteredData.reduce(
      (sum, item) => sum + (parseInt(item.shares, 10) || 0),
      0
    );
    return { totalValue, totalShares };
  };

  const totals = calculateTotals();

  return (
    <div className={styles.reportingConsole}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reporting Console</h1>
        <p className={styles.subtitle}>
          Comprehensive portfolio analysis and reporting
        </p>
      </div>

      <div className={styles.controlBar}>
        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Search by ticker or company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.actionSection}>
          <button
            onClick={fetchReportData}
            className={styles.refreshButton}
            disabled={isLoading}
          >
            <i className="fa-solid fa-refresh"></i>
            Refresh
          </button>
          <div className={styles.downloadButtons}>
            <button
              onClick={() => handleDownload("csv")}
              className={styles.downloadButton}
              disabled={isLoading || filteredData.length === 0}
            >
              <i className="fa-solid fa-file-csv"></i>
              CSV
            </button>
            <button
              onClick={() => handleDownload("xlsx")}
              className={styles.downloadButton}
              disabled={isLoading || filteredData.length === 0}
            >
              <i className="fa-solid fa-file-excel"></i>
              Excel
            </button>
            <button
              onClick={() => handleDownload("pdf")}
              className={styles.downloadButton}
              disabled={isLoading || filteredData.length === 0}
            >
              <i className="fa-solid fa-file-pdf"></i>
              PDF
            </button>
          </div>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Holdings:</span>
          <span className={styles.statValue}>{filteredData.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Shares:</span>
          <span className={styles.statValue}>
            {totals.totalShares.toLocaleString()}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Portfolio Value:</span>
          <span className={styles.statValue}>
            $
            {totals.totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading reporting data...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fa-solid fa-chart-line"></i>
            <p>No portfolio data available</p>
            <span>Add assets to your portfolio to see reporting data</span>
          </div>
        ) : (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  Company {getSortIcon("name")}
                </th>
                <th onClick={() => handleSort("ticker")}>
                  Ticker {getSortIcon("ticker")}
                </th>
                <th onClick={() => handleSort("price")}>
                  Price {getSortIcon("price")}
                </th>
                <th onClick={() => handleSort("dailyChange")}>
                  Daily Change {getSortIcon("dailyChange")}
                </th>
                <th onClick={() => handleSort("shares")}>
                  Shares {getSortIcon("shares")}
                </th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  <td className={styles.companyName}>{item.name}</td>
                  <td className={styles.ticker}>{item.ticker}</td>
                  <td className={styles.price}>
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                  <td
                    className={styles.dailyChange}
                    style={{
                      color: item.dailyChange >= 0 ? "#10b981" : "#ef4444",
                    }}
                  >
                    {item.dailyChange >= 0 ? "+" : ""}
                    {parseFloat(item.dailyChange).toFixed(2)}%
                  </td>
                  <td className={styles.shares}>
                    {item.shares.toLocaleString()}
                  </td>
                  <td className={styles.totalValue}>
                    ${(item.price * item.shares).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className={styles.totalsRow}>
                <td colSpan="4">
                  <strong>Totals</strong>
                </td>
                <td>
                  <strong>{totals.totalShares.toLocaleString()}</strong>
                </td>
                <td>
                  <strong>
                    $
                    {totals.totalValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportingConsole;
