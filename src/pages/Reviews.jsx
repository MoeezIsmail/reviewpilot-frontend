import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../context/ReviewsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/toast/ToastProvider.jsx";
import ReviewsTable from "../components/reviews/ReviewTable";
import { MessageSquare, Star } from "lucide-react";

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
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reviews</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Manage and reply to your Google Business reviews
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {reviewsData?.totalReviewCount > 0 && (
                        <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-sm">
                            <MessageSquare size={13} className="text-indigo-500" />
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 tabular-nums">
                                {reviewsData.totalReviewCount} reviews
                            </span>
                        </div>
                    )}
                    {reviewsData?.averageRating > 0 && (
                        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800 rounded-xl px-3 py-2">
                            <Star size={13} className="text-amber-500 fill-amber-400" />
                            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 tabular-nums">
                                {reviewsData.averageRating}★
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <ReviewsTable />
        </div>
    );
};

export default Reviews;
