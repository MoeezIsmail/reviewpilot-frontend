import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTPRequest, verifyOTPRequest } from "../api/otpApi.js";
import { useAuth } from "../context/AuthContext.jsx";

const useOtpForm = (addToast) => {
    const navigate = useNavigate();
    const { saveToken } = useAuth();

    const [step, setStep] = useState("auth");   // "auth" | "otp"
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = () => {
        if (!email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email is invalid";
        return null;
    };

    const handleSendOTP = async () => {
        console.log('OTP')
        const emailError = validateEmail();
        if (emailError) { setErrors({ email: emailError }); return; }
        setErrors({});
        setLoading(true);
        try {
            await sendOTPRequest(email);
            addToast("OTP sent to your email!", "success");
            setStep("otp");
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to send OTP", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleVerifyOTP = async () => {
        const otpValue = otp.join("");
        if (otpValue.length < 6) { setErrors({ otp: "Enter complete 6-digit OTP" }); return; }
        setErrors({});
        setLoading(true);
        try {
            const res = await verifyOTPRequest(email, otpValue);
            saveToken(res.data.token);
            localStorage.setItem("isGoogleUser", "false");
            addToast("Verified successfully!", "success");

            if (res.data.isNewUser || !res.data.isAnyPlatformConnected) {
                navigate("/connect-platforms");
            } else {
                navigate("/");
            }
        } catch (err) {
            addToast(err.response?.data?.message || "Invalid OTP", "error");
        } finally {
            setLoading(false);
        }
    };

    const resetOtp = () => {
        setStep("auth");
        setOtp(["", "", "", "", "", ""]);
        setErrors({});
    };

    return {
        step, email, setEmail,
        otp, loading, errors,
        handleSendOTP,
        handleOtpChange,
        handleOtpKeyDown,
        handleVerifyOTP,
        resetOtp,
    };
}

export default useOtpForm;