import axios from "axios";
import { BACKEND_URL } from "../constants/urls.js";

const subscriptionApi = axios.create({
    baseURL: `${BACKEND_URL}/api/subscription`,
    headers: { "Content-Type": "application/json" },
});

subscriptionApi.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const fetchCurrentPlan = () => subscriptionApi.get('/current');
export const fetchPlans = () => subscriptionApi.get('/plans');
export const createCheckoutSession = ({ plan, gateway }) => subscriptionApi.post('/checkout', { plan, gateway });
export const createPortalSession = () => subscriptionApi.post('/portal');
export const cancelPlan = () => subscriptionApi.post('/cancel');
export const upgradePlan = (plan) => subscriptionApi.post('/upgrade', { plan });
