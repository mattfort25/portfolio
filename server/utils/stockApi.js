const axios = require("axios");
const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

// In-memory cache for earnings data
let earningsCache = {
  data: null,
  timestamp: null,
  expiryTime: 24 * 60 * 60 * 1000,
};

const getStockDetailsFromAPI = async (ticker) => {
  if (!ticker) {
    throw new Error("Ticker is required.");
  }

  try {
    const externalApiUrl = `https://api.fortitudenorth.com/stocks/${ticker.toUpperCase()}/history?interval=1m&range=1d`;
    const response = await axios.get(externalApiUrl);

    const history = response.data.history;
    if (!history || history.length === 0) {
      throw new Error(`No data found for ticker: ${ticker}`);
    }

    const latestData = history[history.length - 1];
    // This is the data from the previous day's close
    const previousData =
      history.length > 1 ? history[history.length - 2] : null;

    const closePrice = latestData.close;
    let dailyChangePercent = null;

    if (latestData.open && latestData.open !== 0) {
      dailyChangePercent =
        ((closePrice - latestData.open) / latestData.open) * 100;
    } else if (previousData) {
      const previousClose = previousData.close;
      dailyChangePercent = ((closePrice - previousClose) / previousClose) * 100;
    }

    return {
      symbol: response.data.ticker,
      displayName: response.data.ticker,
      longName: response.data.ticker,
      shortName: response.data.ticker,
      regularMarketPrice: closePrice,
      regularMarketChangePercent: dailyChangePercent,
    };
  } catch (error) {
    console.error("Error fetching stock info:", error.message);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch stock data"
    );
  }
};

// Check if cache is still valid
function isCacheValid() {
  if (!earningsCache.data || !earningsCache.timestamp) {
    return false;
  }

  const now = Date.now();
  const timeSinceCache = now - earningsCache.timestamp;

  return timeSinceCache < earningsCache.expiryTime;
}

// Fetch earnings dates from AlphaVantage
async function getEarningsCalendarFromAlpha(symbol = null, horizon = "3month") {
  try {
    let url = `https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=${horizon}&apikey=${ALPHAVANTAGE_API_KEY}`;

    if (symbol) {
      url += `&symbol=${symbol}`;
    }

    console.log("Fetching earnings calendar from AlphaVantage...");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "request",
      },
    });

    if (!response.ok) {
      throw new Error(`AlphaVantage API returned status ${response.status}`);
    }

    // AlphaVantage returns CSV format for earnings calendar
    const csvData = await response.text();

    // Parse CSV to JSON
    const earnings = parseEarningsCSV(csvData);

    console.log(
      `Fetched ${earnings.length} earnings records from AlphaVantage`
    );

    return earnings;
  } catch (error) {
    console.error("Error fetching earnings from AlphaVantage:", error.message);
    throw error;
  }
}

// Parse AlphaVantage earnings CSV response
function parseEarningsCSV(csvData) {
  try {
    const lines = csvData.trim().split("\n");
    if (lines.length < 2) {
      return [];
    }

    const headers = lines[0].split(",");
    const earnings = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      if (values.length < headers.length) continue;

      const earning = {};
      headers.forEach((header, index) => {
        earning[header.trim()] = values[index].trim();
      });

      earnings.push(earning);
    }

    return earnings;
  } catch (error) {
    console.error("Error parsing earnings CSV:", error);
    return [];
  }
}

//  Get earnings for specific tickers from AlphaVantage with caching
async function getEarningsForTickers(tickers) {
  try {
    // Check if cache is valid (less than 24 hours old)
    if (isCacheValid()) {
      console.log("Using cached earnings data");

      const tickerSet = new Set(tickers.map((t) => t.toUpperCase()));
      const filteredResults = earningsCache.data.filter((e) =>
        tickerSet.has(e.ticker)
      );

      console.log(
        `Returning ${filteredResults.length} cached earnings for requested tickers`
      );
      return filteredResults;
    }

    console.log("Cache expired or empty, fetching fresh earnings data...");

    const allEarnings = await getEarningsCalendarFromAlpha(null, "3month");

    if (!allEarnings || allEarnings.length === 0) {
      console.warn("No earnings data received from AlphaVantage");
      return [];
    }

    // Transform and cache ALL earnings data
    const formattedAllEarnings = allEarnings
      .map((earning) => {
        return {
          ticker: earning.symbol,
          companyName: earning.name || earning.symbol,
          earningsDate: earning.reportDate || null,
          fiscalDateEnding: earning.fiscalDateEnding || null,
          estimate: earning.estimate || null,
          currency: earning.currency || "USD",
        };
      })
      .filter((e) => e.earningsDate);

    formattedAllEarnings.sort((a, b) => {
      const dateA = new Date(a.earningsDate);
      const dateB = new Date(b.earningsDate);
      return dateA - dateB;
    });

    earningsCache.data = formattedAllEarnings;
    earningsCache.timestamp = Date.now();

    console.log(`Cached ${formattedAllEarnings.length} earnings records`);

    const tickerSet = new Set(tickers.map((t) => t.toUpperCase()));
    const filteredEarnings = formattedAllEarnings.filter((earning) =>
      tickerSet.has(earning.ticker)
    );

    console.log(
      `Returning ${filteredEarnings.length} earnings for requested tickers`
    );

    return filteredEarnings;
  } catch (error) {
    console.error("Error getting earnings for tickers:", error);

    if (earningsCache.data) {
      console.warn("Error occurred, falling back to stale cache data");
      const tickerSet = new Set(tickers.map((t) => t.toUpperCase()));
      return earningsCache.data.filter((e) => tickerSet.has(e.ticker));
    }

    return [];
  }
}

/**
 * Manually clear the earnings cache (useful for testing or force refresh)
 */
function clearEarningsCache() {
  earningsCache.data = null;
  earningsCache.timestamp = null;
  console.log("Earnings cache cleared");
}

function getCacheStatus() {
  if (!earningsCache.timestamp) {
    return {
      status: "empty",
      recordCount: 0,
      age: null,
      valid: false,
    };
  }

  const now = Date.now();
  const age = now - earningsCache.timestamp;
  const ageHours = (age / (1000 * 60 * 60)).toFixed(2);

  return {
    status: isCacheValid() ? "valid" : "expired",
    recordCount: earningsCache.data ? earningsCache.data.length : 0,
    age: `${ageHours} hours`,
    valid: isCacheValid(),
    timestamp: new Date(earningsCache.timestamp).toISOString(),
  };
}

module.exports = {
  getStockDetailsFromAPI,
  getEarningsCalendarFromAlpha,
  getEarningsForTickers,
  clearEarningsCache,
  getCacheStatus,
};
