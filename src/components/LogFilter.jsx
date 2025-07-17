const LogFilter = ({ loadLogs, range, setRange, view }) => {
  return (
    <div className="flex gap-3 mb-4 flex-wrap">
      <button
        onClick={() => loadLogs("all")}
        className={`btn ${view === "all" && "bg-blue-600 text-white"}`}
      >
        Semua
      </button>
      <button
        onClick={() => loadLogs("weekly")}
        className={`btn ${view === "weekly" && "bg-blue-600 text-white"}`}
      >
        Mingguan
      </button>
      <button
        onClick={() => loadLogs("monthly")}
        className={`btn ${view === "monthly" && "bg-blue-600 text-white"}`}
      >
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
          className="border p-1 rounded"
        />
        <input
          type="date"
          value={range.end}
          onChange={(e) => setRange({ ...range, end: e.target.value })}
          className="border p-1 rounded"
        />
        <button type="submit" className="btn bg-blue-500 text-white">
          Tampilkan
        </button>
      </form>
    </div>
  );
};
export default LogFilter;
