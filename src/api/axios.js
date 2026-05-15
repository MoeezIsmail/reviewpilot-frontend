import axios from "axios"
import { BACKEND_URL } from "../constants/urls.js";

export const reviewsApi = axios.create({
    baseURL: `${BACKEND_URL}/api/reviews`
})

export const authApi = axios.create({
    baseURL: `${BACKEND_URL}/api/auth`,
    headers: {
        "Content-Type": "application/json",
    },
})

export const authProtectedApi = axios.create({
    baseURL: `${BACKEND_URL}/api/auth`,
    headers: {
        "Content-Type": "application/json",
    },
});

const attachAuthHeader = (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
};

const handle401 = (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("isGoogleUser");
        window.location.href = "/auth";
    }
    return Promise.reject(error);
};

reviewsApi.interceptors.request.use(attachAuthHeader);
reviewsApi.interceptors.response.use(r => r, handle401);

authProtectedApi.interceptors.request.use(attachAuthHeader);
authProtectedApi.interceptors.response.use(r => r, handle401);