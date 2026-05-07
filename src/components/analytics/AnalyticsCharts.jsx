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
    const { reviewsData, replyStatus, loading } = useReviews();
    const reviews = reviewsData.reviews || [];

    const monthlyData = useMemo(() => groupReviewsByMonth(reviews), [reviews]);
    const ratingDist = useMemo(() => getRatingDistribution(reviews), [reviews]);
    const responseRate = useMemo(() => getResponseRate(reviews, replyStatus), [reviews, replyStatus]);
    const sentiment = useMemo(() => getSentimentBreakdown(reviews), [reviews]);

    if (loading) return <AnalyticsSkeleton />;

    if (!reviews.length) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-400 text-sm">No reviews data available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Summary Cards */}
            <AnalyticsSummaryCards
                reviews={reviews}
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