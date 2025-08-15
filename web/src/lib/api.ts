import axios from "axios";
import { getKC } from "@/app/providers/KeycloakProvider";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const kc = getKC();
  if (kc?.authenticated) {
    await kc.updateToken(30).catch(() => kc.login());
    config.headers.Authorization = `Bearer ${kc.token}`;
  }
  return config;
});
