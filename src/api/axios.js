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

reviewsApi.interceptors.request.use(config => {

    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

authProtectedApi.interceptors.request.use(config => {

    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})