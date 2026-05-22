import { MessageCircle, TrendingUp, CalendarDays, Star } from "lucide-react";

const AnalyticsSummaryCards = ({ responseRate, sentiment, monthlyData, ratingDist, allReviews }) => {
    const total = allReviews.length || 1;
    const positivePct = Math.round((sentiment.positive / total) * 100);

    // Reviews in the current month (or most recent month if no data yet this month)
    const currentMonthKey = new Date().toISOString().slice(0, 7);
    const currentMonthData = monthlyData?.find(m => m.key === currentMonthKey);
    const thisMonthCount = currentMonthData?.count
        ?? monthlyData?.[monthlyData.length - 1]?.count
        ?? 0;
    const thisMonthLabel = currentMonthData
        ? "This month"
        : (monthlyData?.[monthlyData.length - 1]?.label ?? "Recent month");

    // 5-star rate
    const fiveStarEntry = ratingDist?.find(r => r.star === 5);
    const fiveStarPct = fiveStarEntry?.percentage ?? 0;
    const fiveStarCount = fiveStarEntry?.count ?? 0;

    const responseColor = responseRate >= 70
        ? "text-emerald-600 dark:text-emerald-400"
        : responseRate >= 40 ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";

    const cards = [
        {
            title: "Response Rate",
            value: `${responseRate}%`,
            subtitle: "Reviews with replies",
            icon: MessageCircle,
            iconBg: responseRate >= 70 ? "bg-emerald-50 dark:bg-emerald-900/40" : "bg-orange-50 dark:bg-orange-900/40",
            iconColor: responseRate >= 70 ? "text-emerald-500 dark:text-emerald-400" : "text-orange-500 dark:text-orange-400",
            valueColor: responseColor,
        },
        {
            title: "Positive Rate",
            value: `${positivePct}%`,
            subtitle: `${sentiment.positive} of ${total} reviews`,
            icon: TrendingUp,
            iconBg: "bg-violet-50 dark:bg-violet-900/40",
            iconColor: "text-violet-500 dark:text-violet-400",
            valueColor: "text-violet-600 dark:text-violet-400",
        },
        {
            title: thisMonthLabel,
            value: thisMonthCount,
            subtitle: "New reviews",
            icon: CalendarDays,
            iconBg: "bg-indigo-50 dark:bg-indigo-900/40",
            iconColor: "text-indigo-500 dark:text-indigo-400",
            valueColor: "text-indigo-600 dark:text-indigo-300",
        },
        {
            title: "5-Star Reviews",
            value: `${fiveStarPct}%`,
            subtitle: `${fiveStarCount} reviews rated 5 ★`,
            icon: Star,
            iconBg: "bg-amber-50 dark:bg-amber-900/40",
            iconColor: "text-amber-500 dark:text-amber-400",
            valueColor: "text-amber-600 dark:text-amber-400",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => {
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
