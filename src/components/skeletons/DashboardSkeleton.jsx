const DashboardSkeleton = () => (
    <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-pulse">
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-11 h-11 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12" />
                </div>
            ))}
        </div>

        {/* Refresh button placeholder */}
        <div className="flex justify-end">
            <div className="h-9 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4" />
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                                <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-full" />
                                <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reply Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-4" />
                <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg" />
            </div>
        </div>
    </div>
);

export default DashboardSkeleton;
