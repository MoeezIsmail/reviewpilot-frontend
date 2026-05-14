const SentimentChart = ({ sentiment }) => {
    const total = sentiment.positive + sentiment.neutral + sentiment.negative || 1;

    const items = [
        { label: "Positive", count: sentiment.positive, color: "bg-green-500", textColor: "text-green-700 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/40" },
        { label: "Neutral",  count: sentiment.neutral,  color: "bg-yellow-400", textColor: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/40" },
        { label: "Negative", count: sentiment.negative, color: "bg-red-500",   textColor: "text-red-700 dark:text-red-400",   bg: "bg-red-50 dark:bg-red-950/40"   },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-5">Sentiment Breakdown</h3>

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
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{Math.round((item.count / total) * 100)}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SentimentChart;
