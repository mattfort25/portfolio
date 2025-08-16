import React, { useState } from "react";
import styles from "../../styles/Dashboard/SandboxPortfolio.module.css";

// React Component written in JSX (JavaScript XML).

const mockCompanies = [
  {
    name: "Company A",
    ticker: "A",
    price: "$XX.XX",
    dailyChange: "X.XX%",
    shares: "X",
  },
  {
    name: "Company B",
    ticker: "B",
    price: "$XX.XX",
    dailyChange: "X.XX%",
    shares: "X",
  },
  {
    name: "Company C",
    ticker: "C",
    price: "$XX.XX",
    dailyChange: "X.XX%",
    shares: "X",
  },
  {
    name: "Company D",
    ticker: "D",
    price: "$YY.YY",
    dailyChange: "Y.YY%",
    shares: "Y",
  },
  {
    name: "Company E",
    ticker: "E",
    price: "$ZZ.ZZ",
    dailyChange: "Z.ZZ%",
    shares: "Z",
  },
];

const SandboxPortfolio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = mockCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(value) ||
        company.ticker.toLowerCase().includes(value)
    );
    setFilteredCompanies(filtered);
  };

  return (
    <div className={styles.sandboxPortfolioCard}>
      <h2 className={styles.cardHeader}>Sandbox Portfolio</h2>
      <div className={styles.searchBar}>
        <i className="fa-solid fa-search"></i>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.companyList}>
        <div className={styles.companyListHeader}>
          <span className={styles.headerItem}>Company</span>
          <span className={styles.headerItem}>Ticker</span>
          <span className={styles.headerItem}>Price</span>
          <span className={styles.headerItem}>Daily Change</span>
          <span className={styles.headerItem}>Shares</span>
        </div>
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <div key={index} className={styles.companyListItem}>
              <span className={styles.listItem}>{company.name}</span>
              <span className={styles.listItem}>{company.ticker}</span>
              <span className={styles.listItem}>{company.price}</span>
              <span className={styles.listItem}>{company.dailyChange}</span>
              <span className={styles.listItem}>{company.shares}</span>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No companies found.</p>
        )}
      </div>
    </div>
  );
};

export default SandboxPortfolio;
