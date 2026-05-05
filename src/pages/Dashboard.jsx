import React, {useEffect, useRef, useState} from "react";
import DashboardCards from "../components/DashboardCards";
import RecentReviews from "../components/RecentReviews";
import ReplyPerformance from "../components/ReplyPerformance";
import { useReviews } from "../context/ReviewsContext.jsx";
import calculateStats from "../utils/reviewAnalytics.js";
import {useNavigate} from "react-router-dom";
import {useToast} from "../components/ToastProvider.jsx";
import Button from "../includes/Button.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const Dashboard = () => {
    const { reviewsData, isAnyPlatformConnected, refreshReviews, loading  } = useReviews();
    const { loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const {addToast} = useToast();
    const [stats, setStats] = useState({
        totalReviews: 0,
        averageRating: 0,
        positiveReviews: 0,
        negativeReviews: 0,
    });

    useEffect(() => {
        if (reviewsData?.reviews) {
            setStats(calculateStats(reviewsData.reviews));
        }
    }, [reviewsData]);

    useEffect(() => {
        if (!authLoading && isAnyPlatformConnected === false) {
            addToast('No platform connected!', 'error');
            navigate('/settings');
        }
    }, [isAnyPlatformConnected, authLoading]);

    if (!reviewsData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <DashboardCards stats={stats} />

            <div className="flex justify-end w-full">
                <Button  disabled={loading} onClick={refreshReviews} loading={loading} children={`${loading ? "Refreshing..." : "Refresh Reviews"}`}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentReviews reviews={reviewsData?.reviews} />
                <ReplyPerformance />
            </div>
        </div>
    );
};

export default Dashboard;