const AnalyticsSkeleton = () => (
    <div className="flex flex-col gap-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm animate-pulse">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3" />
                    <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-14 mb-1" />
                    <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-20" />
                </div>
            ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-4" />
                <div className="h-52 bg-gray-100 dark:bg-gray-700 rounded-lg" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4" />
                <div className="h-52 bg-gray-100 dark:bg-gray-700 rounded-lg" />
            </div>
        </div>

        {/* Chart row 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4" />
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </div>
    </div>
);

export default AnalyticsSkeleton;
