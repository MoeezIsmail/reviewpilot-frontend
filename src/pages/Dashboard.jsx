import React, {useEffect, useState} from "react";
import DashboardCards from "../components/dashboard/DashboardCards";
import RecentReviews from "../components/dashboard/RecentReviews";
import ReplyPerformance from "../components/dashboard/ReplyPerformance";
import { useReviews } from "../context/ReviewsContext.jsx";
import calculateStats from "../utils/reviewAnalytics.js";
import {useNavigate} from "react-router-dom";
import {useToast} from "../components/toast/ToastProvider.jsx";
import Button from "../components/ui/Button.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton.jsx";

const Dashboard = () => {
    const { reviewsData, allReviews, isAnyPlatformConnected, loading  } = useReviews();
    const { loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [stats, setStats] = useState({
        totalReviews: 0,
        averageRating: 0,
        positiveReviews: 0,
        negativeReviews: 0,
    });

    useEffect(() => {
        if (reviewsData?.reviews) {
            setStats(calculateStats({
                reviews: allReviews,
                averageRating: reviewsData.averageRating,
                totalReviewCount: reviewsData.totalReviewCount,
            }));
        }
    }, [allReviews, reviewsData.averageRating]);

    useEffect(() => {
        if (authLoading || loading) return;

        if (isAnyPlatformConnected === false) {
            addToast('Please connect a platform first.', 'error');
            navigate('/settings');
        }

    }, [isAnyPlatformConnected, authLoading, loading]);

    if (!reviewsData) return <DashboardSkeleton />;

    return (
        <div className="space-y-6">
            <DashboardCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentReviews reviews={allReviews} />
                <ReplyPerformance />
            </div>
        </div>
    );
};

export default Dashboard;