import axios from "axios";
import { BACKEND_URL } from "../constants/urls.js";

const subscriptionApi = axios.create({
    baseURL: `${BACKEND_URL}/api/subscription`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

subscriptionApi.interceptors.response.use(
    r => r,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem("isGoogleUser");
            window.location.href = "/auth";
        }
        return Promise.reject(error);
    }
);

export const fetchCurrentPlan = () => subscriptionApi.get('/current');
export const fetchPlans = () => subscriptionApi.get('/plans');
export const createCheckoutSession = ({ plan, gateway, billingPeriod }) => subscriptionApi.post('/checkout', { plan, gateway, billingPeriod });
export const createPortalSession = () => subscriptionApi.post('/portal');
export const cancelPlan = () => subscriptionApi.post('/cancel');
export const upgradePlan = (plan) => subscriptionApi.post('/upgrade', { plan });
export const verifyCheckoutSession = (sessionId) => subscriptionApi.post('/verify-session', { sessionId });
export const reactivatePlan = () => subscriptionApi.post('/reactivate');
