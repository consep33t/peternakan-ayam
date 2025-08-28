// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import CardProgress from "../components/CardProgres";
import CardIrStatus from "../components/CardIrStatus";
import CardRelay from "../components/CardRelay";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch("https://api.peternakan-ayam.site/api/sensor");
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
    <div className="min-h-screen p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-3xl">
        Sistem Peternakan Ayam Pintar
      </h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CardProgress
          title="Pakan Ayam"
          percentage_feed={data.distance_feed}
          type="feed"
        />
        <CardProgress
          title="Air Minum Ayam"
          percentage_water={data.distance_water}
          type="water"
        />
      </div>
      <div className="mt-6">
        <CardIrStatus ir1={data.ir1} ir2={data.ir2} ir3={data.ir3} />
      </div>
      <h1 className="text-3xl font-bold my-6 text-center">
        Kontrol Manual Relay Pakan & Air
      </h1>
      <div>
        <CardRelay />
      </div>
    </div>
  );
};

export default Dashboard;
