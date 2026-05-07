import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../context/ReviewsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import ReviewsTable from "../components/ReviewTable";

const Reviews = () => {
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

    return <ReviewsTable />;
};

export default Reviews;
