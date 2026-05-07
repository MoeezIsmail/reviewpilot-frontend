const AppShellSkeleton = () => (
    <div className="flex h-screen w-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 h-screen flex flex-col bg-white border-r border-gray-200 shrink-0">
            <div className="flex p-6 items-center gap-3 border-b border-gray-100">
                <div className="w-10 h-10 bg-indigo-200 rounded-xl animate-pulse" />
                <div className="h-5 bg-indigo-100 rounded w-28 animate-pulse" />
            </div>
            <nav className="flex-1 px-3 py-5 space-y-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    </div>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-100">
                <div className="h-11 bg-red-50 rounded-xl animate-pulse" />
            </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col flex-1 overflow-hidden">
            <header className="p-2">
                <div className="bg-indigo-600 px-6 py-4 rounded-lg flex items-center justify-between">
                    <div className="h-5 bg-indigo-500 rounded w-28 animate-pulse" />
                    <div className="flex items-center gap-6">
                        <div className="w-6 h-6 bg-indigo-500 rounded-full animate-pulse" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-500 rounded-full animate-pulse" />
                            <div className="h-4 bg-indigo-500 rounded w-20 animate-pulse" />
                        </div>
                    </div>
                </div>
            </header>
            <main className="p-4 flex-1 space-y-6 overflow-y-auto">
                {/* Stat cards */}
                <div className="grid grid-cols-2 xl:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-11 h-11 bg-indigo-100 rounded-xl" />
                                <div className="h-3 bg-gray-200 rounded w-20" />
                            </div>
                            <div className="h-8 bg-gray-200 rounded w-12" />
                        </div>
                    ))}
                </div>
                {/* Chart area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm animate-pulse h-64" />
                    <div className="bg-white rounded-xl shadow-sm animate-pulse h-64" />
                </div>
            </main>
        </div>
    </div>
);

export default AppShellSkeleton;
