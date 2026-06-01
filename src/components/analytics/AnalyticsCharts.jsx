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
import { Database } from "lucide-react";

const AnalyticsCharts = () => {
    const { analyticsData, replyStatus } = useReviews();
    const { reviews, totalReviewCount } = analyticsData;

    // All heavy analytics computed here so sub-components receive plain data
    const monthlyData  = useMemo(() => groupReviewsByMonth(reviews),                    [reviews]);
    const ratingDist   = useMemo(() => getRatingDistribution(reviews),                  [reviews]);
    const responseRate = useMemo(() => getResponseRate(reviews, replyStatus),           [reviews, replyStatus]);
    const sentiment    = useMemo(() => getSentimentBreakdown(reviews),                  [reviews]);

    if (!reviews.length) {
        return (
            <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-sm">No reviews data available yet.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Data context badge */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-3 py-1">
                    <Database size={11} className="text-indigo-500 dark:text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        {reviews.length.toLocaleString()} reviews analyzed
                        {totalReviewCount > reviews.length
                            ? ` of ${totalReviewCount.toLocaleString()} total`
                            : " · all loaded"
                        }
                    </span>
                </div>
            </div>

            {/* Row 1: Summary Cards */}
            <AnalyticsSummaryCards
                allReviews={reviews}
                responseRate={responseRate}
                sentiment={sentiment}
                monthlyData={monthlyData}
                ratingDist={ratingDist}
            />

            {/* Row 2: Trend — full width */}
            <ReviewTrendChart data={monthlyData} />

            {/* Row 3: Rating Distribution + Sentiment */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                    <RatingDistributionChart data={ratingDist} />
                </div>
                <div className="lg:col-span-3">
                    <SentimentChart sentiment={sentiment} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;
