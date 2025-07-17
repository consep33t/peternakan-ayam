"use client";

import { useState } from "react";
import axios from "axios";

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
      await axios.post("/api/time", payload);
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
    <div className="max-w-md p-4 mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Set RTC Time</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send to ESP32"}
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
