import { ThumbsUp, Minus, ThumbsDown, FileText, Star } from "lucide-react";

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
        bar: "bg-amber-400",
        bg: "bg-amber-50 dark:bg-amber-950/40",
        border: "border-amber-100 dark:border-amber-900/50",
        text: "text-amber-700 dark:text-amber-400",
        iconBg: "bg-amber-100 dark:bg-amber-900/60",
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
    const total = (sentiment.positive + sentiment.neutral + sentiment.negative) || 1;
    const textAnalyzed = sentiment.textAnalyzed ?? 0;
    const ratingFallback = sentiment.ratingFallback ?? 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Sentiment Breakdown</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Based on actual review text analysis
                    </p>
                </div>
                {/* Analysis method badge */}
                <div className="flex items-center gap-1.5">
                    {textAnalyzed > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-medium bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-800">
                            <FileText size={9} />
                            {textAnalyzed} text
                        </span>
                    )}
                    {ratingFallback > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-medium bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-600">
                            <Star size={9} />
                            {ratingFallback} rating
                        </span>
                    )}
                </div>
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

            {/* Cards */}
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

            {/* Method explanation note */}
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-4 leading-relaxed">
                {textAnalyzed > 0
                    ? `Sentiment determined from review text for ${textAnalyzed} review${textAnalyzed !== 1 ? 's' : ''}${ratingFallback > 0 ? `, star rating used for ${ratingFallback} review${ratingFallback !== 1 ? 's' : ''} with no text.` : '.'}`
                    : 'Sentiment based on star ratings (no review text available for NLP analysis).'
                }
            </p>
        </div>
    );
};

export default SentimentChart;
