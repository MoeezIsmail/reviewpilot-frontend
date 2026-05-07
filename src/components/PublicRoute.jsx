import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
                <div className="w-72 rounded-2xl bg-white shadow-sm p-8 animate-pulse">
                    <div className="h-8 bg-indigo-100 rounded w-40 mx-auto mb-6" />
                    <div className="h-10 bg-gray-200 rounded-lg mb-3" />
                    <div className="h-10 bg-gray-200 rounded-lg mb-6" />
                    <div className="h-11 bg-indigo-200 rounded-lg" />
                </div>
            </div>
        );
    }

    if (user) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default PublicRoute;
