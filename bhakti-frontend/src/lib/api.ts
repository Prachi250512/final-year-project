import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem("token");

  if (stored) {
    const parsed = JSON.parse(stored);
    config.headers.Authorization = `Bearer ${parsed.token}`;
  }

  return config;
});

export default API;