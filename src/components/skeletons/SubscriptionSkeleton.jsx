const SubscriptionSkeleton = () => (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-3">
                <div className="h-5 w-72 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-3.5 w-96 bg-gray-100 rounded-full animate-pulse" />
            </div>

            {/* Payment method card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                <div className="h-4 w-32 bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[1, 2, 3].map(i => (
                    <div key={i} className="rounded-3xl border-2 border-gray-100 bg-white p-6 space-y-5 animate-pulse">
                        <div className="flex items-center justify-between">
                            <div className="h-5 w-20 bg-gray-200 rounded-full" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-2xl shrink-0" />
                            <div className="h-5 w-24 bg-gray-200 rounded" />
                        </div>
                        <div className="h-9 w-20 bg-gray-200 rounded" />
                        <div className="space-y-2.5 flex-1">
                            {[1, 2, 3].map(j => (
                                <div key={j} className="flex items-center gap-2.5">
                                    <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />
                                    <div className="h-3 bg-gray-100 rounded flex-1" />
                                </div>
                            ))}
                        </div>
                        <div className="h-11 bg-gray-200 rounded-2xl" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default SubscriptionSkeleton;
