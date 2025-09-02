import { GiChickenLeg, GiWaterDrop } from "react-icons/gi";

const CardProgres = ({
  title,
  percentage_feed = 0,
  percentage_water = 0,
  type = "feed",
}) => {
  const icon =
    type === "feed" ? (
      <GiChickenLeg className="text-4xl text-yellow-500" />
    ) : (
      <GiWaterDrop className="text-4xl text-blue-500" />
    );

  // Konfigurasi jarak untuk tiap tipe
  const fullDistance = type === "feed" ? 16 : 25;
  const emptyDistance = type === "feed" ? 32 : 45;

  // Pilih nilai sensor yang sesuai tipe
  const sensorValue = type === "feed" ? percentage_feed : percentage_water;

  // Konversi jarak sensor ke persen 0-100%
  const convertedPercentage = Math.max(
    0,
    Math.min(
      ((emptyDistance - sensorValue) / (emptyDistance - fullDistance)) * 100,
      100
    )
  );

  // Status dinamis berdasarkan persen
  let statusColor = "gray-600";
  let statusText = "";

  if (convertedPercentage >= 70) {
    statusColor = "green-500";
    statusText = "FULL";
  } else if (convertedPercentage >= 40) {
    statusColor = "yellow-500";
    statusText = "SEDANG";
  } else {
    statusColor = "red-500";
    statusText = "HABIS";
  }

  return (
    <div className="card bg-white shadow-xl border border-base-300">
      <div className="card-body items-center text-center">
        {/* Icon + Title */}
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="card-title">{title}</h2>
        </div>

        {/* Radial Progress */}
        <div
          className={`radial-progress text-${statusColor}`}
          style={{
            "--value": convertedPercentage,
            "--size": "6rem",
            "--thickness": "8px",
          }}
        >
          <span className={`text-${statusColor}`}>
            {Math.round(convertedPercentage)}%
          </span>
        </div>
        {/* Status Text */}
        <div className="flex gap-2">
          <p className={`mt-2 font-bold text-${statusColor}`}>
            Status: {statusText}
          </p>
          <p className={`mt-2 font-bold`}>
            Jarak:{" "}
            {type === "feed"
              ? `${percentage_feed} CM`
              : `${percentage_water} CM`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProgres;
