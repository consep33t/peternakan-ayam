import { useEffect, useState } from "react";
import {
  fetchSchedules,
  createSchedule,
  disableSchedule,
  enableSchedule,
  deleteSchedule,
} from "../services/api";
import ModeSwitch from "../components/ModeSwitch";
import RTCSetter from "../components/RTCSetter";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [time, setTime] = useState("");
  const [relayType, setRelayType] = useState("feed");

  const loadSchedules = async () => {
    const data = await fetchSchedules();
    setSchedules(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!time) return;

    const [hour, minute] = time.split(":").map(Number);
    await createSchedule({ type: relayType, hour, minute });

    setTime("");
    loadSchedules();
  };

  const handleDisable = async (sch) => {
    await disableSchedule(sch.id);
    loadSchedules();
  };

  const handleEnable = async (sch) => {
    await enableSchedule(sch.id);
    loadSchedules();
  };

  const handleDelete = async (sch) => {
    await deleteSchedule(sch.id);
    loadSchedules();
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Halaman Penjadwalan</h1>
      <div className="flex flex-col md:flex md:flex-row gap-6 mb-6">
        <ModeSwitch />
        <RTCSetter />
      </div>
      <div className="bg-white p-6 rounded mb-6 border border-black shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Jadwal Otomatisasi Relay</h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={relayType}
              onChange={(e) => setRelayType(e.target.value)}
              className="p-2 rounded bg-slate-300"
            >
              <option value="feed">Pakan</option>
              <option value="water">Air</option>
            </select>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border bg-slate-300 rounded"
            />
            <button className="btn-info px-4 py-2 rounded btn btn-md">
              Tambah Jadwal
            </button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded border border-black shadow-xl p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">
                {sch.hour.toString().padStart(2, "0")}:
                {sch.minute.toString().padStart(2, "0")}
              </span>
              <span className="capitalize text-sm text-gray-600">
                {sch.type == "feed" ? "Pakan" : "Air"}
              </span>
            </div>
            <div>
              {sch.enabled ? (
                <span className="text-green-600 font-semibold">Aktif</span>
              ) : (
                <span className="text-gray-500">Nonaktif</span>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  sch.enabled ? handleDisable(sch) : handleEnable(sch)
                }
                className="btn-warning btn px-2 py-1 rounded flex-1"
              >
                {sch.enabled ? "Nonaktifkan" : "Aktifkan"}
              </button>
              <button
                onClick={() => handleDelete(sch)}
                className="btn-error btn px-2 py-1 rounded flex-1"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
