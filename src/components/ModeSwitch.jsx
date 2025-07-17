"use client";

import { useEffect, useState } from "react";
import { fetchSystemMode, setSystemMode } from "../services/api";

const ModeSwitch = () => {
  const [mode, setMode] = useState("auto");
  const [loading, setLoading] = useState(false);

  const loadMode = async () => {
    try {
      const data = await fetchSystemMode();
      setMode(data.mode);
    } catch (err) {
      console.error("Gagal memuat mode:", err);
    }
  };

  const toggleMode = async () => {
    const newMode = mode === "auto" ? "schedule" : "auto";
    setLoading(true);
    try {
      await setSystemMode(newMode);
      setMode(newMode);
    } catch (err) {
      console.error("Gagal mengubah mode:", err);
      alert("Gagal mengubah mode");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMode();
  }, []);

  return (
    <div className="w-fit">
      <h2 className="text-2xl font-bold mb-4">Mode Sistem</h2>
      <button
        onClick={toggleMode}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          mode === "auto" ? "bg-green-600" : "bg-blue-600"
        }`}
      >
        {loading
          ? "Memuat..."
          : mode === "auto"
          ? "Auto (klik ubah ke Schedule)"
          : "Schedule (klik ubah ke Auto)"}
      </button>
    </div>
  );
};

export default ModeSwitch;
