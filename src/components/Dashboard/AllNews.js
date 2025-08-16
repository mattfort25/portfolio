import React from "react";
import styles from "../../styles/Dashboard/AllNews.module.css";

const mockNews = [
  {
    headline: "Headline",
    summary: "Short summary..",
    time: "10:30 AM",
    source: "Source",
  },
  {
    headline: "Headline",
    summary: "Brief description...",
    time: "10:45 AM",
    source: "Source",
  },
  {
    headline: "Breaking News",
    summary: "Important update...",
    time: "11:00 AM",
    source: "Source",
  },
  {
    headline: "Market Insight",
    summary: "Analysis of recent...",
    time: "11:15 AM",
    source: "Source",
  },
];

const AllNews = () => {
  return (
    <div className={styles.allNewsCard}>
      <h2 className={styles.cardHeader}>All News</h2>
      <div className={styles.newsList}>
        {mockNews.map((news, index) => (
          <div key={index} className={styles.newsItem}>
            <h3 className={styles.newsHeadline}>{news.headline}</h3>
            <p className={styles.newsSummary}>{news.summary}</p>
            <div className={styles.newsMeta}>
              <span className={styles.newsTime}>{news.time}</span>
              <span className={styles.newsSource}>{news.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNews;
