import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AppShellSkeleton from "../components/skeletons/AppShellSkeleton.jsx";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <AppShellSkeleton />;

    if (!user) return <Navigate to="/auth" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
