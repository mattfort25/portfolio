// import { useState, useEffect } from "react";

// NEWS API

// // Helper to strip HTML tags for display
// const stripHtml = (html) => {
//   if (!html) return "-";
//   return html.replace(/<[^>]+>/g, "");
// };

// // Truncate long text
// const truncate = (str, max = 150) => {
//   const text = stripHtml(str);
//   return text.length > max ? text.slice(0, max) + "..." : text;
// };

// const TestAPI = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("/api/test")
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, []);

//   if (!data) return <p>Loading news data...</p>;

//   // Convert news object to array
//   const newsArray = Object.entries(data.news || {})
//     .filter(([key]) => !isNaN(key))
//     .map(([_, value]) => value);

//   return (
//     <div>
//       <h2>News for AAPL</h2>
//       <p>Total articles: {data.count}</p>

//       <button
//         onClick={() => {
//           const tableEl = document.getElementById("news-table");
//           const jsonEl = document.getElementById("news-json");
//           tableEl.style.display =
//             tableEl.style.display === "none" ? "table" : "none";
//           jsonEl.style.display =
//             jsonEl.style.display === "none" ? "block" : "none";
//         }}
//       >
//         Toggle Table / JSON
//       </button>

//       {/* Table view */}
//       <div style={{ overflowX: "auto", marginTop: "10px" }}>
//         <table
//           id="news-table"
//           border="1"
//           cellPadding="5"
//           style={{ minWidth: "800px" }}
//         >
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Link</th>
//               <th>Date</th>
//               <th>Content</th>
//             </tr>
//           </thead>
//           <tbody>
//             {newsArray.map((item, index) => (
//               <tr key={index}>
//                 <td>{truncate(item.title, 50)}</td>
//                 <td>{truncate(item.author, 30)}</td>
//                 <td>
//                   <a href={item.link} target="_blank" rel="noopener noreferrer">
//                     Link
//                   </a>
//                 </td>
//                 <td>
//                   {item.date
//                     ? new Date(Number(item.date) * 1000).toLocaleString()
//                     : "-"}
//                 </td>
//                 <td>{truncate(item.content, 150)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* JSON view */}
//       <pre
//         id="news-json"
//         style={{
//           display: "none",
//           marginTop: "10px",
//           background: "#f0f0f0",
//           padding: "10px",
//         }}
//       >
//         {JSON.stringify(data, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default TestAPI;

// MAKRET API

import { useState, useEffect } from "react";

const TestAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading stock data...</p>;

  // history is already an array
  const historyArray = data.history || [];

  return (
    <div>
      <h2>Stock History for {data.ticker}</h2>
      <p>
        Interval: {data.interval} | Range: {data.range}
      </p>

      <button
        onClick={() => {
          const tableEl = document.getElementById("stock-table");
          const jsonEl = document.getElementById("stock-json");
          tableEl.style.display =
            tableEl.style.display === "none" ? "table" : "none";
          jsonEl.style.display =
            jsonEl.style.display === "none" ? "block" : "none";
        }}
      >
        Toggle Table / JSON
      </button>

      {/* Table view */}
      <div style={{ overflowX: "auto", marginTop: "10px" }}>
        <table
          id="stock-table"
          border="1"
          cellPadding="5"
          style={{ minWidth: "800px" }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {historyArray.map((item, index) => (
              <tr key={index}>
                <td>{item.Date}</td>
                <td>{item.Open}</td>
                <td>{item.High}</td>
                <td>{item.Low}</td>
                <td>{item.Close}</td>
                <td>{item.Volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JSON view */}
      <pre
        id="stock-json"
        style={{
          display: "none",
          marginTop: "10px",
          background: "#f0f0f0",
          padding: "10px",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default TestAPI;

// // MARKET IMPACT API
// import React, { useEffect, useState } from "react";

// const TestAPI = () => {
//   const [newsArray, setNewsArray] = useState([]);
//   const [rawData, setRawData] = useState(null);
//   const [showRaw, setShowRaw] = useState(false);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch(
//           "https://api.fortitudenorth.com/risk/market/news_impact?ticker=AAPL&days=10&interval={1d}"
//         );
//         const data = await response.json();

//         setRawData(data); // keep the raw JSON
//         const resultsArray = Object.values(data.results || {});
//         setNewsArray(resultsArray);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>News Impact</h2>

//       <button
//         onClick={() => setShowRaw((prev) => !prev)}
//         style={{
//           marginBottom: "15px",
//           padding: "8px 12px",
//           cursor: "pointer",
//           background: "#0070f3",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         {showRaw ? "Show Table" : "Show Raw JSON"}
//       </button>

//       {/* Raw JSON View */}
//       {showRaw && (
//         <pre
//           style={{
//             textAlign: "left",
//             background: "#f4f4f4",
//             padding: "10px",
//             borderRadius: "5px",
//             overflowX: "auto",
//           }}
//         >
//           {JSON.stringify(rawData, null, 2)}
//         </pre>
//       )}

//       {/* Table View */}
//       {!showRaw && (
//         <table border="1" cellPadding="5" style={{ minWidth: "800px" }}>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Headline</th>
//               <th>Sentiment</th>
//               <th>Price Change</th>
//               <th>Volatility</th>
//               <th>Content</th>
//             </tr>
//           </thead>
//           <tbody>
//             {newsArray.length > 0 ? (
//               newsArray.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.date}</td>
//                   <td>{item.headline}</td>
//                   <td>{item.sentiment}</td>
//                   <td>{item.price_change}</td>
//                   <td>{item.volatility}</td>
//                   <td>{item.content}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">Loading news...</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TestAPI;
