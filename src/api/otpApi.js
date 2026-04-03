import { authApi } from "./axios";

export const sendOTPRequest = async (email) => {
    return await authApi.post('/send-otp', { email });
};

export const verifyOTPRequest = async (email, otp) => {
    return await authApi.post('/verify-otp', { email, otp });
};