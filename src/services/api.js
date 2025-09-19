import axios from "axios";

const api = axios.create({
  baseURL: "https://api.peternakan-ayam.site/api",
  withCredentials: true,
});

// ============ AUTH ============

// Login
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// Logout
export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// Get Session
export const getSession = async () => {
  const res = await api.get("/auth/session");
  return res.data;
};

// ============ SENSOR & DATA ============

export const fetchLatestData = async () => {
  const response = await api.get("/sensor");
  return response.data;
};

// ====== System Mode ======
export const fetchSystemMode = async () => {
  const res = await api.get("/mode");
  return res.data;
};

export const setSystemMode = async (mode) => {
  const res = await api.post("/mode", { mode });
  return res.data;
};

export const getManualControl = async () => {
  const res = await api.get("/relay");
  return res.data;
};

export const setManualControl = async (data) => {
  const res = await api.post("/relay/control", data);
  return res.data;
};

export const fetchSchedules = async () => {
  const res = await api.get("/schedules");
  return res.data;
};

export const createSchedule = async (scheduleData) => {
  const res = await api.post("/schedules", scheduleData);
  return res.data;
};

export const disableSchedule = async (id, updates) => {
  const res = await api.put(`/schedules/${id}/disable`, updates);
  return res.data;
};

export const enableSchedule = async (id, updates) => {
  const res = await api.put(`/schedules/${id}/enable`, updates);
  return res.data;
};

export const deleteSchedule = async (id, deleteData) => {
  const res = await api.delete(`/schedules/${id}`, { data: deleteData });
  return res.data;
};

// Weight Logs
export const getAllWeightLogs = () => api.get("/weight-logs");
export const getWeightLogsWeekly = () => api.get("/weight-logs/weekly");
export const getWeightLogsMonthly = () => api.get("/weight-logs/monthly");
export const getWeightLogsRange = (start, end) =>
  api.get("/weight-logs/range", { params: { start, end } });

// Feed Logs
export const getAllFeedLogs = () => api.get("/feed-logs");
export const getFeedLogsWeekly = () => api.get("/feed-logs/weekly");
export const getFeedLogsMonthly = () => api.get("/feed-logs/monthly");
export const getFeedLogsRange = (start_date, end_date) =>
  api.get("/feed-logs/range", { params: { start_date, end_date } });

export const postFeedRefill = (amount_kg) =>
  api.post("/feed-logs", { amount_kg });

// ===== RTC Time Setter =====
export const setRTCtime = async (timeData) => {
  const res = await api.post("/time", timeData);
  return res.data;
};

export default api;
