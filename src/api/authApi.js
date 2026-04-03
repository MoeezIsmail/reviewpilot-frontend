import { authProtectedApi } from "./axios";

export const getProfile = async () => {
    return await authProtectedApi.get('/profile');
};

export const saveBusinessInfo = async ({ userName, businessName, businessType }) => {
    return await authProtectedApi.post('/business-info', { userName, businessName, businessType });
};