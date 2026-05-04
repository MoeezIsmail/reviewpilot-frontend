import { Search } from "lucide-react";

const RATING_OPTIONS = [
    { value: "all", label: "All Ratings" },
    { value: "5", label: "⭐⭐⭐⭐⭐" },
    { value: "4", label: "⭐⭐⭐⭐" },
    { value: "3", label: "⭐⭐⭐" },
    { value: "2", label: "⭐⭐" },
    { value: "1", label: "⭐" },
];

const ReviewFilters = ({
                           filter, setFilter,
                           search, setSearch,
                           sortBy, setSortBy,
                           ratingFilter, setRatingFilter,
                           SORT_OPTIONS,
                       }) => {
    return (
        <div className="flex flex-col gap-3">

            {/* Row 1 — Status Filter + Sort + Rating */}
            <div className="flex items-center justify-between flex-wrap gap-3">

                {/* Status Filters */}
                <div className="flex gap-2">
                    {["all", "replied", "pending"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                                filter === f
                                    ? "!bg-indigo-600 text-white"
                                    : "!bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Sort + Rating */}
                <div className="flex items-center gap-2">
                    {/* Rating Filter */}
                    <select
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:border-indigo-400 bg-white"
                    >
                        {RATING_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:border-indigo-400 bg-white"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Row 2 — Search */}
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    placeholder="Search by customer name or review text..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-lg pl-8 pr-4 py-2 text-sm focus:border-indigo-400 focus:outline-none"
                />
            </div>
        </div>
    );
};

export default ReviewFilters;