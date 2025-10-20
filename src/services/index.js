// src/services/index.js
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "@/utils/general";

export function setTokens(data) {
  const { accessToken, refreshToken } = data;
  if (accessToken) localStorage.setItem("access_token", accessToken);
  if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function readToken() {
  try {
    const token = getAccessToken();
    return token || null;
  } catch (err) {
    console.error("Error reading token:", err);
    return null;
  }
}

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export function removeTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // localStorage.removeItem("email");
}

// --- API fetch wrapper with token refresh logic ---

// Function to refresh token and retry the original request
const fetchWithTokenRefresh = async (url, options) => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.error("No refresh token available. User needs to log in again.");
      removeTokens(); // Clear all tokens if no refresh token
      throw new Error("No refresh token");
    }

    const refreshResponse = await fetch(`${API_BASE_URL}/auth/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const { accessToken } = await refreshResponse.json();
      localStorage.setItem("access_token", accessToken); // Update only the access token

      const newOptions = {
        ...options,
        headers: {
          ...options.headers,
          "x-auth-token": accessToken,
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return await fetch(url, newOptions);
    } else {
      const errorData = await refreshResponse.json();
      console.error("Refresh token failed:", errorData.message);
      removeTokens();
      throw new Error(
        errorData.message || "Refresh token expired. Please log in again."
      );
    }
  } catch (error) {
    console.error("Error during token refresh or retrying request:", error);
    removeTokens();
    throw error;
  }
};

// General fetch wrapper that includes auth token and handles 401 errors
export async function my_fetch(url, args = {}) {
  const accessToken = getAccessToken();
  const headers = {
    "Content-type": "application/json",
    ...args.headers,
  };

  if (accessToken) {
    headers["x-auth-token"] = accessToken;
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const _args = {
    ...args,
    headers,
  };

  try {
    let response = await fetch(url, _args);

    const isAuthEndpoint =
      url.includes("/login") ||
      url.includes("/signup") ||
      url.includes("/token/refresh");

    if (response.status === 401 && !isAuthEndpoint) {
      console.warn(
        "Access token expired or unauthorized, attempting to refresh and retry..."
      );
      response = await fetchWithTokenRefresh(url, _args);
    }

    return response;
  } catch (error) {
    console.error("Error in my_fetch:", error);
    throw error;
  }
}

// --- User Authentication Services --

// User signup
export async function requestDemoAndCreateUser(userData) {
  try {
    const response = await my_fetch(`${API_BASE_URL}/auth/demo-signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      setTokens(data); // Store access and refresh tokens from backend
      return { success: true, ...data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to process demo request.",
      };
    }
  } catch (error) {
    console.error("Error during demo request service call:", error);
    return {
      success: false,
      message:
        error.message ||
        "Network error occurred during demo request/account creation.",
    };
  }
}
// User login
export async function loginUser(email, password) {
  try {
    const response = await my_fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setTokens(data);
      return {
        success: true,
        accessToken: data.accessToken,
        message: data.message || "Login successful.",
      };
    } else {
      console.error("Backend login response not OK:", data.message);
      return {
        success: false,
        message:
          data.message ||
          "Authentication failed. Please check your credentials.",
      };
    }
  } catch (error) {
    console.error("Error during login service call:", error);
    return {
      success: false,
      message: error.message || "Network error occurred during login.",
    };
  }
}

// Fetch user profile
export async function getUserProfile() {
  try {
    const response = await my_fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch user profile",
      };
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      message: error.message || "Network error occurred",
    };
  }
}

// --- Stock and Portfolio Services ---
export async function getStockDetails(query) {
  try {
    const response = await my_fetch(`${API_BASE_URL}/stocks/info/${query}`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      // Format the response to ensure all required fields are present
      const formattedData = {
        symbol: data.data?.symbol || query.toUpperCase(),
        displayName:
          data.data?.displayName || data.data?.symbol || query.toUpperCase(),
        longName:
          data.data?.longName || data.data?.symbol || query.toUpperCase(),
        shortName:
          data.data?.shortName || data.data?.symbol || query.toUpperCase(),
        regularMarketPrice: parseFloat(data.data?.regularMarketPrice) || 0,
        regularMarketChangePercent:
          parseFloat(data.data?.regularMarketChangePercent) || 0,
      };

      return {
        success: true,
        data: formattedData,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch stock details.",
      };
    }
  } catch (error) {
    console.error("Error fetching stock details:", error);
    return {
      success: false,
      message: error.message || "Network error occurred.",
    };
  }
}

// Fetch sandbox portfolio
export async function getSandboxPortfolio() {
  try {
    const response = await my_fetch(`${API_BASE_URL}/sandbox`, {
      method: "GET",
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: data.data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch sandbox portfolio.",
      };
    }
  } catch (error) {
    console.error("Error fetching sandbox portfolio:", error);
    return { success: false, message: "Network error occurred." };
  }
}

// Add sandbox asset
export async function addSandboxAsset(ticker, name, quantity) {
  try {
    const response = await my_fetch(`${API_BASE_URL}/sandbox/add`, {
      method: "POST",
      body: JSON.stringify({ ticker, name, quantity }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return {
        success: false,
        message: data.message || "Failed to add asset.",
      };
    }
  } catch (error) {
    console.error("Error adding sandbox asset:", error);
    return { success: false, message: "Network error occurred." };
  }
}

// Remove sandbox asset
export async function removeSandboxAsset(sandboxAssetId) {
  try {
    const response = await my_fetch(
      `${API_BASE_URL}/sandbox/remove/${sandboxAssetId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return {
        success: false,
        message: data.message || "Failed to remove asset.",
      };
    }
  } catch (error) {
    console.error("Error removing sandbox asset:", error);
    return { success: false, message: "Network error occurred." };
  }
}

// Update sandbox asset shares
export async function updateSandboxAssetShares(sandboxAssetId, quantity) {
  try {
    const response = await my_fetch(
      `${API_BASE_URL}/sandbox/update-shares/${sandboxAssetId}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return {
        success: false,
        message: data.message || "Failed to update shares.",
      };
    }
  } catch (error) {
    console.error("Error updating sandbox asset shares:", error);
    return {
      success: false,
      message: error.message || "Network error occurred.",
    };
  }
}

// Fetch stock history by ticker, interval, and range
export async function getStockHistory(ticker, interval, range) {
  try {
    const url = `${API_BASE_URL}/stocks/${ticker}/history?interval=${interval}&range=${range}`;
    const response = await my_fetch(url);

    const data = await response.json();
    if (response.ok) {
      console.log("API Response Data:", data);
      console.log("History Data:", data.data);
      return { success: true, data: data.data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch stock history.",
      };
    }
  } catch (error) {
    console.error("Error fetching stock history:", error);
    return {
      success: false,
      message: "Network error occurred. Failed to fetch stock history.",
    };
  }
}

// Fetch stock news by ticker
export const getStockNews = async (ticker) => {
  try {
    const response = await my_fetch(`${API_BASE_URL}/stocks/${ticker}/news`);
    const data = await response.json();

    if (response.ok) {
      return { success: true, news: data.news };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch news.",
      };
    }
  } catch (error) {
    console.error("Error fetching stock news:", error);
    return { success: false, message: "Network error occurred." };
  }
};

// Run portfolio simulation
export async function runSimulation(portfolioData) {
  try {
    const response = await my_fetch(`${API_BASE_URL}/simulate/simple`, {
      method: "POST",
      body: JSON.stringify(portfolioData),
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to run simulation.",
      };
    }
  } catch (error) {
    console.error("Error running simulation:", error);
    return { success: false, message: "Network error occurred." };
  }
}

// Fetch global financial news
export async function getGlobalNews() {
  try {
    const response = await my_fetch(`${API_BASE_URL}/news/global`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.data, message: data.message };
    } else {
      return {
        success: false,
        data: null,
        message: data.message || "Failed to fetch global news from the server.",
      };
    }
  } catch (error) {
    console.error("Error fetching global news:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Network error occurred while fetching news.",
    };
  }
}

// Get reporting data
export async function getReportingData() {
  try {
    const response = await my_fetch(`${API_BASE_URL}/reporting/data`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch reporting data.",
      };
    }
  } catch (error) {
    console.error("Error fetching reporting data:", error);
    return {
      success: false,
      message: error.message || "Network error occurred.",
    };
  }
}

// Download report in specified format
export async function downloadReport(format, data) {
  try {
    const endpoint = `/reporting/download/${format}`;
    const response = await my_fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      let mimeType;
      switch (format) {
        case "csv":
          mimeType = "text/csv";
          break;
        case "xlsx":
          mimeType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          break;
        case "pdf":
          mimeType = "application/pdf";
          break;
        default:
          mimeType = "application/octet-stream";
      }

      // Get the data as blob/text depending on format
      let responseData;
      if (format === "csv") {
        responseData = await response.text();
      } else {
        responseData = await response.blob();
      }

      return {
        success: true,
        data: responseData,
        mimeType: mimeType,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || `Failed to download ${format} report.`,
      };
    }
  } catch (error) {
    console.error(`Error downloading ${format} report:`, error);
    return {
      success: false,
      message: error.message || "Network error occurred during download.",
    };
  }
}

// Fetch earnings calendar for portfolio
export async function getPortfolioEarnings(tickers) {
  try {
    const tickerString = Array.isArray(tickers) ? tickers.join(",") : tickers;
    const response = await my_fetch(
      `${API_BASE_URL}/earnings/portfolio?tickers=${tickerString}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch earnings calendar.",
      };
    }
  } catch (error) {
    console.error("Error fetching earnings calendar:", error);
    return {
      success: false,
      message: error.message || "Network error occurred.",
    };
  }
}

// Email subscription
export async function subscribeEmail(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok || response.status === 200 || response.status === 201) {
      return { success: true, message: data.message };
    } else {
      return {
        success: false,
        message: data.message || "Failed to subscribe email.",
      };
    }
  } catch (error) {
    console.error("Error during email subscription service call:", error);
    return {
      success: false,
      message:
        error.message || "Network error occurred during email subscription.",
    };
  }
}
