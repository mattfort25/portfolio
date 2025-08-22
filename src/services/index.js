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

    const refreshResponse = await fetch(
      `${API_BASE_URL}/api/auth/token/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

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
