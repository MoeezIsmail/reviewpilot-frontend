const SummaryCard = ({ title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-5">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${color || "text-gray-900"}`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
);

const AnalyticsSummaryCards = ({ reviews, responseRate, sentiment }) => {
    const RATING_MAP = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
    const total = reviews.length;
    const avgRating = total
        ? (reviews.reduce((sum, r) => sum + (RATING_MAP[r.starRating] || 0), 0) / total).toFixed(1)
        : 0;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
                title="Total Reviews"
                value={total}
                subtitle="All time"
                color="text-indigo-600"
            />
            <SummaryCard
                title="Average Rating"
                value={`${avgRating}★`}
                subtitle="Across all reviews"
                color="text-yellow-500"
            />
            <SummaryCard
                title="Response Rate"
                value={`${responseRate}%`}
                subtitle="Reviews with replies"
                color={responseRate >= 70 ? "text-green-600" : "text-orange-500"}
            />
            <SummaryCard
                title="Positive Reviews"
                value={`${sentiment.positive}`}
                subtitle={`${Math.round((sentiment.positive / (total || 1)) * 100)}% of total`}
                color="text-green-600"
            />
        </div>
    );
};

export default AnalyticsSummaryCards;