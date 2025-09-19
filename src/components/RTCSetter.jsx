"use client";

import { useState } from "react";
import api from "../services/api";

export default function RTCSetter() {
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!datetime) {
      setAlert({ type: "error", message: "Please select date and time" });
      return;
    }

    const dt = new Date(datetime);
    const payload = {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDate(),
      hour: dt.getHours(),
      minute: dt.getMinutes(),
      second: dt.getSeconds(),
    };

    try {
      setLoading(true);
      await api.post("/time", payload); // <-- pakai api, bukan axios langsung
      setAlert({
        type: "success",
        message: "RTC time sent successfully to ESP32!",
      });
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Failed to send time to ESP32." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded border border-black shadow-xl">
      <h2 className="text-xl font-bold mb-4">Atur Waktu RTC</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className="input w-full bg-slate-300"
        />
        <button
          type="submit"
          className="w-full btn btn-info px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Mengirimkan ..." : "Kirim ke ESP32"}
        </button>
      </form>

      {alert && (
        <div
          className={`mt-4 p-2 rounded text-sm ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}
    </div>
  );
}
