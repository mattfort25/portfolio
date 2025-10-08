import React, { useState, useEffect } from "react";
import styles from "../../styles/SandboxPortfolio.module.css";
import {
  getStockDetails,
  getSandboxPortfolio,
  addSandboxAsset,
  removeSandboxAsset,
  updateSandboxAssetShares,
  runSimulation,
} from "../../services";

const SandboxPortfolio = ({
  updateDashboardValues,
  onStockSelect,
  selectedTicker,
  onSimulationComplete,
  portfolioCompanies,
  setPortfolioCompanies,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [isLoadingSimulation, setIsLoadingSimulation] = useState(false);

  const calculatePortfolioSummary = () => {
    let totalValue = 0;
    let todaysChange = 0;

    portfolioCompanies.forEach((company) => {
      const price = company.price;
      const dailyChange = company.dailyChange;
      const shares = Math.floor(Number(company.shares)) || 1;

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

  useEffect(() => {
    fetchPortfolio();
  }, []);

  useEffect(() => {
    const summary = calculatePortfolioSummary();
    if (updateDashboardValues) {
      updateDashboardValues(summary.totalValue, summary.todaysChange);
    }
  }, [portfolioCompanies, updateDashboardValues]);

  // Auto-run simulation whenever portfolio changes
  useEffect(() => {
    if (portfolioCompanies.length > 0) {
      handleRunSimulation();
    }
  }, [portfolioCompanies]);

  const fetchPortfolio = async () => {
    const result = await getSandboxPortfolio();
    if (result.success && result.data) {
      const cleanedData = result.data.map((company) => ({
        ...company,
        shares: Math.floor(Number(company.shares)) || 1,
      }));
      setPortfolioCompanies(cleanedData);
    } else {
      console.error("Failed to fetch portfolio:", result.message);
    }
  };

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
        const stockData = result.data;
        setSearchResults([
          {
            name: stockData.displayName || stockData.symbol || "Unknown",
            ticker: stockData.symbol,
            price:
              stockData.regularMarketPrice &&
              !isNaN(stockData.regularMarketPrice)
                ? `$${parseFloat(stockData.regularMarketPrice).toFixed(2)}`
                : "N/A",
            dailyChange:
              stockData.regularMarketChangePercent &&
              !isNaN(stockData.regularMarketChangePercent)
                ? `${parseFloat(stockData.regularMarketChangePercent).toFixed(
                    2
                  )}%`
                : "N/A",
            priceValue: parseFloat(stockData.regularMarketPrice) || 0,
            dailyChangeValue:
              parseFloat(stockData.regularMarketChangePercent) || 0,
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

  const handleShareChange = async (id, newQuantity) => {
    const quantity = Math.floor(Number(newQuantity));
    if (isNaN(quantity) || quantity <= 0) {
      return;
    }

    const result = await updateSandboxAssetShares(id, quantity);
    if (result.success) {
      const updatedPortfolio = portfolioCompanies.map((company) =>
        company.id === id ? { ...company, shares: quantity } : company
      );
      setPortfolioCompanies(updatedPortfolio);
    } else {
      alert("Failed to update shares.");
    }
  };

  const addCompanyToPortfolio = async (company) => {
    const existing = portfolioCompanies.find(
      (pc) => pc.ticker === company.ticker
    );

    if (existing) {
      setSearchMessage("Company already in portfolio.");
      return;
    }

    const result = await addSandboxAsset(company.ticker, company.name, 1);
    if (result.success) {
      fetchPortfolio();
      setSearchTerm("");
      setSearchResults([]);
      setSearchMessage("");
    } else {
      setSearchMessage(result.message || "Failed to add company.");
    }
  };

  const removeCompanyFromPortfolio = async (id) => {
    const result = await removeSandboxAsset(id);
    if (result.success) {
      fetchPortfolio();
    } else {
      alert("Failed to remove company.");
    }
  };

  const handleRunSimulation = async () => {
    if (portfolioCompanies.length === 0) {
      return;
    }

    setIsLoadingSimulation(true);

    try {
      const portfolioData = {};
      const weight = 1 / portfolioCompanies.length;
      portfolioCompanies.forEach((company) => {
        portfolioData[company.ticker] = weight;
      });

      const simulationConfig = {
        portfolio: portfolioData,
        horizon_days: 21,
        iterations: 100,
      };

      const result = await runSimulation(simulationConfig);
      if (result.success) {
        onSimulationComplete(result.data);
      } else {
        alert(result.message || "Failed to run simulation.");
      }
    } catch (error) {
      console.error("Simulation error:", error);
      alert("An error occurred during the simulation.");
    } finally {
      setIsLoadingSimulation(false);
    }
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
        </button>
      </div>

      {searchMessage && <p className={styles.searchMessage}>{searchMessage}</p>}

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
                <span
                  style={{
                    color: company.dailyChangeValue >= 0 ? "green" : "red",
                  }}
                >
                  {company.dailyChange}
                </span>
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

      <div className={styles.companyList}>
        <div className={styles.companyListHeader}>
          <span className={styles.headerItem}>Company</span>
          <span className={styles.headerItem}>Ticker</span>
          <span className={styles.headerItem}>Price</span>
          <span className={styles.headerItem}>Daily Change</span>
          <span className={styles.headerItem}>Shares</span>
          <span className={styles.headerItem}>Action</span>
        </div>
        {portfolioCompanies.length > 0 ? (
          portfolioCompanies.map((company) => (
            <div
              key={company.id}
              className={`${styles.companyListItem} ${
                company.ticker && company.ticker === selectedTicker
                  ? styles.selected
                  : ""
              }`}
              onClick={() => onStockSelect(company.ticker)}
            >
              <span className={styles.listItem}>{company.name}</span>
              <span className={styles.listItem}>{company.ticker}</span>
              <span className={styles.listItem}>
                {company.price
                  ? `$${parseFloat(company.price).toFixed(2)}`
                  : "N/A"}
              </span>
              <span
                className={styles.listItem}
                style={{
                  color: company.dailyChange >= 0 ? "green" : "red",
                }}
              >
                {company.dailyChange
                  ? `${parseFloat(company.dailyChange).toFixed(2)}%`
                  : "N/A"}
              </span>
              <span className={styles.listItem}>
                <input
                  type="number"
                  value={Math.floor(Number(company.shares)) || 1}
                  onChange={(e) =>
                    handleShareChange(company.id, e.target.value)
                  }
                  min="1"
                  step="1"
                  className={styles.sharesInput}
                />
              </span>
              <span className={styles.listItem}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCompanyFromPortfolio(company.id);
                  }}
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
