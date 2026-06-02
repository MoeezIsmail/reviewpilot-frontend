import axios from "axios"
import { BACKEND_URL } from "../constants/urls.js";

export const reviewsApi = axios.create({
    baseURL: `${BACKEND_URL}/api/reviews`,
    withCredentials: true,
})

export const authApi = axios.create({
    baseURL: `${BACKEND_URL}/api/auth`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

export const authProtectedApi = axios.create({
    baseURL: `${BACKEND_URL}/api/auth`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const handle401 = (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("isGoogleUser");
        window.location.href = "/auth";
    }
    return Promise.reject(error);
};

reviewsApi.interceptors.response.use(r => r, handle401);
authProtectedApi.interceptors.response.use(r => r, handle401);
