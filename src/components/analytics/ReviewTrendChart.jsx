import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const ReviewTrendChart = ({ data }) => {
    const [hoveredIdx, setHoveredIdx] = useState(null);

    if (!data.length) return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-center h-64">
            <div className="text-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <BarChart3 size={18} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Not enough data to show trends.</p>
            </div>
        </div>
    );

    const maxCount = Math.max(...data.map(d => d.count), 1);
    const totalReviews = data.reduce((s, d) => s + d.count, 0);
    const avgPerMonth = data.length ? (totalReviews / data.length).toFixed(1) : 0;
    const bestMonth = data.reduce((best, d) => d.count > best.count ? d : best, data[0]);

    const lastCount = data[data.length - 1]?.count ?? 0;
    const prevCount = data.length >= 2 ? data[data.length - 2].count : lastCount;
    const trendDiff = lastCount - prevCount;

    // Y-axis: 3 reference lines
    const ySteps = [0, Math.ceil(maxCount / 2), maxCount];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Review Trends</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Monthly review volume</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                        <p className="text-xs text-gray-400 dark:text-gray-500">Best month</p>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                            {bestMonth.label.split(" ")[0]} · {bestMonth.count}
                        </p>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${
                        trendDiff > 0
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                            : trendDiff < 0
                                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}>
                        {trendDiff > 0 ? <TrendingUp size={13} /> : trendDiff < 0 ? <TrendingDown size={13} /> : null}
                        <span>{trendDiff > 0 ? `+${trendDiff}` : trendDiff < 0 ? trendDiff : "—"}</span>
                        <span className="font-normal opacity-70">vs prev</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="flex gap-4">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between h-48 shrink-0 text-right">
                    {[...ySteps].reverse().map(v => (
                        <span key={v} className="text-[10px] text-gray-300 dark:text-gray-600 leading-none tabular-nums">
                            {v}
                        </span>
                    ))}
                </div>

                {/* Plot area */}
                <div className="flex-1 relative">
                    {/* Horizontal grid lines */}
                    {ySteps.map(v => (
                        <div
                            key={v}
                            className="absolute w-full border-t border-dashed border-gray-100 dark:border-gray-700 pointer-events-none"
                            style={{ bottom: `${(v / maxCount) * 100}%` }}
                        />
                    ))}

                    {/* Bars */}
                    <div className="relative flex items-end gap-1 h-48">
                        {data.map((d, idx) => {
                            const heightPct = Math.max((d.count / maxCount) * 100, d.count ? 1.5 : 0);
                            const isBest = d.count === maxCount && maxCount > 0;
                            const isHovered = hoveredIdx === idx;

                            return (
                                <div
                                    key={d.key}
                                    className="relative flex flex-col items-center justify-end flex-1 h-full cursor-default"
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                >
                                    {/* Tooltip */}
                                    {isHovered && (
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 bg-gray-900 dark:bg-gray-700 text-white rounded-xl px-3 py-2 text-xs whitespace-nowrap shadow-2xl pointer-events-none">
                                            <p className="font-semibold text-white mb-0.5">{d.label}</p>
                                            <p className="text-gray-300">{d.count} review{d.count !== 1 ? "s" : ""}</p>
                                            {Number(d.avgRating) > 0 && (
                                                <p className="text-amber-400">{d.avgRating}★ avg</p>
                                            )}
                                            {/* Tooltip caret */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                                        </div>
                                    )}

                                    {/* Bar */}
                                    <div
                                        className={`w-full rounded-t-md transition-all duration-500 ease-out ${
                                            isBest
                                                ? "bg-gradient-to-t from-indigo-600 to-violet-500 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/50"
                                                : isHovered
                                                    ? "bg-gradient-to-t from-indigo-500 to-indigo-400"
                                                    : "bg-gradient-to-t from-indigo-200 to-indigo-300 dark:from-indigo-800 dark:to-indigo-700"
                                        }`}
                                        style={{ height: `${heightPct}%` }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* X-axis labels */}
                    <div className="flex gap-1 mt-2">
                        {data.map((d) => (
                            <div key={d.key} className="flex-1 text-center">
                                <span className="text-[9px] text-gray-400 dark:text-gray-500">
                                    {d.label.split(" ")[0]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer stats */}
            <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 tabular-nums">{totalReviews}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Monthly avg</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 tabular-nums">~{avgPerMonth}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Months tracked</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 tabular-nums">{data.length}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewTrendChart;
