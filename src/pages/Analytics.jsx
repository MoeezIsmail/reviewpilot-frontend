import AnalyticsCharts from "../components/analytics/AnalyticsCharts.jsx"
import {useAuth} from "../context/AuthContext.jsx";
import {useReviews} from "../context/ReviewsContext.jsx";
import {useNavigate} from "react-router-dom";
import {useToast} from "../components/ToastProvider.jsx";
import {useEffect} from "react";

export default function Analytics() {

    const { loading: authLoading } = useAuth();
    const { isAnyPlatformConnected } = useReviews();
    const navigate = useNavigate();
    const {addToast} = useToast();

    useEffect(() => {
        if (!authLoading && isAnyPlatformConnected === false) {
            addToast('No platform connected!', 'error');
            navigate('/settings');
        }
    }, [isAnyPlatformConnected, authLoading]);

    return <AnalyticsCharts />
}