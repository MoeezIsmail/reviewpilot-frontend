const DashboardSkeleton = () => (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
            <div className="space-y-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 animate-pulse" />
                <div className="h-4 bg-gray-100 dark:bg-gray-700/60 rounded-lg w-64 animate-pulse" />
            </div>
        </div>

        {/* Stat cards — 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-xl" />
                    </div>
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-28" />
                </div>
            ))}
        </div>

        {/* AI Summary Hero */}
        <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "linear-gradient(135deg, #6d28d9 0%, #4f46e5 60%, #3730a3 100%)" }}>
            <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/15" />
                        <div>
                            <div className="h-3 bg-white/20 rounded w-32 mb-1.5" />
                            <div className="h-2.5 bg-white/10 rounded w-24" />
                        </div>
                    </div>
                    <div className="h-7 bg-white/10 rounded-lg w-20" />
                </div>
                <div className="space-y-2.5 mb-5">
                    <div className="h-4 bg-white/15 rounded-full w-full" />
                    <div className="h-4 bg-white/15 rounded-full w-11/12" />
                    <div className="h-4 bg-white/15 rounded-full w-4/5" />
                    <div className="h-4 bg-white/10 rounded-full w-2/3" />
                </div>
                <div className="flex gap-2 pt-4 border-t border-white/10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-7 bg-white/10 rounded-full w-28" />
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reviews */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                    <div className="h-4 bg-gray-100 dark:bg-gray-700/60 rounded w-16" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-28" />
                                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reply Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 animate-pulse">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-1.5" />
                        <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-28" />
                    </div>
                    <div className="h-7 bg-gray-100 dark:bg-gray-700 rounded-lg w-16" />
                </div>
                <div className="space-y-5">
                    {[1, 2, 3].map(i => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12" />
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default DashboardSkeleton;
