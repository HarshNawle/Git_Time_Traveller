import axios from "axios";

const isDev = import.meta.env.DEV;

export const apiClient = axios.create({
  baseURL: isDev ? "/api" : import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});