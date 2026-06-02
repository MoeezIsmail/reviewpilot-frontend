import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../components/toast/ToastProvider.jsx";
import { authApi } from "../api/axios.js";

const AuthSuccess = () => {
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const code = searchParams.get("code");

        if (!code) {
            addToast("Authentication failed. Please try again.", 'error');
            navigate("/auth");
            return;
        }

        authApi.post('/exchange-token', { code })
            .then(({ data }) => {
                localStorage.setItem("isGoogleUser", "true");

                if (data.isNewUser) {
                    addToast("Welcome to ReviewPilot!", 'success');
                    navigate("/connect-platforms", { replace: true });
                } else if (!data.isAnyPlatformConnected) {
                    addToast("Welcome back! Please reconnect your business.", 'info');
                    navigate("/settings", { replace: true });
                } else {
                    addToast("Welcome back!", 'success');
                    navigate("/", { replace: true });
                }
            })
            .catch(() => {
                addToast("Authentication failed. Please try again.", 'error');
                navigate("/auth", { replace: true });
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Connecting your account...</p>
        </div>
    );
};

export default AuthSuccess;
