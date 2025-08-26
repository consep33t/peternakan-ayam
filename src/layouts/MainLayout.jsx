import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineSchedule,
  AiOutlineFileText,
} from "react-icons/ai";

const navItems = [
  { name: "Beranda", path: "/", icon: <AiOutlineHome size={24} /> },
  {
    name: "Jadwal",
    path: "/schedule",
    icon: <AiOutlineSchedule size={24} />,
  },
  { name: "Riwayat", path: "/logs", icon: <AiOutlineFileText size={24} /> },
];

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Desktop Navbar */}
      <nav
        className="bg-white shadow p-4 border-b border-gray-300 sticky top-0 z-50"
        style={{ display: window.innerWidth >= 768 ? "flex" : "none" }}
      >
        <div className="flex justify-center gap-12 w-full max-w-5xl mx-auto">
          {navItems.map(({ name, path, icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-100"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow mb-20 p-4 mx-auto w-full">
        <Outlet />
      </main>

      {/* Mobile Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-around items-center py-2 md:hidden z-50">
        {navItems.map(({ name, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center text-xs transition-colors ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div className="text-2xl">{icon}</div>
              <span className="mt-1">{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
