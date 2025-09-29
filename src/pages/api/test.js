// NEWS API
export default async function handler(req, res) {
  const ticker = "AAPL";
  const interval = "1d";
  const range = "1y";

  const response = await fetch(
    `https://api.fortitudenorth.com/news/search/${ticker}`
  );

  const data = await response.json();

  res.status(200).json(data);
}

// // MAٍُِRKET API
// export default async function handler(req, res) {
//   const ticker = "AAPL";
//   const interval = "1w";
//   const range = "1y";

//   const externalApiUrl = `https://api.fortitudenorth.com/stocks/${ticker}/history?interval=${interval}&range=${range}`;

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

// SIMULATION API
// // src/api/test.js
// export async function fetchPortfolioSimulation(ticker1, ticker2) {
//   try {
//     const response = await fetch(
//       "https://api.fortitudenorth.com/simulate/simple",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           portfolio: { [ticker1]: 0.5, [ticker2]: 0.5 },
//           horizon_days: 21,
//           iterations: 100,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status}`);
//     }

//     return await response.json();
//   } catch (err) {
//     console.error("fetchPortfolioSimulation error:", err);
//     return null; // fallback
//   }
// }
