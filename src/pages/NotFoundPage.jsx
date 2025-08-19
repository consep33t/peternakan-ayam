import { GiChicken, GiCow, GiFarmTractor, GiEggClutch } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300 text-center px-6">
      <div className="flex flex-col items-center gap-4">
        <GiChicken className="text-8xl text-yellow-600 animate-bounce" />
        <h1 className="text-6xl font-bold text-green-900">404</h1>
        <h2 className="text-2xl font-semibold text-green-800">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-green-700 max-w-lg">
          Sepertinya kamu tersesat di kandang ayam 🐓 atau ladang yang salah 🚜.
          Jangan khawatir, mari kembali ke halaman utama.
        </p>
        <div className="flex gap-4 mt-6">
          <GiCow className="text-5xl text-brown-700 animate-pulse" />
          <GiEggClutch className="text-5xl text-yellow-500 animate-pulse" />
          <GiFarmTractor className="text-5xl text-green-700 animate-pulse" />
        </div>
        <Link
          to="/"
          className="btn btn-primary mt-8 shadow-lg hover:scale-105 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
