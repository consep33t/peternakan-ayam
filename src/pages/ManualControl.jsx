import { useEffect, useState } from "react";

const ManualControl = () => {
  const [relayFeed, setRelayFeed] = useState(false);
  const [relayWater, setRelayWater] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState({ feed: false, water: false });

  // Ambil status dari /api/relay
  const fetchRelayStatus = async () => {
    try {
      const res = await fetch("http://145.79.10.235:5000/api/relay");
      const data = await res.json();
      setRelayFeed(data.feed === "on");
      setRelayWater(data.water === "on");
      setLoading(false);
    } catch (err) {
      console.error("Gagal ambil status relay:", err);
    }
  };

  // Kirim perubahan status ke /api/control
  const updateRelay = async (type) => {
    const isFeed = type === "feed";
    const currentState = isFeed ? relayFeed : relayWater;
    const newState = !currentState;

    setSubmitting((prev) => ({ ...prev, [type]: true }));

    try {
      await fetch("http://31.97.189.33:5000/api/relay/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          state: newState ? "on" : "off",
        }),
      });

      await fetchRelayStatus();
    } catch (err) {
      console.error("Gagal mengubah relay:", err);
    } finally {
      setSubmitting((prev) => ({ ...prev, [type]: false }));
    }
  };

  useEffect(() => {
    fetchRelayStatus();
    const interval = setInterval(fetchRelayStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-6">Memuat data...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Kontrol Manual</h2>
      <div className="space-y-4">
        {/* Kontrol Feed */}
        <div className="flex items-center gap-4">
          <span className="w-32">Relay Pakan</span>
          <button
            onClick={() => updateRelay("feed")}
            disabled={submitting.feed}
            className={`px-4 py-2 rounded text-white transition-all ${
              relayFeed ? "bg-green-600" : "bg-red-600"
            } ${submitting.feed ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {submitting.feed ? "Loading..." : relayFeed ? "ON" : "OFF"}
          </button>
        </div>

        {/* Kontrol Water */}
        <div className="flex items-center gap-4">
          <span className="w-32">Relay Air</span>
          <button
            onClick={() => updateRelay("water")}
            disabled={submitting.water}
            className={`px-4 py-2 rounded text-white transition-all ${
              relayWater ? "bg-green-600" : "bg-red-600"
            } ${submitting.water ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {submitting.water ? "Loading..." : relayWater ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualControl;
