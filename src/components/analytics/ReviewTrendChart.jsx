const ReviewTrendChart = ({ data }) => {
    if (!data.length) return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-center h-52">
            <div className="text-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Not enough data to show trends.</p>
            </div>
        </div>
    );

    const maxCount = Math.max(...data.map(d => d.count), 1);
    const totalReviews = data.reduce((s, d) => s + d.count, 0);
    const avgPerMonth = data.length ? Math.round(totalReviews / data.length) : 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Review Trends</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Monthly volume over time</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{totalReviews}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">~{avgPerMonth}/mo avg</p>
                </div>
            </div>

            <div className="flex items-end gap-1.5 h-36">
                {data.map((d, idx) => {
                    const heightPct = (d.count / maxCount) * 100;
                    const isMax = d.count === maxCount;
                    return (
                        <div key={d.key} className="flex flex-col items-center gap-1 flex-1 group cursor-default">
                            <span className={`text-xs font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${isMax ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}>
                                {d.count}
                            </span>
                            <div
                                className={`w-full rounded-t-lg transition-all duration-500 ${isMax ? "bg-indigo-600 dark:bg-indigo-500" : "bg-indigo-200 dark:bg-indigo-900 group-hover:bg-indigo-400 dark:group-hover:bg-indigo-700"}`}
                                style={{ height: `${heightPct}%`, minHeight: "4px" }}
                                title={`${d.label}: ${d.count} reviews, avg rating ${d.avgRating}`}
                            />
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 text-center leading-tight hidden sm:block">
                                {d.label.split(" ")[0]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewTrendChart;
