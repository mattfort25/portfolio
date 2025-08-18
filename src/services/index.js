// src/services/index.js

import { API_BASE_URL } from "@/utils/general";

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
