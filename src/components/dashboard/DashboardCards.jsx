import { Star, MessageSquare, SmilePlus } from "lucide-react";

const DashboardCards = ({ stats }) => {
    const total = stats?.totalReviews ?? 0;
    const avg = stats?.averageRating ?? 0;
    const positive = stats?.positiveReviews ?? 0;
    const neutral = stats?.averageReviews ?? 0;
    const negative = stats?.negativeReviews ?? 0;
    const sentimentTotal = positive + neutral + negative || 1;

    const positivePct = Math.round((positive / sentimentTotal) * 100);
    const neutralPct = Math.round((neutral / sentimentTotal) * 100);
    const negativePct = Math.round((negative / sentimentTotal) * 100);

    const ratingFill = avg > 0 ? (avg / 5) * 100 : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Total Reviews
                    </p>
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
                        <MessageSquare size={15} className="text-indigo-500 dark:text-indigo-400" />
                    </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                    {total.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">All time collected</p>
            </div>

            {/* Average Rating */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Average Rating
                    </p>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center">
                        <Star size={15} className="text-amber-500 dark:text-amber-400" />
                    </div>
                </div>
                <div className="flex items-end gap-1.5">
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        {avg > 0 ? avg.toFixed(1) : "—"}
                    </p>
                    {avg > 0 && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">/ 5.0</p>
                    )}
                </div>
                <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
                        style={{ width: `${ratingFill}%` }}
                    />
                </div>
            </div>

            {/* Sentiment Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Sentiment
                    </p>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center">
                        <SmilePlus size={15} className="text-emerald-500 dark:text-emerald-400" />
                    </div>
                </div>
                {/* Stacked bar */}
                <div className="flex h-2 rounded-full overflow-hidden gap-px mb-3">
                    <div className="bg-emerald-500 transition-all duration-700" style={{ width: `${positivePct}%` }} />
                    <div className="bg-amber-400 transition-all duration-700" style={{ width: `${neutralPct}%` }} />
                    <div className="bg-rose-400 transition-all duration-700" style={{ width: `${negativePct}%` }} />
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        {positivePct}% Positive
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                        {neutralPct}% Neutral
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                        {negativePct}% Neg
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
