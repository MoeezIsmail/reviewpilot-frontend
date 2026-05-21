const STAR_STYLES = {
    5: { bar: "bg-emerald-500", label: "text-emerald-600 dark:text-emerald-400" },
    4: { bar: "bg-lime-500",    label: "text-lime-600 dark:text-lime-400" },
    3: { bar: "bg-yellow-400",  label: "text-yellow-600 dark:text-yellow-400" },
    2: { bar: "bg-orange-500",  label: "text-orange-600 dark:text-orange-400" },
    1: { bar: "bg-rose-500",    label: "text-rose-600 dark:text-rose-400" },
};

const RatingDistributionChart = ({ data }) => {
    const maxCount = Math.max(...data.map(d => d.count), 1);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="mb-5">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Rating Distribution</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Breakdown by star rating</p>
            </div>
            <div className="flex flex-col gap-3">
                {[...data].reverse().map(({ star, count, percentage }) => {
                    const style = STAR_STYLES[star];
                    return (
                        <div key={star} className="flex items-center gap-3 group">
                            <span className={`text-xs font-semibold w-6 text-right shrink-0 ${style.label}`}>{star}★</span>
                            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`${style.bar} h-3 rounded-full transition-all duration-700 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <div className="flex items-center gap-1.5 w-16 text-right justify-end">
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{count}</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">({percentage}%)</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingDistributionChart;
