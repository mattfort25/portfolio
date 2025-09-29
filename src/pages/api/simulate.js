export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { ticker1, ticker2 } = req.body;

  try {
    const response = await fetch(
      "https://api.fortitudenorth.com/simulate/simple",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolio: { [ticker1]: 0.5, [ticker2]: 0.5 },
          horizon_days: 21,
          iterations: 100,
        }),
      }
    );

    if (!response.ok) {
      // Forward the error status from the external API
      return res
        .status(response.status)
        .json({ message: `API error: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
