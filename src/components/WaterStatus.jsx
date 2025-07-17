function WaterStatus({ level }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold">Water Level</h2>
      <p>{level !== -1 ? `${level} cm` : "Tidak Terdeteksi"}</p>
    </div>
  );
}
export default WaterStatus;
