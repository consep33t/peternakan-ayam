import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManualControl from "./pages/ManualControl";
import SchedulePage from "./pages/SchedulePage";
import MainLayout from "./layouts/MainLayout";
import LogsPage from "./pages/LogsPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manual" element={<ManualControl />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/logs" element={<LogsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
