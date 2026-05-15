const SummaryCard = ({ title, value, subtitle, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${color || "text-gray-900 dark:text-gray-100"}`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
);

const AnalyticsSummaryCards = ({ reviews, allReviews, responseRate, sentiment }) => {
    const total = allReviews.length || 0;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
                title="Total Reviews"
                value={reviews.totalReviewCount}
                subtitle="All time"
                color="text-indigo-600 dark:text-indigo-400"
            />
            <SummaryCard
                title="Average Rating"
                value={`${reviews.averageRating}★`}
                subtitle="Across all reviews"
                color="text-yellow-500"
            />
            <SummaryCard
                title="Response Rate"
                value={`${responseRate}%`}
                subtitle="Reviews with replies"
                color={responseRate >= 70 ? "text-green-600 dark:text-green-400" : "text-orange-500"}
            />
            <SummaryCard
                title="Positive Reviews"
                value={`${sentiment.positive}`}
                subtitle={`${Math.round((sentiment.positive / (total || 1)) * 100)}% of total`}
                color="text-green-600 dark:text-green-400"
            />
        </div>
    );
};

export default AnalyticsSummaryCards;
