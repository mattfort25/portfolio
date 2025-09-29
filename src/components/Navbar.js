// src/components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdown}`)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <Image src="/logo.jpg" alt="Company Logo" width={120} height={28} />
          Metanym
        </Link>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ""}`}
        >
          <div className={styles.dropdown}>
            <a
              href="#"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                handleDropdownToggle("solutions");
              }}
            >
              Solutions
            </a>
            <div
              className={`${styles.dropdownContent} ${
                activeDropdown === "solutions" ? styles.show : ""
              }`}
            >
              <div className={styles.dropdownSection}>
                <h6>By Use Case</h6>
                <a href="#" onClick={closeDropdown}>
                  Risk Scoring
                  <small>Quantify exposures across portfolios</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  Portfolio Analysis
                  <small>Optimize allocation, reduce drawdowns</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  Regulatory Compliance
                  <small>Audit-ready reports, faster filings</small>
                </a>
              </div>
              <div className={styles.dropdownSection}>
                <h6>By Industry</h6>
                <a href="#" onClick={closeDropdown}>
                  Asset Management
                  <small>Hedge funds, mutual funds, pensions</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  Banking<small>Stress testing & regulatory risk</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  Corporate Treasury
                  <small>Liquidity, FX, and credit risk</small>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.dropdown}>
            <a
              href="#"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                handleDropdownToggle("products");
              }}
            >
              Products
            </a>
            <div
              className={`${styles.dropdownContent} ${
                activeDropdown === "products" ? styles.show : ""
              }`}
            >
              <div className={styles.dropdownSection}>
                <h6>Core Platform</h6>
                <a href="#" onClick={closeDropdown}>
                  Core Fusion Engine
                  <small>Explainable composite risk models</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  Risk Scores API
                  <small>Low-latency scoring for live decisioning</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  Interactive Dashboards
                  <small>Analyst & executive views, scenario sims</small>
                </a>
              </div>
              <div className={styles.dropdownSection}>
                <h6>Integrations</h6>
                <a href="#" onClick={closeDropdown}>
                  Data Ingestion Daemons
                  <small>Market, news, ESG, custodian connectors</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  Cloud & On‑Prem Options
                  <small>Private deployments for regulated firms</small>
                </a>
                <a href="#" onClick={closeDropdown}>
                  SDKs & Webhooks
                  <small>Python SDK, REST, event-driven triggers</small>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.dropdown}>
            <a
              href="#"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                handleDropdownToggle("resources");
              }}
            >
              Resources
            </a>
            <div
              className={`${styles.dropdownContent} ${styles.singleColumn} ${
                activeDropdown === "resources" ? styles.show : ""
              }`}
            >
              <a href="#" onClick={closeDropdown}>
                Documentation
              </a>
              <a href="#" onClick={closeDropdown}>
                API Reference
              </a>
              <a href="#" onClick={closeDropdown}>
                Case Studies
              </a>
              <a href="#" onClick={closeDropdown}>
                Whitepapers
              </a>
              <a href="#" onClick={closeDropdown}>
                Blog
              </a>
            </div>
          </div>

          <Link href="#" className={styles.navLink}>
            Our Clients
          </Link>
          <Link href="/about" className={styles.navLink}>
            About Us
          </Link>

          <div className={styles.authButtons}>
            <Link href="/auth/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/demo" className={styles.registerBtn}>
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
