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
      <div className="bg-white p-6 rounded mb-6 border border-black shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Log Riwayat</h2>
        {/* Tabs */}
        <div className="mb-4 flex gap-4">
          {["feed", "weight"].map((t) => (
            <button
              key={t}
              className={`btn btn-warning ${
                tab === t ? "text-black" : "btn-outline"
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
      </div>

      {/* Filter Section */}
      <div className="flex gap-3 mb-4 flex-wrap bg-white items-center p-4 rounded border border-black shadow-xl justify-center md:justify-normal">
        {tab === "feed" && (
          <div className="flex justify-center md:justify-start md:flex-row flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">
              Tambah Data Isi Pakan
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!amountKg) return;
                await postFeedRefill(parseFloat(amountKg));
                setAmountKg("");
                loadLogs("all");
              }}
              className="flex gap-2 md:gap-4 items-center"
            >
              <input
                type="number"
                placeholder="Jumlah (kg)"
                step="0.01"
                value={amountKg}
                onChange={(e) => setAmountKg(e.target.value)}
                className="p-2 border rounded md:w-auto w-full bg-slate-300"
              />
              <button className="btn btn-success">Simpan</button>
            </form>
          </div>
        )}
        <div className="w-full">
          <h2 className="mb-3 text-md font-semibold">
            Filter Berdasarkan Kategori
          </h2>
          <div className="md:flex-row flex flex-col w-full">
            <select
              value={filter}
              onChange={(e) => {
                const val = e.target.value;
                if (val !== "range") {
                  loadLogs(val);
                }
                setFilter(val);
              }}
              className="border rounded px-3 py-2 bg-slate-300 w-full md:w-auto"
            >
              <option value="all">Semua</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
              <option value="range">Rentang Tanggal</option>
            </select>
            {filter === "range" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loadLogs("range");
                }}
                className="flex flex-col md:flex-row ml-0 md:ml-3 mt-3 md:mt-0 gap-2 w-full"
              >
                <div className="flex flex-col md:flex-row w-full gap-2">
                  <input
                    type="date"
                    value={range.start}
                    onChange={(e) =>
                      setRange({ ...range, start: e.target.value })
                    }
                    className="border p-1 rounded bg-slate-300 w-full md:w-auto"
                  />
                  <span className="hidden md:inline-block">-</span>
                  <span className="md:hidden text-center">s/d</span>
                  <input
                    type="date"
                    value={range.end}
                    onChange={(e) =>
                      setRange({ ...range, end: e.target.value })
                    }
                    className="border p-1 rounded bg-slate-300 w-full md:w-auto"
                  />
                </div>
                <button type="submit" className="btn btn-info w-full md:w-auto">
                  Tampilkan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Logs Display */}
      {filter === "weekly" || filter === "monthly" ? (
        <GroupedLogs
          data={logs}
          groupType={filter === "weekly" ? "week" : "month"}
          tab={tab}
        />
      ) : (
        <table className="min-w-full bg-white rp border mb-8 shadow-xl">
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
    </div>
  );
};

export default LogsPage;
