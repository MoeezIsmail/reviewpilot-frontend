import { useReviews } from "../../context/ReviewsContext.jsx";
import { CheckCircle2, Zap, Clock } from "lucide-react";

const bars = (stats) => [
    {
        label: "Posted",
        value: stats.posted,
        count: stats.postedCount,
        color: "bg-emerald-500",
        icon: CheckCircle2,
        iconColor: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
        label: "Ready to Post",
        value: stats.ready,
        count: stats.readyCount,
        color: "bg-indigo-500",
        icon: Zap,
        iconColor: "text-indigo-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
        label: "Pending",
        value: stats.pending,
        count: stats.pendingCount,
        color: "bg-amber-400",
        icon: Clock,
        iconColor: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/40",
    },
];

const ReplyPerformance = () => {
    const { getReplyPerformanceStats } = useReviews();
    const stats = getReplyPerformanceStats();
    const barData = bars(stats);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Reply Performance</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Current page reply status</p>
                </div>
                <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg">
                    {stats.total} reviews
                </span>
            </div>

            {stats.total === 0 ? (
                <div className="flex items-center justify-center h-24 text-sm text-gray-400 dark:text-gray-500">
                    No review data yet
                </div>
            ) : (
                <div className="space-y-4">
                    {barData.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label}>
                                <div className="flex justify-between items-center mb-1.5">
                                    <div className="flex items-center gap-1.5">
                                        <Icon size={13} className={s.iconColor} />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{s.label}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                        {s.count}
                                        <span className="text-xs text-gray-400 dark:text-gray-500 font-normal ml-1">({s.value}%)</span>
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
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
        </div>
    );
};

export default ReplyPerformance;
