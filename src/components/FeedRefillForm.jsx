import { useState } from "react";
import { postFeedRefill } from "../services/api";

const FeedRefillForm = ({ onSuccess }) => {
  const [amountKg, setAmountKg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amountKg) return;
    await postFeedRefill(parseFloat(amountKg));
    setAmountKg("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center flex-wrap">
      <input
        type="number"
        step="0.01"
        placeholder="Jumlah (kg)"
        value={amountKg}
        onChange={(e) => setAmountKg(e.target.value)}
        className="p-2 border rounded"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
};

export default FeedRefillForm;
