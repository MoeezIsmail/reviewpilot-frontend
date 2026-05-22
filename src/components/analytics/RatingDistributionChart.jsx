const STAR_STYLES = {
    5: { bar: "bg-emerald-500", label: "text-emerald-600 dark:text-emerald-400" },
    4: { bar: "bg-lime-500",    label: "text-lime-600 dark:text-lime-400" },
    3: { bar: "bg-yellow-400",  label: "text-yellow-600 dark:text-yellow-400" },
    2: { bar: "bg-orange-500",  label: "text-orange-600 dark:text-orange-400" },
    1: { bar: "bg-rose-500",    label: "text-rose-600 dark:text-rose-400" },
};

const StarIcon = ({ filled }) => (
    <svg
        className={`w-3.5 h-3.5 ${filled ? "text-amber-400" : "text-gray-200 dark:text-gray-600"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const RatingDistributionChart = ({ data }) => {
    const maxCount = Math.max(...data.map(d => d.count), 1);
    const totalCount = data.reduce((s, d) => s + d.count, 0);
    const avgRating = totalCount > 0
        ? (data.reduce((s, d) => s + d.star * d.count, 0) / totalCount).toFixed(1)
        : 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Rating Distribution</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Breakdown by star rating</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold text-amber-500 leading-tight">{avgRating}<span className="text-base">★</span></p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">avg rating</p>
                </div>
            </div>

            {/* Bars */}
            <div className="flex flex-col gap-3 flex-1">
                {[...data].reverse().map(({ star, count, percentage }) => {
                    const style = STAR_STYLES[star];
                    const isMost = count === maxCount && maxCount > 0;
                    return (
                        <div key={star} className="flex items-center gap-3">
                            <span className={`text-xs font-bold w-6 text-right shrink-0 tabular-nums ${style.label}`}>
                                {star}★
                            </span>
                            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`${style.bar} h-4 rounded-full transition-all duration-700 ease-out ${isMost ? "shadow-sm" : ""}`}
                                    style={{ width: `${Math.max(percentage, count ? 3 : 0)}%` }}
                                />
                            </div>
                            <div className="flex items-center gap-1 w-16 justify-end shrink-0">
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 tabular-nums">{count}</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">({percentage}%)</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">{totalCount} reviews</p>
                <div className="flex gap-0.5 items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon key={i} filled={i < Math.round(Number(avgRating))} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RatingDistributionChart;
