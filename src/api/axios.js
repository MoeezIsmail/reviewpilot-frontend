import axios from "axios"

export const reviewsApi = axios.create({
    baseURL: "http://localhost:5000/api/reviews"
})

export const authApi = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
})

export const authProtectedApi = axios.create({
    baseURL: "http://localhost:5000/api/auth",
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