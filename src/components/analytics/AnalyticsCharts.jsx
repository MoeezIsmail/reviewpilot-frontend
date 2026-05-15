import { useMemo } from "react";
import { useReviews } from "../../context/ReviewsContext.jsx";
import {
    groupReviewsByMonth,
    getRatingDistribution,
    getResponseRate,
    getSentimentBreakdown,
} from "../../utils/analyticsUtils.js";
import AnalyticsSummaryCards from "../analytics/AnalyticsSummaryCards.jsx";
import ReviewTrendChart from "../analytics/ReviewTrendChart.jsx";
import RatingDistributionChart from "../analytics/RatingDistributionChart.jsx";
import SentimentChart from "../analytics/SentimentChart.jsx";
import AnalyticsSkeleton from "../skeletons/AnalyticsSkeleton.jsx";

const AnalyticsCharts = () => {
    const { reviewsData, allReviews, replyStatus, loading, totalPagesLoaded } = useReviews();
    const reviews = reviewsData?.reviews

    const monthlyData = useMemo(() => groupReviewsByMonth(allReviews), [allReviews]);
    const ratingDist = useMemo(() => getRatingDistribution(allReviews), [allReviews]);
    const responseRate = useMemo(() => getResponseRate(allReviews, replyStatus), [allReviews, replyStatus]);
    const sentiment = useMemo(() => getSentimentBreakdown(allReviews), [allReviews]);

    if (loading && !allReviews.length) return <AnalyticsSkeleton />;

    if (!reviewsData?.reviews.length) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 dark:text-gray-400 text-sm">No reviews data available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">

            <p className="text-xs text-gray-500 dark:text-gray-400">
                * Based on {allReviews.length} loaded reviews
                {reviewsData.totalReviewCount > allReviews.length
                    ? ` out of ${reviewsData.totalReviewCount} total`
                    : " (all reviews loaded)"
                }
            </p>

            {/* Summary Cards */}
            <AnalyticsSummaryCards
                reviews={reviewsData}
                allReviews={allReviews}
                responseRate={responseRate}
                sentiment={sentiment}
            />

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReviewTrendChart data={monthlyData} />
                <RatingDistributionChart data={ratingDist} />
            </div>

            {/* Charts Row 2 */}
            <SentimentChart sentiment={sentiment} />

        </div>
    );
};

export default AnalyticsCharts;