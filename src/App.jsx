import { useEffect } from "react";
import {Routes, Route, Navigate, Outlet} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Reviews from "./pages/Reviews"
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";
import Subscription from "./pages/Subscription.jsx";
import Terms from "./pages/Terms.jsx";
import axios from "axios";
import AuthSuccess from "./pages/AuthSuccess.jsx";
import ConnectPlatforms from "./pages/ConnectPlatforms.jsx";
import Auth from "./pages/Auth.jsx";
import OnboardingInfo from "./pages/OnboardingInfo.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Layout from "./components/layout/Layout.jsx";
import AppShellSkeleton from "./components/skeletons/AppShellSkeleton.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import { useToast } from "./components/toast/ToastProvider.jsx";

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const token = localStorage.getItem("token")
            if (token) {
                localStorage.removeItem("token")
                window.location.href = "/auth"
            }
        }
        return Promise.reject(error)
    }
)

const OnboardingGuard = () => {
    const { user, loading } = useAuth();

    if (loading) return <AppShellSkeleton />;

    if (user?.onboardingCompleted) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

const App = () => {
    const { error } = useAuth();
    const { addToast } = useToast();

    useEffect(() => {
        if (error) addToast(error, "error");
    }, [error]);

    return (
        <Routes>
            <Route path="/terms" element={<Terms />} />

            <Route element={<PublicRoute />}>
                <Route path="/auth" element={<Auth />} />
            </Route>

            <Route path="/auth/success" element={<AuthSuccess />} />

            <Route element={<ProtectedRoute />}>

                <Route element={<OnboardingGuard />}>
                    <Route path="/connect-platforms" element={<ConnectPlatforms />} />
                    <Route path="/onboarding" element={<OnboardingInfo />} />
                </Route>

                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/subscription" element={<Subscription />} />
                </Route>

            </Route>
        </Routes>
    )
}

export default App
