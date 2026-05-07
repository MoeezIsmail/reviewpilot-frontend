import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../context/ReviewsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import AnalyticsCharts from "../components/analytics/AnalyticsCharts.jsx";

const Analytics = () => {
    const { isAnyPlatformConnected, loading } = useReviews();
    const { loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        if (authLoading || loading) return;
        if (isAnyPlatformConnected === false) {
            addToast('Please connect a platform first.', 'error');
            navigate('/settings');
        }
    }, [isAnyPlatformConnected, authLoading, loading]);

    return <AnalyticsCharts />;
};

export default Analytics;
