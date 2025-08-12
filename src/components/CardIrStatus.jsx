import { GiChicken } from "react-icons/gi";

const CardIrStatus = ({ ir1 = 0, ir2 = 0, ir3 = 0 }) => {
  return (
    <div className="card bg-white shadow-xl border border-base-300">
      <div className="card-body w-full">
        <div className="flex justify-center">
          <h2 className="card-title text-center self-center text-xl">
            Status Pakan Ayam
            <GiChicken className="text-4xl text-yellow-500" />
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Pakan 1</span>
            <span
              className={`font-bold ${
                ir1 == 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              {ir1 == 1 ? "Berisi" : "Tidak Berisi"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Pakan 2</span>
            <span
              className={`font-bold ${
                ir2 == 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              {ir2 == 1 ? "Berisi" : "Tidak Berisi"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Pakan 3</span>
            <span
              className={`font-bold ${
                ir3 == 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              {ir3 == 1 ? "Berisi" : "Tidak Berisi"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardIrStatus;
