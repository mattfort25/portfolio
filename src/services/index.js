// src/services/index.js

import { API_BASE_URL } from "@/utils/general";

// Test data function
export async function testData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test`, {
      method: "GET",
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        message: text || "Failed to fetch data from backend.",
      };
    }

    const data = await response.text();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      message: error.message || "Network error occurred.",
    };
  }
}

// Sing up user function
export async function signupUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Send user data as JSON
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message,
        user: data.user,
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to sign up.",
      };
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return {
      success: false,
      message: error.message || "Network error happened during signup.",
    };
  }
}
