function IRStatus({ ir1, ir2, ir3 }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold">IR Sensor</h2>
      <ul className="text-sm">
        <li>Sensor-1: {ir1 ? "TERDETEKSI" : "TIDAK"}</li>
        <li>Sensor-2: {ir2 ? "TERDETEKSI" : "TIDAK"}</li>
        <li>Sensor-3: {ir3 ? "TERDETEKSI" : "TIDAK"}</li>
      </ul>
    </div>
  );
}
export default IRStatus;
