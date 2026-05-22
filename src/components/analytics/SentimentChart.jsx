import { FileText, Star } from "lucide-react";

const ITEMS = [
    {
        key: "positive",
        label: "Positive",
        dot: "bg-emerald-500",
        bar: "bg-emerald-500",
        text: "text-emerald-600 dark:text-emerald-400",
        conicColor: "#10b981",
    },
    {
        key: "neutral",
        label: "Neutral",
        dot: "bg-amber-400",
        bar: "bg-amber-400",
        text: "text-amber-600 dark:text-amber-400",
        conicColor: "#fbbf24",
    },
    {
        key: "negative",
        label: "Negative",
        dot: "bg-rose-500",
        bar: "bg-rose-500",
        text: "text-rose-600 dark:text-rose-400",
        conicColor: "#f43f5e",
    },
];

const SentimentChart = ({ sentiment }) => {
    const total = (sentiment.positive + sentiment.neutral + sentiment.negative) || 1;

    const pcts = {
        positive: Math.round((sentiment.positive / total) * 100),
        neutral: Math.round((sentiment.neutral / total) * 100),
        negative: 0,
    };
    pcts.negative = 100 - pcts.positive - pcts.neutral;

    // CSS conic-gradient for donut
    const posA = (sentiment.positive / total) * 360;
    const neuA = (sentiment.neutral / total) * 360;
    const donutStyle = {
        background: `conic-gradient(
            #10b981 0deg ${posA}deg,
            #fbbf24 ${posA}deg ${posA + neuA}deg,
            #f43f5e ${posA + neuA}deg 360deg
        )`,
    };

    // Dominant sentiment for center label
    const dominant = sentiment.positive >= sentiment.neutral && sentiment.positive >= sentiment.negative
        ? { label: "Positive", pct: pcts.positive, color: "text-emerald-600 dark:text-emerald-400" }
        : sentiment.neutral >= sentiment.negative
            ? { label: "Neutral", pct: pcts.neutral, color: "text-amber-600 dark:text-amber-400" }
            : { label: "Negative", pct: pcts.negative, color: "text-rose-600 dark:text-rose-400" };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Sentiment Breakdown</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Based on review text analysis</p>
                </div>
                <div className="flex items-center gap-1.5">
                    {sentiment.textAnalyzed > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-medium bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-800">
                            <FileText size={9} />
                            {sentiment.textAnalyzed} NLP
                        </span>
                    )}
                    {sentiment.ratingFallback > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-medium bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-600">
                            <Star size={9} />
                            {sentiment.ratingFallback} rating
                        </span>
                    )}
                </div>
            </div>

            {/* Donut + detail list */}
            <div className="flex items-center gap-8">
                {/* CSS Donut */}
                <div className="relative shrink-0 w-36 h-36">
                    <div className="w-full h-full rounded-full" style={donutStyle} />
                    {/* Inner hole */}
                    <div className="absolute inset-[22%] rounded-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center shadow-inner">
                        <p className={`text-2xl font-bold leading-tight ${dominant.color}`}>
                            {dominant.pct}%
                        </p>
                        <p className="text-[9px] text-gray-400 dark:text-gray-500 leading-none mt-0.5">
                            {dominant.label}
                        </p>
                    </div>
                </div>

                {/* Detail list with mini bars */}
                <div className="flex-1 space-y-4">
                    {ITEMS.map(item => {
                        const count = sentiment[item.key];
                        const pct = pcts[item.key];
                        return (
                            <div key={item.key}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.dot}`} />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-bold tabular-nums ${item.text}`}>{count}</span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500 w-8 text-right tabular-nums">{pct}%</span>
                                    </div>
                                </div>
                                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.bar} rounded-full transition-all duration-700`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* NLP note */}
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 leading-relaxed">
                {sentiment.textAnalyzed > 0
                    ? `NLP text analysis used for ${sentiment.textAnalyzed} review${sentiment.textAnalyzed !== 1 ? "s" : ""}${sentiment.ratingFallback > 0 ? `; star rating fallback for ${sentiment.ratingFallback} without text.` : "."}`
                    : "Sentiment inferred from star ratings — no review text available for NLP analysis."}
            </p>
        </div>
    );
};

export default SentimentChart;
