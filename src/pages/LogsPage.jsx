import { useState, useEffect } from "react";
import {
  getAllWeightLogs,
  getWeightLogsWeekly,
  getWeightLogsMonthly,
  getWeightLogsRange,
  getAllFeedLogs,
  getFeedLogsWeekly,
  getFeedLogsMonthly,
  getFeedLogsRange,
  postFeedRefill,
} from "../services/api";
import GroupedLogs from "../components/GroupedLogs";
import "../index.css";

const LogsPage = () => {
  const [tab, setTab] = useState("feed");
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [range, setRange] = useState({ start: "", end: "" });
  const [amountKg, setAmountKg] = useState("");

  const loadLogs = async (type = "all") => {
    let data = [];
    if (tab === "feed") {
      if (type === "all") data = (await getAllFeedLogs()).data;
      if (type === "weekly") data = (await getFeedLogsWeekly()).data;
      if (type === "monthly") data = (await getFeedLogsMonthly()).data;
      if (type === "range")
        data = (await getFeedLogsRange(range.start, range.end)).data;
    } else {
      if (type === "all") data = (await getAllWeightLogs()).data;
      if (type === "weekly") data = (await getWeightLogsWeekly()).data;
      if (type === "monthly") data = (await getWeightLogsMonthly()).data;
      if (type === "range")
        data = (await getWeightLogsRange(range.start, range.end)).data;
    }

    setFilter(type);
    setLogs(data);
  };

  useEffect(() => {
    loadLogs("all");
  }, [tab]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Log Riwayat</h2>

      {/* Tabs */}
      <div className="mb-4 flex gap-4">
        {["feed", "weight"].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setTab(t);
              setFilter("all");
              setRange({ start: "", end: "" });
            }}
          >
            {t === "feed" ? "Isi Ulang Pakan" : "Berat Ayam"}
          </button>
        ))}
      </div>
      {tab === "feed" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Tambah Data Isi Pakan</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!amountKg) return;
              await postFeedRefill(parseFloat(amountKg));
              setAmountKg("");
              loadLogs("all");
            }}
            className="flex gap-4 items-center flex-wrap"
          >
            <input
              type="number"
              placeholder="Jumlah (kg)"
              step="0.01"
              value={amountKg}
              onChange={(e) => setAmountKg(e.target.value)}
              className="p-2 border rounded"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Simpan
            </button>
          </form>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <button onClick={() => loadLogs("all")} className="">
          Semua
        </button>
        <button onClick={() => loadLogs("weekly")} className="btn">
          Mingguan
        </button>
        <button onClick={() => loadLogs("monthly")} className="btn">
          Bulanan
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadLogs("range");
          }}
          className="flex gap-2 items-center"
        >
          <input
            type="date"
            value={range.start}
            onChange={(e) => setRange({ ...range, start: e.target.value })}
            className="border p-1 rounded w-7 md:w-auto"
          />
          <input
            type="date"
            value={range.end}
            onChange={(e) => setRange({ ...range, end: e.target.value })}
            className="border p-1 rounded w-7 md:w-auto"
          />
          <button
            type="submit"
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tampilkan
          </button>
        </form>
      </div>

      {/* Logs Display */}
      {filter === "weekly" || filter === "monthly" ? (
        <GroupedLogs
          data={logs}
          groupType={filter === "weekly" ? "week" : "month"}
          tab={tab}
        />
      ) : (
        <table className="min-w-full bg-white border mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">Waktu</th>
              <th className="text-left px-4 py-2">
                {tab === "feed" ? "Jumlah Pakan (kg)" : "Berat Ayam (gram)"}
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => {
              const rawDate = tab === "feed" ? log.refill_time : log.weigh_time;
              const value = tab === "feed" ? log.amount_kg : log.weight_grams;

              const formatted = rawDate
                ? new Date(rawDate).toLocaleString("id-ID", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-";

              return (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{formatted}</td>
                  <td className="px-4 py-2">{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Form Tambah Feed Refill */}
    </div>
  );
};

export default LogsPage;
