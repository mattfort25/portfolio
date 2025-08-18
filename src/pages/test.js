// src/pages/test.js
import { testData } from "@/services";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await testData();
      if (result.success) {
        setData(result.data);
      } else {
        setData(result.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Backend Connection Test</h1>
      <p>Result from backend:</p>
      <p>{data}</p>
    </div>
  );
}
