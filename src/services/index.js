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

export async function signupUser(userData) {
  try {
    const response = await my_fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      setTokens(data); // Store access and refresh tokens from backend
      return { success: true, ...data };
    } else {
      return { success: false, message: data.message || "Failed to sign up." };
    }
  } catch (error) {
    console.error("Error during signup service call:", error);
    return {
      success: false,
      message: error.message || "Network error occurred during signup.",
    };
  }
}

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

export async function getStockDetails(query) {
  try {
    const response = await my_fetch(`${API_BASE_URL}/stocks/${query}`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data.data, // Get data field from  backend
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
