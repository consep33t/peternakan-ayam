import { format } from "date-fns";

const LogsTable = ({ logs, tab }) => {
  const formatSafe = (rawDate) => {
    const dt = new Date(rawDate);
    return isNaN(dt.getTime()) ? "-" : format(dt, "yyyy/MM/dd HH:mm");
  };

  return (
    <table className="min-w-full bg-white border mb-8">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left px-4 py-2">Tanggal</th>
          <th className="text-left px-4 py-2">
            {tab === "feed" ? "Jumlah (kg)" : "Berat (gram)"}
          </th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, idx) => {
          const rawDate = log.date || log.refill_time || log.weigh_time;
          const formattedDate = formatSafe(rawDate);
          const jumlah = tab === "feed" ? log.amount_kg : log.weight_grams;

          return (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{formattedDate}</td>
              <td className="px-4 py-2">{jumlah}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LogsTable;
