import { authProtectedApi } from "./axios.js";

export const fetchCurrentPlan = async () => {
    return await authProtectedApi.get('/subscription/current');
};

export const fetchPlans = async () => {
    return await authProtectedApi.get('/subscription/plans');
};

export const createCheckoutSession = async ({ plan, gateway }) => {
    return await authProtectedApi.post('/subscription/checkout', { plan, gateway });
};

export const createPortalSession = async () => {
    return await authProtectedApi.post('/subscription/portal');
};

export const cancelPlan = async () => {
    return await authProtectedApi.post('/subscription/cancel');
};

// dev/testing only
export const upgradePlan = async (plan) => {
    return await authProtectedApi.post('/subscription/upgrade', { plan });
};
