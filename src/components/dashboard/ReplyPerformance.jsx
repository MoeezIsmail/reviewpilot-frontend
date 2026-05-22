import { Link } from "react-router-dom";
import { useReviews } from "../../context/ReviewsContext.jsx";
import { CheckCircle2, Zap, Clock, ArrowRight } from "lucide-react";

const bars = (stats) => [
    {
        label: "Posted",
        value: stats.posted,
        count: stats.postedCount,
        color: "bg-emerald-500",
        trackColor: "bg-emerald-100 dark:bg-emerald-950/40",
        icon: CheckCircle2,
        iconColor: "text-emerald-500",
    },
    {
        label: "Ready to Post",
        value: stats.ready,
        count: stats.readyCount,
        color: "bg-indigo-500",
        trackColor: "bg-indigo-100 dark:bg-indigo-950/40",
        icon: Zap,
        iconColor: "text-indigo-500",
    },
    {
        label: "Pending",
        value: stats.pending,
        count: stats.pendingCount,
        color: "bg-amber-400",
        trackColor: "bg-amber-100 dark:bg-amber-950/40",
        icon: Clock,
        iconColor: "text-amber-500",
    },
];

const ReplyPerformance = () => {
    const { getReplyPerformanceStats } = useReviews();
    const stats = getReplyPerformanceStats();
    const barData = bars(stats);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Reply Performance</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Reply coverage across reviews</p>
                </div>
                <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg tabular-nums">
                    {stats.total} total
                </span>
            </div>

            {stats.total === 0 ? (
                <div className="flex items-center justify-center flex-1 h-24 text-sm text-gray-400 dark:text-gray-500">
                    No review data yet
                </div>
            ) : (
                <div className="space-y-5 flex-1">
                    {barData.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label}>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <Icon size={13} className={s.iconColor} />
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{s.label}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tabular-nums">{s.count}</span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500 font-normal ml-1 tabular-nums">({s.value}%)</span>
                                    </div>
                                </div>
                                <div className={`w-full ${s.trackColor} rounded-full h-2`}>
                                    <div
                                        className={`${s.color} h-2 rounded-full transition-all duration-700 ease-out`}
                                        style={{ width: `${s.value}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Link
                to="/reviews"
                className="flex items-center justify-center gap-1.5 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
                Manage reviews
                <ArrowRight size={12} />
            </Link>
        </div>
    );
};

export default ReplyPerformance;
