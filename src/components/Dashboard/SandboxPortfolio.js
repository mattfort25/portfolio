// src/components/Dashboard/SandboxPortfolio.js
import React, { useState, useEffect } from "react";
import styles from "../../styles/Dashboard/SandboxPortfolio.module.css";
import { getStockDetails } from "@/services";

const SandboxPortfolio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [portfolioCompanies, setPortfolioCompanies] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
      if (searchTerm.trim() === "") {
        setSearchMessage("Please enter a stock name or ticker.");
        setSearchResults([]);
        return;
      }

      setSearchMessage("Searching...");
      const result = await getStockDetails(searchTerm.trim());

      if (result.success && result.data) {
        setSearchResults([
          {
            name:
              result.data.displayName ||
              result.data.longName ||
              result.data.shortName,
            ticker: result.data.symbol,
            price: result.data.regularMarketPrice
              ? `$${result.data.regularMarketPrice.toFixed(2)}`
              : "N/A",
            dailyChange: result.data.regularMarketChangePercent
              ? `${result.data.regularMarketChangePercent.toFixed(2)}%`
              : "N/A",
          },
        ]);
        setSearchMessage("");
      } else {
        setSearchResults([]);
        setSearchMessage(
          result.message || "Could not find stock. Try a different name/ticker."
        );
      }
    }
  };

  const addCompanyToPortfolio = (company) => {
    if (!portfolioCompanies.some((pc) => pc.ticker === company.ticker)) {
      setPortfolioCompanies((prevCompanies) => [
        ...prevCompanies,
        { ...company, shares: 1 },
      ]);
      setSearchTerm("");
      setSearchResults([]);
      setSearchMessage("");
    } else {
      setSearchMessage("Company already in portfolio.");
    }
  };

  const removeCompanyFromPortfolio = (tickerToRemove) => {
    setPortfolioCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.ticker !== tickerToRemove)
    );
  };

  const calculatePortfolioSummary = () => {
    let totalValue = 0;
    let todaysChange = 0;

    portfolioCompanies.forEach((company) => {
      const price = parseFloat(company.price.replace("$", ""));
      const dailyChange = parseFloat(company.dailyChange.replace("%", ""));
      const shares = company.shares || 1;

      if (!isNaN(price) && !isNaN(shares)) {
        totalValue += price * shares;
        if (!isNaN(dailyChange)) {
          todaysChange += price * (dailyChange / 100) * shares;
        }
      }
    });

    return {
      totalValue: totalValue.toFixed(2),
      todaysChange: todaysChange.toFixed(2),
    };
  };

  const portfolioSummary = calculatePortfolioSummary();

  return (
    <div className={styles.sandboxPortfolioCard}>
      <h2 className={styles.cardHeader}>Sandbox Portfolio</h2>
      <div className={styles.searchBar}>
        <i className="fa-solid fa-search"></i>
        <input
          type="text"
          placeholder="Search for a stock (e.g., Apple or AAPL)"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleSearch}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>{" "}
      </div>

      {searchMessage && <p className={styles.searchMessage}>{searchMessage}</p>}

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          <p className={styles.searchResultsTitle}>Search Results:</p>
          {searchResults.map((company, index) => (
            <div
              key={company.ticker + index}
              className={styles.searchResultItem}
            >
              <span>
                {company.name} ({company.ticker}) - {company.price}{" "}
                {company.dailyChange}
              </span>
              <button
                onClick={() => addCompanyToPortfolio(company)}
                className={styles.addButton}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Display Portfolio Summary */}
      <div className={styles.portfolioSummary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Total Value:</span>
          <span className={styles.summaryValue}>
            ${portfolioSummary.totalValue}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Today's Change:</span>
          <span
            className={`${styles.summaryValue} ${
              portfolioSummary.todaysChange > 0
                ? styles.positiveChange
                : portfolioSummary.todaysChange < 0
                ? styles.negativeChange
                : ""
            }`}
          >
            ${portfolioSummary.todaysChange}
          </span>
        </div>
      </div>

      {/* Portfolio Companies List */}
      <div className={styles.companyList}>
        <div className={styles.companyListHeader}>
          <span className={styles.headerItem}>Company</span>
          <span className={styles.headerItem}>Ticker</span>
          <span className={styles.headerItem}>Price</span>
          <span className={styles.headerItem}>Daily Change</span>
          <span className={styles.headerItem}>Shares</span>
          <span className={styles.headerItem}>Action</span>{" "}
        </div>
        {portfolioCompanies.length > 0 ? (
          portfolioCompanies.map((company, index) => (
            <div key={company.ticker} className={styles.companyListItem}>
              <span className={styles.listItem}>{company.name}</span>
              <span className={styles.listItem}>{company.ticker}</span>
              <span className={styles.listItem}>{company.price}</span>
              <span className={styles.listItem}>{company.dailyChange}</span>
              <span className={styles.listItem}>{company.shares}</span>
              <span className={styles.listItem}>
                <button
                  onClick={() => removeCompanyFromPortfolio(company.ticker)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </span>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>
            No companies added to sandbox yet. Search above!
          </p>
        )}
      </div>
    </div>
  );
};

export default SandboxPortfolio;
