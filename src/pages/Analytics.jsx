import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Lock, Sparkles } from "lucide-react";
import { useReviews } from "../context/ReviewsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/toast/ToastProvider.jsx";
import AnalyticsCharts from "../components/analytics/AnalyticsCharts.jsx";

const AnalyticsGate = () => {
    const navigate = useNavigate();
    return (
        <div className="relative">
            <div className="blur-sm pointer-events-none select-none opacity-50">
                <AnalyticsCharts />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 max-w-sm w-full mx-4 text-center">
                    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BarChart3 size={24} className="text-indigo-500" />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                        <Lock size={14} className="text-gray-500 dark:text-gray-400" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Analytics is a paid feature</h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                        Upgrade to Growth or Pro to unlock review trends, sentiment analysis, and rating distribution.
                    </p>
                    <button
                        onClick={() => navigate("/subscription")}
                        className="w-full py-3 rounded-2xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 shadow-lg shadow-indigo-200 transition-all"
                    >
                        View Plans →
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">No credit card required to start</p>
                </div>
            </div>
        </div>
    );
};

const Analytics = () => {
    const { isAnyPlatformConnected, loading } = useReviews();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const isFreePlan = !user?.subscription?.plan || user?.subscription?.plan === "starter";

    useEffect(() => {
        if (authLoading || loading) return;
        if (isAnyPlatformConnected === false) {
            addToast("Please connect a platform first.", "error");
            navigate("/settings");
        }
    }, [isAnyPlatformConnected, authLoading, loading]);

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Review trends, sentiment analysis, and rating insights
                    </p>
                </div>
                {!isFreePlan && (
                    <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 rounded-xl px-3 py-2 shrink-0">
                        <Sparkles size={12} className="text-indigo-500 dark:text-indigo-400" />
                        <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">AI-powered insights</span>
                    </div>
                )}
            </div>

            {isFreePlan ? <AnalyticsGate /> : <AnalyticsCharts />}
        </div>
    );
};

export default Analytics;
