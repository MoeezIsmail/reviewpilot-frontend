const COLORS = {
    5: "bg-green-500",
    4: "bg-lime-400",
    3: "bg-yellow-400",
    2: "bg-orange-400",
    1: "bg-red-500",
};

const RatingDistributionChart = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-5">Rating Distribution</h3>
            <div className="flex flex-col gap-3">
                {[...data].reverse().map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right">{star}★</span>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className={`${COLORS[star]} h-2.5 rounded-full transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-8">{count}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-10">{percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingDistributionChart;
