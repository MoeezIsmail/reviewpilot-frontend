const SentimentChart = ({ sentiment }) => {
    const total = sentiment.positive + sentiment.neutral + sentiment.negative || 1;

    const items = [
        { label: "Positive", count: sentiment.positive, color: "bg-green-500", textColor: "text-green-700", bg: "bg-green-50" },
        { label: "Neutral",  count: sentiment.neutral,  color: "bg-yellow-400", textColor: "text-yellow-700", bg: "bg-yellow-50" },
        { label: "Negative", count: sentiment.negative, color: "bg-red-500",   textColor: "text-red-700",   bg: "bg-red-50"   },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-5">Sentiment Breakdown</h3>

            {/* Bar */}
            <div className="flex rounded-full overflow-hidden h-4 mb-5">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`${item.color} transition-all duration-500`}
                        style={{ width: `${(item.count / total) * 100}%` }}
                        title={`${item.label}: ${item.count}`}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="flex gap-3">
                {items.map((item) => (
                    <div key={item.label} className={`flex-1 rounded-lg p-3 ${item.bg} text-center`}>
                        <p className={`text-xl font-bold ${item.textColor}`}>{item.count}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                        <p className="text-xs text-gray-400">{Math.round((item.count / total) * 100)}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SentimentChart;