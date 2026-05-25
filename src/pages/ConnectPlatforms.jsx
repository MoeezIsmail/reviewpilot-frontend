import { useEffect, useRef, useState } from "react";
import { useToast } from "../components/toast/ToastProvider.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { authProtectedApi } from "../api/axios.js";
import PlatformCard from "../components/platforms/PlatformCard.jsx";
import PLATFORMS from "../utils/connectPlatformUtils.jsx";
import { BACKEND_URL } from "../constants/urls.js";
import { useAuth } from "../context/AuthContext.jsx";
import AuthBackground from "../components/auth/AuthBackground.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ConnectPlatforms() {
    const { addToast } = useToast();
    const { user, loading } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [googleConnected, setGoogleConnected] = useState(false);
    const hasRun = useRef(false);

    useEffect(() => {
        if (loading) return;

        const google = searchParams.get("google");
        const error = searchParams.get("error");

        if (user?.onboardingCompleted && !google && !error) {
            navigate("/", { replace: true });
            return;
        }

        if (hasRun.current) return;
        hasRun.current = true;

        if (google === "success") {
            setGoogleConnected(true);
            localStorage.setItem("isGoogleUser", "true");
            addToast("Google Business connected!", "success");
        }

        if (error === "no_business") {
            addToast("No Google Business found on this account. Please use a business account.", "error");
        } else if (error === "state_expired") {
            addToast("Session expired. Try again.", "error");
        } else if (error === "no_location") {
            addToast("No business registered to this account. Please connect to another account!", "error");
        } else if (error) {
            addToast("Connection failed. Try again.", "error");
        }
    }, [user, loading]);

    const handleConnectGoogle = async () => {
        try {
            await authProtectedApi.post('/google/init', { from: 'connect-platforms' }, { withCredentials: true });
            window.location.href = `${BACKEND_URL}/api/auth/google`;
        } catch {
            addToast("Failed to connect Google. Try again.", "error");
        }
    };

    return (
        <div className="relative" style={{ height: '100dvh', overflow: 'hidden' }}>
            <AuthBackground isDark={isDark} />

            {/* Theme toggle */}
            <button
                onClick={toggleTheme}
                className={`
                    fixed top-4 right-4 z-20
                    w-9 h-9 rounded-xl flex items-center justify-center
                    border transition-all duration-300 shadow-lg backdrop-blur-md
                    ${isDark
                        ? 'bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20'
                        : 'bg-white/70 border-indigo-200 text-indigo-600 hover:bg-white/90'}
                `}
                aria-label="Toggle theme"
            >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Scrollable content */}
            <div className="relative z-10 h-full overflow-y-auto">
                <div className="min-h-full flex items-center justify-center px-4 py-10">

                    {/* Glass card */}
                    <div
                        className="w-full max-w-[460px]"
                        style={{
                            background: isDark
                                ? 'linear-gradient(145deg, rgba(99,102,241,0.52), rgba(139,92,246,0.42), rgba(168,85,247,0.52))'
                                : 'linear-gradient(145deg, rgba(99,102,241,0.38), rgba(139,92,246,0.26), rgba(168,85,247,0.38))',
                            padding: '1.5px',
                            borderRadius: '22px',
                            boxShadow: isDark
                                ? '0 20px 56px rgba(99,102,241,0.22), 0 0 0 1px rgba(255,255,255,0.03) inset'
                                : '0 20px 56px rgba(99,102,241,0.14), 0 0 0 1px rgba(255,255,255,0.65) inset',
                        }}
                    >
                        <div
                            className="relative rounded-[20.5px] p-7 backdrop-blur-2xl overflow-hidden"
                            style={{
                                background: isDark ? 'rgba(6, 6, 22, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                            }}
                        >
                            {/* Logo */}
                            <div className="flex items-center gap-2.5 mb-7">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg bg-indigo-600 ${isDark ? 'shadow-indigo-900/50' : 'shadow-indigo-300/60'}`}>
                                    RP
                                </div>
                                <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                                    ReviewPilot
                                </span>
                            </div>

                            {/* Step indicator */}
                            <div className="flex items-center mb-7">
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold
                                        ${googleConnected ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'}`}>
                                        {googleConnected ? '✓' : '1'}
                                    </div>
                                    <span className={`text-xs font-semibold
                                        ${googleConnected
                                            ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                                            : isDark ? 'text-white' : 'text-indigo-700'}`}>
                                        Connect Platform
                                    </span>
                                </div>

                                <div className={`flex-1 h-px mx-3 ${isDark ? 'bg-white/12' : 'bg-indigo-100'}`} />

                                <div className="flex items-center gap-2 shrink-0">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold
                                        ${isDark ? 'bg-white/10 text-white/30' : 'bg-gray-100 text-gray-400'}`}>
                                        2
                                    </div>
                                    <span className={`text-xs font-medium ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                                        Business Info
                                    </span>
                                </div>
                            </div>

                            {/* Heading */}
                            <div className="mb-5">
                                <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Connect your platforms
                                </h2>
                                <p className={`text-sm ${isDark ? 'text-indigo-200/50' : 'text-gray-500'}`}>
                                    Connect at least one platform to start managing reviews
                                </p>
                            </div>

                            {/* Platform list */}
                            <div className="flex flex-col gap-2.5 mb-6">
                                {PLATFORMS.map((platform) => (
                                    <PlatformCard
                                        key={platform.id}
                                        platform={platform}
                                        connected={platform.id === "google" && googleConnected}
                                        onConnect={platform.id === "google" ? handleConnectGoogle : undefined}
                                        isDark={isDark}
                                    />
                                ))}
                            </div>

                            {/* Continue button */}
                            <button
                                disabled={!googleConnected}
                                onClick={() => navigate("/onboarding")}
                                className={`
                                    w-full py-3.5 rounded-2xl text-sm font-semibold
                                    flex items-center justify-center gap-2 transition-all duration-200
                                    ${googleConnected
                                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 shadow-lg shadow-indigo-500/25 cursor-pointer'
                                        : isDark
                                            ? 'bg-white/[0.06] text-white/25 cursor-not-allowed border border-white/[0.07]'
                                            : 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200'}
                                `}
                            >
                                Continue <ArrowRight size={15} />
                            </button>

                            <p className={`text-xs text-center mt-4 ${isDark ? 'text-white/22' : 'text-gray-400'}`}>
                                You can connect more platforms later from Settings
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
