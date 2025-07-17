function WeightDisplay({ weight }) {
  const unit = weight >= 1000 ? "kg" : "g";
  const displayWeight = weight >= 1000 ? (weight / 1000).toFixed(2) : weight;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold">Berat Ayam</h2>
      <p>
        {displayWeight} {unit}
      </p>
    </div>
  );
}
export default WeightDisplay;
