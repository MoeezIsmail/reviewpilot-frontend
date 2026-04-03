import React, {useEffect, useRef, useState} from "react";
import DashboardCards from "../components/DashboardCards";
import RecentReviews from "../components/RecentReviews";
import ReplyPerformance from "../components/ReplyPerformance";
import { useReviews } from "../context/ReviewsContext.jsx";
import calculateStats from "../utils/reviewAnalytics.js";
import {useNavigate} from "react-router-dom";
import {useToast} from "../components/ToastProvider.jsx";

const Dashboard = () => {
    const { reviewsData, isAnyPlatformConnected  } = useReviews();
    const navigate = useNavigate();
    const {addToast} = useToast();
    const [stats, setStats] = useState({
        totalReviews: 0,
        averageRating: 0,
        positiveReviews: 0,
        negativeReviews: 0,
    });
    const hasRun = useRef(false);

    console.log('reviewsData: ', reviewsData);

    useEffect(() => {
        if (reviewsData && reviewsData.reviews) {
            const newStats = calculateStats(reviewsData.reviews);
            setStats(newStats);
        }
    }, [reviewsData]);

    if (!reviewsData) return <div>Loading...</div>;

    if (!isAnyPlatformConnected) {
        navigate('/connect-platforms');

        if (hasRun.current) return;
        hasRun.current = true;

        addToast('No platform connected!', 'error');
    }

    return (
        <div className="space-y-6">
            <DashboardCards stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentReviews reviews={reviewsData?.reviews} />
                <ReplyPerformance />
            </div>
        </div>
    );
};

export default Dashboard;