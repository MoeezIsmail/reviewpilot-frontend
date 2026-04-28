import { useReviews } from "../context/ReviewsContext.jsx";

const ReplyPerformance = () => {
    const { getReplyPerformanceStats } = useReviews();
    const stats = getReplyPerformanceStats();

    const bars = [
        { label: "Posted", value: stats.posted, count: stats.postedCount, color: "bg-green-500" },
        { label: "Ready to Post", value: stats.ready, count: stats.readyCount, color: "bg-indigo-500" },
        { label: "Pending", value: stats.pending, count: stats.pendingCount, color: "bg-yellow-400" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 h-72 sticky top-0 z-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Reply Performance</h2>
                <span className="text-xs text-gray-400">{stats.total} total reviews</span>
            </div>

            <div className="space-y-5">
                {bars.map((s, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                            <span className="text-gray-600">{s.label}</span>
                            <span className="font-medium text-gray-800">
                                {s.count} <span className="text-gray-400 font-normal">({s.value}%)</span>
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className={`${s.color} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${s.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReplyPerformance;