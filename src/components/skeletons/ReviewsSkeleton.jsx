const ReviewsSkeleton = () => (
    <div className="flex flex-col gap-4">
        {/* Filter bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden animate-pulse">
            {/* Search row */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
                <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-xl" />
            </div>
            {/* Controls row */}
            <div className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-40 bg-gray-100 dark:bg-gray-700 rounded-xl" />
                    <div className="h-8 w-24 bg-gray-100 dark:bg-gray-700 rounded-xl" />
                    <div className="h-8 w-24 bg-gray-100 dark:bg-gray-700 rounded-xl" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-28 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl" />
                    <div className="h-8 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl" />
                    <div className="h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-xl" />
                </div>
            </div>
        </div>

        {/* Review cards */}
        <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
                    <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
                                <div>
                                    <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-28 mb-1.5" />
                                    <div className="h-2.5 bg-gray-100 dark:bg-gray-700/60 rounded w-36" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-6 w-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full" />
                            </div>
                        </div>
                        {/* Review text */}
                        <div className="space-y-2 mb-3">
                            <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-full" />
                            <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-5/6" />
                            <div className="h-3 bg-gray-100 dark:bg-gray-700/60 rounded w-2/3" />
                        </div>
                        {/* Reply box */}
                        <div className="h-16 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border-l-[3px] border-indigo-200 dark:border-indigo-800" />
                    </div>
                    {/* Actions bar */}
                    <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                        <div className="h-7 w-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl" />
                        <div className="h-7 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default ReviewsSkeleton;
