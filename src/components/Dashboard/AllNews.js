// src/componenets/Dashboard/AllNews.js
import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/AllNews.module.css";
import { getStockNews } from "@/services";

// Helper to strip HTML tags for display
const stripHtml = (html) => {
  if (!html) return "-";
  return html.replace(/<[^>]+>/g, "");
};

// Truncate long text
const truncate = (str, max = 150) => {
  const text = stripHtml(str);
  return text.length > max ? text.slice(0, max) + "..." : text;
};

const AllNews = ({ selectedTicker }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Select a stock to view news.");

  useEffect(() => {
    const fetchNews = async () => {
      if (!selectedTicker) {
        setNewsData([]);
        setMessage("Select a stock to view news.");
        return;
      }

      setLoading(true);
      setMessage("Loading news...");

      const result = await getStockNews(selectedTicker);

      if (result.success) {
        if (result.news && result.news.length > 0) {
          setNewsData(result.news);
          setMessage("");
        } else {
          setNewsData([]);
          setMessage("No news found for this stock.");
        }
      } else {
        setNewsData([]);
        setMessage(result.message || "Failed to fetch news.");
      }
      setLoading(false);
    };

    fetchNews();
  }, [selectedTicker]);

  return (
    <div className={styles.allNewsCard}>
      <h2 className={styles.cardHeader}>Latest News</h2>
      <div className={styles.newsList}>
        {loading || message ? (
          <p className={styles.newsMessage}>{message}</p>
        ) : (
          newsData.map((news, index) => (
            <div key={index} className={styles.newsItem}>
              <h3 className={styles.newsHeadline}>
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                  {truncate(news.title, 50)}
                </a>
              </h3>
              <p className={styles.newsSummary}>
                {truncate(news.content, 150)}
              </p>
              <div className={styles.newsMeta}>
                <span className={styles.newsTime}>
                  {news.date
                    ? new Date(Number(news.date) * 1000).toLocaleString()
                    : "-"}
                </span>
                <span className={styles.newsSource}>
                  {news.author ? news.author : "N/A"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllNews;
