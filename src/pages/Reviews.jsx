import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../context/ReviewsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/toast/ToastProvider.jsx";
import ReviewsTable from "../components/reviews/ReviewTable";
import { Star } from "lucide-react";

const Reviews = () => {
    const { isAnyPlatformConnected, loading, reviewsData } = useReviews();
    const { loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        if (authLoading || loading) return;
        if (isAnyPlatformConnected === false) {
            addToast("Please connect a platform first.", "error");
            navigate("/settings");
        }
    }, [isAnyPlatformConnected, authLoading, loading]);

    return (
        <div className="space-y-5">
            {/* Page header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Star size={18} className="text-indigo-500" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Reviews</h1>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage, reply to, and track all your Google Business reviews.
                        {reviewsData?.totalReviewCount > 0 && (
                            <span className="ml-1 font-medium text-indigo-600 dark:text-indigo-400">
                                {reviewsData.totalReviewCount} total
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <ReviewsTable />
        </div>
    );
};

export default Reviews;
