import { useToast } from "../components/ToastProvider.jsx";
import GoogleAuthButton from "../components/GoogleAuthButton.jsx";
import OtpInput from "../components/OtpInput.jsx";
import useOtpForm from "../hooks/useOtpForm.js";
import InputField from "../includes/InputField.jsx";
import Button from "../includes/Button.jsx";
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
    const { addToast } = useToast();
    const {
        step, email, setEmail,
        otp, loading, errors,
        handleSendOTP,
        handleOtpChange,
        handleOtpKeyDown,
        handleVerifyOTP,
        resetOtp,
    } = useOtpForm(addToast);

    return (
        <div className="min-h-screen grid grid-cols-2">

            {/* Left Panel */}
            <div className="bg-indigo-600 text-white flex flex-col justify-center items-center p-10">
                <h1 className="text-4xl font-bold mb-6">ReviewPilot</h1>
                <p className="text-lg text-center max-w-md">
                    Manage your business reviews, generate AI replies and improve customer engagement.
                </p>
                <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                    className="mt-10 rounded-xl shadow-xl"
                    alt="dashboard"
                />
            </div>

            {/* Right Panel */}
            <div className="flex items-center justify-center bg-gray-50">
                <div className="bg-white p-10 rounded-xl shadow-lg w-[400px]">

                    {step === "auth" && (
                        <>
                            <h2 className="text-2xl font-bold text-black mb-2">Welcome</h2>
                            <p className="text-gray-500 text-sm mb-6">Sign in or create your account</p>

                            <GoogleAuthButton />

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-gray-400 text-sm">or</span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            <InputField
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                                error={errors.email}
                            />

                            <Button variant="primary" size="lg" fullWidth loading={loading} onClick={handleSendOTP}>
                                {loading ? "Sending OTP..." : "Continue with Email"}
                            </Button>
                        </>
                    )}

                    {step === "otp" && (
                        <>
                            <Button variant="gray" size="lg" fullWidth loading={loading} onClick={resetOtp}>
                                <ArrowLeft/> Back
                            </Button>

                            <h2 className="text-2xl font-bold text-black mb-2">Check your email</h2>
                            <p className="text-gray-500 text-sm mb-6">
                                We sent a 6-digit OTP to{" "}
                                <span className="text-indigo-600 font-medium">{email}</span>
                            </p>

                            <OtpInput
                                otp={otp}
                                onChange={handleOtpChange}
                                onKeyDown={handleOtpKeyDown}
                                error={errors.otp}
                            />

                            <Button variant="primary" size="lg" fullWidth loading={loading} onClick={handleVerifyOTP}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </Button>

                            <p className="text-sm text-center text-gray-500 mt-4">
                                Didn't receive it?{" "}
                                <button onClick={handleSendOTP} className="text-indigo-600 hover:underline">
                                    Resend OTP
                                </button>
                            </p>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Auth;