import axios from "axios";
import type { AxiosInstance } from "axios";
import { tokenStore } from "./tokenStore";

export const api: AxiosInstance = axios.create({
    baseURL: "https://nzusi.wizards.co.in/api",
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.request.use((config) => {
    const token = tokenStore.getAccessToken();
    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
});