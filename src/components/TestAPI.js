// import React, { useState, useEffect, useRef } from "react";
// import { Chart } from "chart.js/auto";

// export default function TestAPI() {
//   const [metrics, setMetrics] = useState(null);
//   const chartRef = useRef(null);
//   const returnChartRef = useRef(null);

//   useEffect(() => {
//     loadPortfolio("AAPL", "BMO");
//   }, []);

//   async function loadPortfolio(ticker1, ticker2) {
//     try {
//       // Call your local proxy route
//       const response = await fetch("/api/simulate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ticker1, ticker2 }),
//       });

//       if (!response.ok) {
//         throw new Error(`Proxy request failed: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data) {
//         setMetrics(data.metrics);
//         drawReturnChart(data.simulated_returns_preview);
//       }
//     } catch (err) {
//       console.error("loadPortfolio error:", err);
//       // Handle the error (e.g., set an error state, display a message)
//     }
//   }

//   function drawReturnChart(returns) {
//     const ctx = chartRef.current.getContext("2d");
//     if (returnChartRef.current) returnChartRef.current.destroy();

//     returnChartRef.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: returns.map((_, i) => i + 1),
//         datasets: [
//           {
//             label: "Simulated Returns",
//             data: returns,
//             borderColor: "blue",
//             fill: false,
//           },
//         ],
//       },
//     });
//   }

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <nav className="col-md-2 d-none d-md-block bg-light">
//           <h5 className="mt-3">Portfolios</h5>
//           <ul className="nav flex-column">
//             <li className="nav-item">
//               <button
//                 className="btn btn-link"
//                 onClick={() => loadPortfolio("AAPL", "BMO")}
//               >
//                 BRS-AM-US
//               </button>
//             </li>
//             <li className="nav-item">
//               <button
//                 className="btn btn-link"
//                 onClick={() => loadPortfolio("MSFT", "RY")}
//               >
//                 BRS-INT1
//               </button>
//             </li>
//             <li className="nav-item">
//               <button
//                 className="btn btn-link"
//                 onClick={() => loadPortfolio("GOOG", "TD")}
//               >
//                 BRS-MBS
//               </button>
//             </li>
//           </ul>
//         </nav>

//         <main className="col-md-10 ml-sm-auto px-4">
//           <h2 className="mt-3">Portfolio Risk Dashboard</h2>
//           <hr />
//           <div className="row">
//             <div className="col-md-4 text-center">
//               <h6>VaR 95%</h6>
//               <div>
//                 {metrics ? (metrics.VaR_95 * 100).toFixed(2) + "%" : "--"}
//               </div>
//             </div>
//             <div className="col-md-4 text-center">
//               <h6>CVaR 95%</h6>
//               <div>
//                 {metrics ? (metrics.CVaR_95 * 100).toFixed(2) + "%" : "--"}
//               </div>
//             </div>
//             <div className="col-md-4 text-center">
//               <h6>Mean Return</h6>
//               <div>
//                 {metrics ? (metrics.mean_return * 100).toFixed(2) + "%" : "--"}
//               </div>
//             </div>
//           </div>

//           <div className="card mt-4">
//             <div className="card-body">
//               <h5 className="card-title">Return Analysis</h5>
//               <canvas ref={chartRef} height="100"></canvas>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

// NEWS API

// Helper to strip HTML tags for display
const stripHtml = (html) => {
  if (!html) return "-";
  return html.replace(/<[^>]+>/g, "");
};

// Truncate long text
const truncate = (str, max = 150) => {
  const text = stripHtml(str);
  return text.length > max ? text.slice(0, max) + "..." : text;
};

const TestAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading news data...</p>;

  // Convert news object to array
  const newsArray = Object.entries(data.news || {})
    .filter(([key]) => !isNaN(key))
    .map(([_, value]) => value);

  return (
    <div>
      <h2>News for AAPL</h2>
      <p>Total articles: {data.count}</p>

      <button
        onClick={() => {
          const tableEl = document.getElementById("news-table");
          const jsonEl = document.getElementById("news-json");
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
          id="news-table"
          border="1"
          cellPadding="5"
          style={{ minWidth: "800px" }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Link</th>
              <th>Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {newsArray.map((item, index) => (
              <tr key={index}>
                <td>{truncate(item.title, 50)}</td>
                <td>{truncate(item.author, 30)}</td>
                <td>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </td>
                <td>
                  {item.date
                    ? new Date(Number(item.date) * 1000).toLocaleString()
                    : "-"}
                </td>
                <td>{truncate(item.content, 150)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JSON view */}
      <pre
        id="news-json"
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
