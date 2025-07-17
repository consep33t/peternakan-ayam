import { useEffect, useState } from "react";
import {
  fetchSchedules,
  createSchedule,
  disableSchedule,
  enableSchedule,
  deleteSchedule,
} from "../services/api";
import ModeSwitch from "../components/ModeSwitch";
// import RTCSetter from "../components/RTCSetter";

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
      <div className="flex flex-col md:flex md:space-x-4 my-5">
        <div>
          <h2 className="text-2xl font-bold mb-4">Jadwal Otomatisasi Relay</h2>
          <form onSubmit={handleSubmit} className="mb-6 space-y-2">
            <div className="flex gap-4 items-center">
              <select
                value={relayType}
                onChange={(e) => setRelayType(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="feed">Pakan</option>
                <option value="water">Air</option>
              </select>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-2 border rounded"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Tambah Jadwal
              </button>
            </div>
          </form>
        </div>
        <ModeSwitch />
        {/* <RTCSetter /> */}
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">Waktu</th>
            <th className="text-left px-4 py-2">Tipe Relay</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((sch) => (
            <tr key={sch.id} className="border-t">
              <td className="px-4 py-2">
                {sch.hour}:{sch.minute}
              </td>
              <td className="px-4 py-2 capitalize">{sch.type}</td>
              <td className="px-4 py-2">
                {sch.enabled ? (
                  <span className="text-green-600 font-semibold">Aktif</span>
                ) : (
                  <span className="text-gray-500">Nonaktif</span>
                )}
              </td>
              <td className="md:flex flex flex-col items-center justify-center gap-2 py-4 px-4">
                <button
                  onClick={() =>
                    sch.enabled ? handleDisable(sch) : handleEnable(sch)
                  }
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDelete(sch)}
                  className="bg-red-500 text-white px-2 py-1 rounded w-full"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
