import { Star, MessageSquare, MessageCircle } from "lucide-react";
import { useReviews } from "../../context/ReviewsContext.jsx";

const DashboardCards = ({ stats }) => {
    const { getReplyPerformanceStats } = useReviews();
    const replyRate = getReplyPerformanceStats().posted; // % of reviews with posted replies

    const total = stats?.totalReviews ?? 0;
    const avg = stats?.averageRating ?? 0;
    const ratingFill = avg > 0 ? (avg / 5) * 100 : 0;

    const replyColor =
        replyRate >= 70 ? "text-emerald-600 dark:text-emerald-400" :
        replyRate >= 40 ? "text-amber-600 dark:text-amber-400" :
        "text-rose-600 dark:text-rose-400";
    const replyBar =
        replyRate >= 70 ? "from-emerald-400 to-emerald-500" :
        replyRate >= 40 ? "from-amber-400 to-amber-500" :
        "from-rose-400 to-rose-500";
    const replyIconBg =
        replyRate >= 70 ? "bg-emerald-50 dark:bg-emerald-900/40" :
        replyRate >= 40 ? "bg-amber-50 dark:bg-amber-900/40" :
        "bg-rose-50 dark:bg-rose-900/40";
    const replyIconColor =
        replyRate >= 70 ? "text-emerald-500 dark:text-emerald-400" :
        replyRate >= 40 ? "text-amber-500 dark:text-amber-400" :
        "text-rose-500 dark:text-rose-400";

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

            {/* Reply Rate */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Reply Rate
                    </p>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${replyIconBg}`}>
                        <MessageCircle size={15} className={replyIconColor} />
                    </div>
                </div>
                <div className="flex items-end gap-1.5">
                    <p className={`text-4xl font-bold tracking-tight ${replyColor}`}>
                        {replyRate}%
                    </p>
                </div>
                <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${replyBar} rounded-full transition-all duration-700`}
                        style={{ width: `${replyRate}%` }}
                    />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Reviews with posted replies</p>
            </div>
        </div>
    );
};

export default DashboardCards;
