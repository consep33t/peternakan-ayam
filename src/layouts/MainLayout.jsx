import { Link, Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <nav className="bg-white shadow p-4 flex gap-6">
        <Link
          to="/"
          className={`font-semibold ${
            location.pathname === "/" ? "text-blue-600" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/manual"
          className={`font-semibold ${
            location.pathname === "/manual" ? "text-blue-600" : ""
          }`}
        >
          Kontrol Manual
        </Link>
        <Link
          to="/schedule"
          className={`font-semibold ${
            location.pathname === "/schedule" ? "text-blue-600" : ""
          }`}
        >
          Jadwal
        </Link>
        <Link
          to="/logs"
          className={`font-semibold ${
            location.pathname === "/logs" ? "text-blue-600" : ""
          }`}
        >
          Riwayat
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
