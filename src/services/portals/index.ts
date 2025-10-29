import { AxiosInstanceCreator } from "@services/axios";
import { getToken } from "@services/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const portalsApi = new AxiosInstanceCreator(
    `${API_BASE_URL}/api`,
    getToken,
).createApi();
