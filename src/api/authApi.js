import { authProtectedApi } from "./axios";

export const getProfile = async () => {
    return await authProtectedApi.get('/profile');
};

export const saveBusinessInfo = async ({ userName, businessName, businessType }) => {
    return await authProtectedApi.post('/business-info', { userName, businessName, businessType });
};

export const updateBusinessInfo = async ({ businessName, businessType }) => {
    return await authProtectedApi.patch('/business-info', { businessName, businessType });
};

export const deleteAccount = async () => {
    return await authProtectedApi.delete('/account');
};