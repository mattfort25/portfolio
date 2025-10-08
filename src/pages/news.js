// src/pages/news.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { getGlobalNews } from "../services";
import styles from "../styles/News.module.css";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);

      const result = await getGlobalNews();

      if (result.success && result.data) {
        // To sort  news from newest to oldest
        const sortedNews = result.data.sort((a, b) => {
          return b.date - a.date;
        });

        setNews(sortedNews);
      } else {
        console.error("Failed to load global news:", result.message);
        setError(result.message || "Failed to load news articles.");
      }
      setLoading(false);
    };

    loadNews();
  }, []);

  // Helper function to format the Unix timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "No Date";
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderNewsContent = () => {
    if (loading) {
      return <p className={styles.status}>Loading news...</p>;
    }

    if (error) {
      return <p className={styles.error}>{error}</p>;
    }

    if (news.length === 0) {
      return <p className={styles.status}>No news articles found.</p>;
    }

    return (
      <div className={styles.newsGrid}>
        {news.map((article, index) => (
          <div key={index} className={styles.articleCard}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h2 className={styles.articleTitle}>{article.title}</h2>
            </a>
            <p className={styles.articleMeta}>
              {article.author ? `By ${article.author} | ` : ""}
              <time dateTime={new Date(article.date * 1000).toISOString()}>
                {formatTime(article.date)}
              </time>
            </p>
            <p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.readMore}
              >
                Read full article &rarr;
              </a>
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>News & Blog | Metanym</title>
        <meta name="description" content="Latest financial and market news." />
      </Head>

      <header className={styles.header}>
        <h1>Latest Global News & Blog</h1>
      </header>

      <main className={styles.mainContent}>{renderNewsContent()}</main>
    </div>
  );
};

export default NewsPage;
