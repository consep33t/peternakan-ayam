import { format } from "date-fns";

const GroupedLogs = ({ data, groupType, tab }) => {
  if (!Array.isArray(data)) return null;

  const grouped = {};

  for (const item of data) {
    const year = item.year ?? "Unknown";
    const month = item.month ?? "Unknown";

    const groupKey =
      groupType === "week"
        ? `${year}-${month}-W${item.week_of_month ?? "?"}`
        : `${year}-M${month}`;

    if (!grouped[groupKey]) {
      grouped[groupKey] = {
        year,
        month,
        week: item.week_of_month,
        label:
          groupType === "week"
            ? `Bulan ke-${month} - Minggu ke-${item.week_of_month}`
            : `Bulan ke-${month}`,
        entries: [],
      };
    }

    grouped[groupKey].entries.push(item);
  }

  return (
    <div className="space-y-6">
      {Object.entries(grouped)
        .sort(([a], [b]) => {
          const [yearA, monthA, weekA] = a.match(/\d+/g).map(Number);
          const [yearB, monthB, weekB] = b.match(/\d+/g).map(Number);

          if (yearA !== yearB) return yearB - yearA;
          if (monthA !== monthB) return monthB - monthA;
          return (weekB || 0) - (weekA || 0);
        })
        .map(([key, group]) => (
          <div key={key} className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-semibold mb-2">
              Tahun {group.year} - {group.label}
            </h3>
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Tanggal</th>
                  {tab === "feed" ? (
                    <th className="px-4 py-2">Jumlah Pakan (kg)</th>
                  ) : (
                    <th className="px-4 py-2">Berat Ayam (gram)</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {group.entries.map((item, idx) => {
                  let formattedDate = "-";
                  try {
                    if (item.date) {
                      formattedDate = format(
                        new Date(item.date),
                        "yyyy/MM/dd HH:mm"
                      );
                    }
                  } catch (e) {
                    formattedDate = "Tanggal tidak valid";
                  }

                  return (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{formattedDate}</td>
                      <td className="px-4 py-2">
                        {tab === "feed" ? item.amount_kg : item.weight_grams}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default GroupedLogs;
