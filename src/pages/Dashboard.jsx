import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import DashboardCards from "../components/dashboard/DashboardCards.jsx";
import RecentReviews from "../components/dashboard/RecentReviews.jsx";
import ReplyPerformance from "../components/dashboard/ReplyPerformance.jsx";
import ReviewsSummary from "../components/dashboard/ReviewsSummary.jsx";
import { useReviews } from "../context/ReviewsContext.jsx";
import calculateStats from "../utils/reviewAnalytics.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/toast/ToastProvider.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton.jsx";

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
};

const Dashboard = () => {
    const { reviewsData, allReviews, isAnyPlatformConnected, loading, getReplyPerformanceStats } = useReviews();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [stats, setStats] = useState({
        totalReviews: 0,
        averageRating: 0,
        positiveReviews: 0,
        averageReviews: 0,
        negativeReviews: 0,
    });

    useEffect(() => {
        if (reviewsData?.reviews?.length) {
            setStats(calculateStats({
                reviews: allReviews,
                averageRating: reviewsData.averageRating,
                totalReviewCount: reviewsData.totalReviewCount,
            }));
        }
    }, [allReviews, reviewsData.averageRating, reviewsData.totalReviewCount]);

    useEffect(() => {
        if (authLoading || loading) return;
        if (isAnyPlatformConnected === false) {
            addToast("Please connect a platform first.", "error");
            navigate("/settings");
        }
    }, [isAnyPlatformConnected, authLoading, loading]);

    if (loading && !allReviews.length) return <DashboardSkeleton />;

    const firstName = user?.name?.split(" ")[0] || "there";
    const perfStats = getReplyPerformanceStats();
    const actionCount = (perfStats.pendingCount || 0) + (perfStats.readyCount || 0);

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {getGreeting()}, {firstName} 👋
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Here's your review performance overview.
                    </p>
                </div>
                {actionCount > 0 && (
                    <Link
                        to="/reviews"
                        className="flex items-center gap-2 shrink-0 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
                    >
                        <Zap size={14} />
                        {actionCount} review{actionCount !== 1 ? "s" : ""} need action
                        <ArrowRight size={12} />
                    </Link>
                )}
            </div>

            {/* Stat cards */}
            <DashboardCards stats={stats} />

            {/* AI Summary Hero */}
            <ReviewsSummary reviews={allReviews} stats={stats} />

            {/* Bottom grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentReviews reviews={allReviews} />
                </div>
                <ReplyPerformance />
            </div>
        </div>
    );
};

export default Dashboard;
