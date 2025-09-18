// NEWS API
// export default async function handler(req, res) {
//   const ticker = "AAPL";
//   const interval = "1d";
//   const range = "1y";

//   const response = await fetch(
//     `https://api.fortitudenorth.com/news?search_query=${ticker}&days=30`
//   );

//   const data = await response.json();

//   res.status(200).json(data);
// }

// // MAٍُِRKET API
export default async function handler(req, res) {
  const ticker = "AAPL";
  const interval = "1w";
  const range = "1y";

  const externalApiUrl = `https://api.fortitudenorth.com/stocks/${ticker}/history?interval=${interval}&range=${range}`;

  try {
    const response = await fetch(externalApiUrl);
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// MARKET IMPACT API
// /src/pages/api/test.js
// export default async function handler(req, res) {
//   const externalApiUrl =
//     "https://api.fortitudenorth.com/risk/market/news_impact?ticker=AAPL&days=365";

//   try {
//     const response = await fetch(externalApiUrl);
//     if (!response.ok) {
//       throw new Error(`External API error: ${response.status}`);
//     }
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
