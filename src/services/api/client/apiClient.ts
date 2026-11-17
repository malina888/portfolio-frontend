import axios from "axios";

const DEFAULT_API_URL = "http://localhost/api/v1";
const TIMEOUT_MS = 10_000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  timeout: TIMEOUT_MS,
});
