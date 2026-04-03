import { authProtectedApi } from "./axios.js";

export const getConnectionStatus = async () => {
    return await authProtectedApi.get('/settings/connections');
};