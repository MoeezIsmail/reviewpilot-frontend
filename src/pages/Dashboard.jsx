import { useEffect, useState } from "react";
import DashboardCards from "../components/dashboard/DashboardCards.jsx";
import RecentReviews from "../components/dashboard/RecentReviews.jsx";
import ReplyPerformance from "../components/dashboard/ReplyPerformance.jsx";
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
    const { reviewsData, allReviews, isAnyPlatformConnected, loading } = useReviews();
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

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {getGreeting()}, {firstName} 👋
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Here's an overview of your review performance.
                </p>
            </div>

            <DashboardCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentReviews reviews={allReviews} />
                <ReplyPerformance />
            </div>
        </div>
    );
};

export default Dashboard;
