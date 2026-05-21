import {useEffect, useRef, useState} from "react";
import {useToast} from "../components/toast/ToastProvider.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ArrowRight, CheckCircle2} from 'lucide-react';
import Button from "../components/ui/Button.jsx";
import { authProtectedApi } from "../api/axios.js";
import PlatformCard from "../components/platforms/PlatformCard.jsx";
import PLATFORMS from "../utils/connectPlatformUtils.jsx";
import {BACKEND_URL} from "../constants/urls.js";
import {useAuth} from "../context/AuthContext.jsx";

export default function ConnectPlatforms() {
    const {addToast} = useToast();
    const {user, loading} = useAuth();
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

        // ← Errors handle karo
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
        <div className="min-h-screen w-screen flex items-center justify-center !bg-gray-50 dark:!bg-gray-900">
            <div className="!bg-white dark:!bg-gray-800 p-10 rounded-xl shadow-lg w-[520px]">

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
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600 mx-2"/>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Business Info</span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-1 text-black dark:text-white">Connect Your Platforms</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
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
                    Continue <ArrowRight size={18}/>
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    You can connect more platforms later from Settings
                </p>
            </div>
        </div>
    );
}