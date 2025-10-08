// server/utils/newsFetch.js

const NEWS_API_URL = "https://api.fortitudenorth.com/news";

const fetchExternalNews = async () => {
  try {
    const response = await fetch(NEWS_API_URL);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `External News API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
      return {
        success: false,
        data: null,
        error: `External API error: ${response.statusText}`,
      };
    }

    const json = await response.json();

    if (json && json.news) {
      // The API returns the articles in the 'news' array
      return { success: true, data: json.news, error: null };
    } else {
      console.error("Invalid data format received from external news API");
      return {
        success: false,
        data: null,
        error: "Invalid data format from source",
      };
    }
  } catch (error) {
    console.error("Network error during external news fetch:", error);
    return { success: false, data: null, error: "Network error occurred." };
  }
};

module.exports = {
  fetchExternalNews,
};
