// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import FeedStatus from "../components/FeedStatus";
import WaterStatus from "../components/WaterStatus";
import IRStatus from "../components/IRStatus";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch("http://31.97.189.33:5000/api/sensor");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 100);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard Monitoring Pakan & Air
      </h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <FeedStatus level={data.distance_feed} />
        <WaterStatus level={data.distance_water} />
        <IRStatus ir1={data.ir1} ir2={data.ir2} ir3={data.ir3} />
      </div>
    </div>
  );
};

export default Dashboard;
