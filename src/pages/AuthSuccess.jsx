import {useEffect, useRef} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {useToast} from "../components/ToastProvider.jsx";
import NotFound from "./NotFound.jsx";

const AuthSuccess = () => {
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();
    const { saveToken, user } = useAuth();
    const navigate = useNavigate();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const token = searchParams.get("token");
        const isNewUser = searchParams.get("isNewUser") === "true";
        const isAnyPlatformConnected = searchParams.get("isAnyPlatformConnected") === "true";

        if (token) {
            saveToken(token);
            localStorage.setItem("isGoogleUser", "true");

            if (isNewUser || !isAnyPlatformConnected) {
                addToast("Welcome to ReviewPilot!", 'success');
                console.log('navigating to connect-platform');
                navigate("/connect-platforms");
            } else {
                addToast("Pleasure to see you back!", 'success');
                navigate("/");
            }
        } else {
            addToast("Error: please tru again!", 'error');
            navigate("/auth?error=google_failed");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Connecting your account...</p>
        </div>
    );
}

export default AuthSuccess;