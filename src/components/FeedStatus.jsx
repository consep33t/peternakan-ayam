function FeedStatus({ level }) {
  let status = "HABIS";
  if (level < 5) status = "FULL";
  else if (level < 15) status = "SEDANG";

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold">Feed Level</h2>
      <p>{level} cm</p>
      <p className="text-sm text-gray-600">{status}</p>
    </div>
  );
}
export default FeedStatus;
