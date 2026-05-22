const AnalyticsSkeleton = () => (
    <div className="flex flex-col gap-6">
        {/* Data badge */}
        <div className="h-6 w-48 bg-indigo-100 dark:bg-indigo-900/30 rounded-full animate-pulse" />

        {/* Summary cards — 4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse">
                    <div className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-xl mb-3" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2" />
                    <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1" />
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-700/60 rounded w-28" />
                </div>
            ))}
        </div>

        {/* Review Trends — full width */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 animate-pulse">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 mb-2" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-40" />
                </div>
                <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-xl w-24" />
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col justify-between h-48 shrink-0">
                    {[1, 2, 3].map(i => <div key={i} className="h-2.5 w-4 bg-gray-100 dark:bg-gray-700 rounded" />)}
                </div>
                <div className="flex-1">
                    <div className="flex items-end gap-1 h-48">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-indigo-100 dark:bg-indigo-900/40 rounded-t-md"
                                style={{ height: `${25 + Math.random() * 65}%` }}
                            />
                        ))}
                    </div>
                    <div className="flex gap-1 mt-2">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div key={i} className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-700 rounded" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-6 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                {[1, 2, 3].map(i => (
                    <div key={i}>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-16 mb-1.5" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
                    </div>
                ))}
            </div>
        </div>

        {/* Row 3: Rating + Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Rating Distribution */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 animate-pulse">
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-1.5" />
                        <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-28" />
                    </div>
                    <div className="h-8 bg-amber-100 dark:bg-amber-900/30 rounded w-12" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded shrink-0" />
                            <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gray-200 dark:bg-gray-600 rounded-full"
                                    style={{ width: `${20 + i * 12}%` }}
                                />
                            </div>
                            <div className="h-3 w-14 bg-gray-100 dark:bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sentiment */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 animate-pulse">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-1.5" />
                        <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-48" />
                    </div>
                    <div className="h-5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full w-16" />
                </div>
                <div className="flex items-center gap-8">
                    {/* Donut placeholder */}
                    <div className="w-36 h-36 rounded-full bg-gray-100 dark:bg-gray-700 shrink-0 relative">
                        <div className="absolute inset-[22%] rounded-full bg-white dark:bg-gray-800" />
                    </div>
                    <div className="flex-1 space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10" />
                                </div>
                                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AnalyticsSkeleton;
