import { useEffect, useRef, useState } from "react";
import { useToast } from "../components/ToastProvider.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from "../includes/Button.jsx";
import axios from "axios";
import PlatformCard from "../components/PlatformCard.jsx";
import PLATFORMS from "../utils/connectPlatformUtils.jsx";
import { BACKEND_URL } from "../constants/urls.js";

export default function ConnectPlatforms() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [googleConnected, setGoogleConnected] = useState(false);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const google = searchParams.get("google");
        const error = searchParams.get("error");

        if (google === "success") {
            setGoogleConnected(true);
            localStorage.setItem("isGoogleUser", "true");
            addToast("Google Business connected!", "success");
        }

        // ← Errors handle karo
        if (error === "no_business") {
            addToast("No Google Business found on this account. Please use a business account.", "error");
        } else if (error === "state_expired") {
            addToast("Session expired. Try again.", "error");
        } else if (error) {
            addToast("Connection failed. Try again.", "error");
        }
    }, []);

    const handleConnectGoogle = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${BACKEND_URL}/api/auth/google/init`,
                { from: 'connect-platforms' },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            window.location.href = `${BACKEND_URL}/api/auth/google`;
        } catch (err) {
            addToast("Failed to connect Google. Try again.", "error");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center !bg-gray-50">
            <div className="!bg-white p-10 rounded-xl shadow-lg w-[520px]">

                <div className="flex items-center gap-2 mb-8">
                    <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            googleConnected ? "bg-green-500" : "!bg-indigo-600"
                        }`}>
                            {googleConnected
                                ? <span className="text-white text-xs font-bold">✓</span>
                                : <span className="text-white text-xs font-bold">1</span>
                            }
                        </div>
                        <span className={`text-sm font-semibold ${
                            googleConnected ? "text-green-500" : "text-indigo-600"
                        }`}>
                            Connect Platform
                        </span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-2" />
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm text-gray-400">Business Info</span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-1 text-black">Connect Your Platforms</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Connect at least one platform to start managing reviews
                </p>

                <div className="flex flex-col gap-3 mb-6">
                    {PLATFORMS.map((platform) => (
                        <PlatformCard
                            key={platform.id}
                            platform={platform}
                            connected={platform.id === "google" && googleConnected}
                            onConnect={platform.id === "google" ? handleConnectGoogle : undefined}
                        />
                    ))}
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!googleConnected}
                    onClick={() => navigate("/onboarding")}
                >
                    Continue <ArrowRight size={18} />
                </Button>

                <p className="text-xs text-gray-400 text-center mt-4">
                    You can connect more platforms later from Settings
                </p>
            </div>
        </div>
    );
}