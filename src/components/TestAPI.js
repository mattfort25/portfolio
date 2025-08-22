// src/components/TestApi.js
import styles from "../styles/Hero.module.css";
import { useState, useEffect } from "react";

const TestAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <table>
        <tr>
          <td>Name</td>
          <td>{data.stock.displayName}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{data.stock.address1}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{data.stock.longBusinessSummary}</td>
        </tr>
      </table>
      <tbody>
        {Object.entries(data.stock).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{String(value)}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default TestAPI;
