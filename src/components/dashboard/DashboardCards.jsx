import { Star, MessageSquare, ThumbsUp, ThumbsDown, Minus, TrendingUp } from "lucide-react";

const CARD_STYLES = [
    {
        iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        valueColor: "text-indigo-700 dark:text-indigo-300",
        border: "border-l-4 border-indigo-400",
    },
    {
        iconBg: "bg-yellow-100 dark:bg-yellow-900/40",
        iconColor: "text-yellow-600 dark:text-yellow-400",
        valueColor: "text-yellow-700 dark:text-yellow-300",
        border: "border-l-4 border-yellow-400",
    },
    {
        iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        valueColor: "text-emerald-700 dark:text-emerald-300",
        border: "border-l-4 border-emerald-400",
    },
    {
        iconBg: "bg-slate-100 dark:bg-slate-700/60",
        iconColor: "text-slate-500 dark:text-slate-400",
        valueColor: "text-slate-600 dark:text-slate-300",
        border: "border-l-4 border-slate-400",
    },
    {
        iconBg: "bg-rose-100 dark:bg-rose-900/40",
        iconColor: "text-rose-600 dark:text-rose-400",
        valueColor: "text-rose-700 dark:text-rose-300",
        border: "border-l-4 border-rose-400",
    },
];

const DashboardCards = ({ stats }) => {
    const cards = [
        {
            label: "Total Reviews",
            icon: MessageSquare,
            value: stats?.totalReviews ?? 0,
            sub: "All time",
        },
        {
            label: "Average Rating",
            icon: Star,
            value: stats?.averageRating ? `${stats.averageRating} ★` : "—",
            sub: "Overall score",
        },
        {
            label: "Positive",
            icon: ThumbsUp,
            value: stats?.positiveReviews ?? 0,
            sub: "4–5 star reviews",
        },
        {
            label: "Neutral",
            icon: Minus,
            value: stats?.averageReviews ?? 0,
            sub: "3 star reviews",
        },
        {
            label: "Negative",
            icon: ThumbsDown,
            value: stats?.negativeReviews ?? 0,
            sub: "1–2 star reviews",
        },
    ];

    return (
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
            {cards.map((card, i) => {
                const style = CARD_STYLES[i];
                const Icon = card.icon;
                return (
                    <div
                        key={i}
                        className={`
                            bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5
                            transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
                            ${style.border}
                        `}
                    >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${style.iconBg}`}>
                            <Icon size={16} className={style.iconColor} />
                        </div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
                        <div className={`text-2xl font-bold ${style.valueColor}`}>
                            {card.value}
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{card.sub}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardCards;
