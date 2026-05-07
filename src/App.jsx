import {Routes, Route, Outlet, Navigate} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Reviews from "./pages/Reviews"
import Sidebar from "./includes/Sidebar.jsx";
import Navbar from "./includes/Navbar.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";
import React, {useEffect, useState} from "react";
import PublicRoute from "./components/PublicRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import axios from "axios";
import AuthSuccess from "./pages/AuthSuccess.jsx";
import ConnectPlatforms from "./pages/ConnectPlatforms.jsx";
import Auth from "./pages/Auth.jsx";
import OnboardingInfo from "./pages/OnboardingInfo.jsx";
import ReviewActions from "./components/ReviewActions.jsx";
import {useAuth} from "./context/AuthContext.jsx";

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

const Layout = () => {
    const [activePage, setActivePage] = useState("Dashboard");

    return (
        <div className="flex h-screen w-screen bg-gray-100">
            <Sidebar setActivePage={setActivePage} />

            <div className="flex flex-col flex-1">

                <Navbar pageTitle={activePage} />

                <main className="p-4 overflow-y-auto bg-gray-100 h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

const OnboardingGuard = () => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (user?.onboardingCompleted) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

const App = () => {
    return (
        <Routes>
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
                </Route>

            </Route>
        </Routes>
    )
}

export default App
