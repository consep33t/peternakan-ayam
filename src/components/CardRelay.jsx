import { useEffect, useState } from "react";
import { SiRelay } from "react-icons/si";

const CardRelay = () => {
  const [relayFeed, setRelayFeed] = useState(false);
  const [relayWater, setRelayWater] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState({ feed: false, water: false });

  // Ambil status dari /api/relay
  const fetchRelayStatus = async () => {
    try {
      const res = await fetch("https://api.peternakan-ayam.site/api/relay");
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
      await fetch("https://api.peternakan-ayam.site/relay/control", {
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
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="card bg-white shadow-lg border border-base-300 p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Relay Pakan</h3>
        <SiRelay className="mx-auto mb-4 text-6xl text-yellow-500" />
        <div className="flex items-center justify-center gap-4">
          <span className="text-red-600 font-medium select-none">OFF</span>
          <input
            type="checkbox"
            checked={relayFeed}
            disabled={submitting.feed}
            onChange={() => updateRelay("feed")}
            className="toggle toggle-xl text-red-800 border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800"
          />
          <span className="text-green-600 font-medium select-none">ON</span>
        </div>
        {submitting.feed && (
          <p className="text-center mt-3 text-sm text-gray-500">
            Mengubah status...
          </p>
        )}
      </div>

      {/* Card Relay Air */}
      <div className="card bg-white shadow-lg border border-base-300 p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Relay Air</h3>
        <SiRelay className="mx-auto mb-4 text-6xl text-blue-500" />
        <div className="flex items-center justify-center gap-4">
          <span className="text-red-600 font-medium select-none">OFF</span>
          <input
            type="checkbox"
            checked={relayWater}
            disabled={submitting.water}
            onChange={() => updateRelay("water")}
            className="toggle toggle-xl text-red-800 border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800"
          />
          <span className="text-green-600 font-medium select-none">ON</span>
        </div>
        {submitting.water && (
          <p className="text-center mt-3 text-sm text-gray-500">
            Mengubah status...
          </p>
        )}
      </div>
    </div>
  );
};

export default CardRelay;
