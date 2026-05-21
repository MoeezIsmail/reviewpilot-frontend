import { Star, MessageSquare, MessageCircle, TrendingUp } from "lucide-react";

const cards = (reviews, allReviews, responseRate, sentiment) => {
    const total = allReviews.length || 1;
    const positivePct = Math.round((sentiment.positive / total) * 100);

    return [
        {
            title: "Total Reviews",
            value: reviews.totalReviewCount,
            subtitle: "All time",
            icon: MessageSquare,
            iconBg: "bg-indigo-50 dark:bg-indigo-900/40",
            iconColor: "text-indigo-600 dark:text-indigo-400",
            valueColor: "text-indigo-700 dark:text-indigo-300",
        },
        {
            title: "Average Rating",
            value: `${reviews.averageRating}★`,
            subtitle: "Overall score",
            icon: Star,
            iconBg: "bg-yellow-50 dark:bg-yellow-900/40",
            iconColor: "text-yellow-500 dark:text-yellow-400",
            valueColor: "text-yellow-600 dark:text-yellow-400",
        },
        {
            title: "Response Rate",
            value: `${responseRate}%`,
            subtitle: "Reviews with replies",
            icon: MessageCircle,
            iconBg: responseRate >= 70 ? "bg-emerald-50 dark:bg-emerald-900/40" : "bg-orange-50 dark:bg-orange-900/40",
            iconColor: responseRate >= 70 ? "text-emerald-500 dark:text-emerald-400" : "text-orange-500 dark:text-orange-400",
            valueColor: responseRate >= 70 ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-orange-400",
        },
        {
            title: "Positive Reviews",
            value: `${positivePct}%`,
            subtitle: `${sentiment.positive} of ${total} reviews`,
            icon: TrendingUp,
            iconBg: "bg-emerald-50 dark:bg-emerald-900/40",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            valueColor: "text-emerald-700 dark:text-emerald-300",
        },
    ];
};

const AnalyticsSummaryCards = ({ reviews, allReviews, responseRate, sentiment }) => {
    const cardData = cards(reviews, allReviews, responseRate, sentiment);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cardData.map((card, i) => {
                const Icon = card.icon;
                return (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
                    >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${card.iconBg}`}>
                            <Icon size={16} className={card.iconColor} />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
                        <p className={`text-2xl font-bold ${card.valueColor}`}>{card.value}</p>
                        {card.subtitle && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{card.subtitle}</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default AnalyticsSummaryCards;
