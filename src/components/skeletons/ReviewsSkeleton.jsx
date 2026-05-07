const ReviewsSkeleton = () => (
    <div className="flex flex-col gap-4">
        {/* Filter bar */}
        <div className="bg-white rounded-xl p-4 flex flex-wrap items-center gap-3 animate-pulse">
            <div className="h-9 bg-gray-200 rounded-lg w-48" />
            <div className="h-9 bg-gray-200 rounded-lg w-32" />
            <div className="h-9 bg-gray-200 rounded-lg w-32" />
            <div className="ml-auto h-9 bg-indigo-100 rounded-lg w-28" />
        </div>

        {/* Review cards */}
        <div className="flex flex-col gap-3 max-h-[68vh] overflow-hidden">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 animate-pulse">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="h-4 bg-gray-200 rounded w-28" />
                                <div className="h-3 bg-gray-100 rounded w-16" />
                            </div>
                            <div className="h-3 bg-gray-100 rounded w-full" />
                            <div className="h-3 bg-gray-100 rounded w-4/5" />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="h-8 w-20 bg-indigo-100 rounded-lg" />
                            <div className="h-8 w-16 bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default ReviewsSkeleton;
