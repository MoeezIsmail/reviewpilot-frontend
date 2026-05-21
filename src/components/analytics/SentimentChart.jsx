import { ThumbsUp, Minus, ThumbsDown } from "lucide-react";

const ITEMS = [
    {
        key: "positive",
        label: "Positive",
        icon: ThumbsUp,
        bar: "bg-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        border: "border-emerald-100 dark:border-emerald-900/50",
        text: "text-emerald-700 dark:text-emerald-400",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/60",
    },
    {
        key: "neutral",
        label: "Neutral",
        icon: Minus,
        bar: "bg-yellow-400",
        bg: "bg-yellow-50 dark:bg-yellow-950/40",
        border: "border-yellow-100 dark:border-yellow-900/50",
        text: "text-yellow-700 dark:text-yellow-400",
        iconBg: "bg-yellow-100 dark:bg-yellow-900/60",
    },
    {
        key: "negative",
        label: "Negative",
        icon: ThumbsDown,
        bar: "bg-rose-500",
        bg: "bg-rose-50 dark:bg-rose-950/40",
        border: "border-rose-100 dark:border-rose-900/50",
        text: "text-rose-700 dark:text-rose-400",
        iconBg: "bg-rose-100 dark:bg-rose-900/60",
    },
];

const SentimentChart = ({ sentiment }) => {
    const total = sentiment.positive + sentiment.neutral + sentiment.negative || 1;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="mb-5">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Sentiment Breakdown</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Customer sentiment based on ratings</p>
            </div>

            {/* Stacked bar */}
            <div className="flex rounded-xl overflow-hidden h-3 mb-5 gap-0.5">
                {ITEMS.map((item) => {
                    const count = sentiment[item.key];
                    const pct = Math.round((count / total) * 100);
                    if (!pct) return null;
                    return (
                        <div
                            key={item.key}
                            className={`${item.bar} transition-all duration-700 first:rounded-l-xl last:rounded-r-xl`}
                            style={{ width: `${pct}%` }}
                            title={`${item.label}: ${count} (${pct}%)`}
                        />
                    );
                })}
            </div>

            {/* Legend cards */}
            <div className="grid grid-cols-3 gap-3">
                {ITEMS.map((item) => {
                    const Icon = item.icon;
                    const count = sentiment[item.key];
                    const pct = Math.round((count / total) * 100);
                    return (
                        <div key={item.key} className={`rounded-xl p-4 border ${item.bg} ${item.border}`}>
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${item.iconBg}`}>
                                <Icon size={13} className={item.text} />
                            </div>
                            <p className={`text-2xl font-bold ${item.text}`}>{count}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                            <p className={`text-xs font-semibold ${item.text} mt-0.5`}>{pct}%</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SentimentChart;
