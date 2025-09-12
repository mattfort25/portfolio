import React from "react";
import styles from "../styles/Auth.module.css";
import classNames from "classnames";

const PricingPlans = ({ selectedPlan, onSelectPlan }) => {
  const planFeatures = {
    silver: [
      "Access to 10 companies' ticker data",
      "Limited historical data (1-year)",
      "Limited API access (100 requests/day)",
      "Basic portfolio management",
    ],
    gold: [
      "Access to all companies' ticker data",
      "Full historical data (5-years)",
      "Unlimited API access",
      "Advanced portfolio management & analytics",
      "Real-time news alerts",
    ],
    platinum: [
      "Customizable access and features",
      "Dedicated account manager",
      "Enterprise-grade support",
      "Multi-user access",
      "Priority API access",
    ],
  };

  const renderFeatures = (features) => (
    <ul>
      {features.map((feature, index) => (
        <li key={index}>
          <i className="fas fa-check-circle"></i> {feature}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.planSelection}>
      <div className={styles.planCardsContainer}>
        <div
          className={classNames(styles.planCard, {
            [styles.selected]: selectedPlan === "silver",
          })}
          onClick={() => onSelectPlan("silver")}
        >
          <h3>Silver</h3>
          <p className={styles.price}>$1k/month</p>
          <p className={styles.priceSmall}>or $10k/year</p>
          <div className={styles.features}>
            {renderFeatures(planFeatures.silver)}
          </div>
        </div>
        <div
          className={classNames(styles.planCard, {
            [styles.selected]: selectedPlan === "gold",
          })}
          onClick={() => onSelectPlan("gold")}
        >
          <h3>Gold</h3>
          <p className={styles.price}>$10k/month</p>
          <p className={styles.priceSmall}>or $100k/year</p>
          <div className={styles.features}>
            {renderFeatures(planFeatures.gold)}
          </div>
        </div>
        <div
          className={classNames(styles.planCard, {
            [styles.selected]: selectedPlan === "platinum",
          })}
          onClick={() => onSelectPlan("platinum")}
        >
          <h3>Platinum</h3>
          <p className={styles.price}>Custom Pricing</p>
          <p className={styles.priceSmall}>$1M+/year</p>
          <div className={styles.features}>
            {renderFeatures(planFeatures.platinum)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
