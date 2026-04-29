const ReviewTrendChart = ({ data }) => {
    if (!data.length) return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-48">
            <p className="text-gray-400 text-sm">Not enough data to show trends.</p>
        </div>
    );

    const maxCount = Math.max(...data.map((d) => d.count), 1);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-5">Review Trends</h3>
            <div className="flex items-end gap-2 h-40">
                {data.map((d) => (
                    <div key={d.key} className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-xs text-gray-500">{d.count}</span>
                        <div
                            className="w-full !bg-indigo-500 rounded-t-md transition-all duration-500 hover:!bg-indigo-600"
                            style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: "4px" }}
                            title={`${d.label}: ${d.count} reviews`}
                        />
                        <span className="text-xs text-gray-400 text-center leading-tight">
                            {d.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewTrendChart;