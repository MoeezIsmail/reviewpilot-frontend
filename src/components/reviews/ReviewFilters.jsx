import { Search, Star, ArrowUpDown, RefreshCw, Lock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";

const RATING_OPTIONS = [
    { value: "all", label: "All Ratings" },
    { value: "5",   label: "⭐⭐⭐⭐⭐" },
    { value: "4",   label: "⭐⭐⭐⭐" },
    { value: "3",   label: "⭐⭐⭐" },
    { value: "2",   label: "⭐⭐" },
    { value: "1",   label: "⭐" },
];

const ReviewFilters = ({
    filter, setFilter,
    search, setSearch,
    sortBy, setSortBy,
    ratingFilter, setRatingFilter,
    SORT_OPTIONS,
    pendingGenerateCount, generateAllReplies, isGeneratingAll, isPostingAll,
    pendingRepliesCount, postAllReplies, refreshReviews, loading,
    isFreePlan,
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-3">
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    placeholder="Search by customer name or review text..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-lg pl-8 pr-4 py-2 text-sm focus:border-indigo-400 focus:outline-none"
                />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-6 rounded-xl p-2 !bg-white">

                <div className="flex gap-6 items-center">
                    {/* Status Filters */}
                    <div className="flex gap-2 rounded-xl p-2 !bg-gray-100">
                        {["all", "replied", "pending"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1 rounded-xl text-sm font-medium capitalize transition-all ${
                                    filter === f
                                        ? "!bg-indigo-600 text-white"
                                        : "!bg-gray-50 border border-gray-200 text-gray-600 hover:border-indigo-300"
                                }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="w-[2px] h-8 !bg-gray-200" />

                    {/* Sort + Rating */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-4 h-4" />
                            <select
                                value={ratingFilter}
                                onChange={(e) => setRatingFilter(e.target.value)}
                                className="appearance-none text-sm border border-gray-200 rounded-xl pl-10 pr-10 py-4 text-gray-700 bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                            >
                                {RATING_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"> ▼ </span>
                        </div>

                        <div className="relative">
                            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-4 h-4" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none text-sm border border-gray-200 rounded-xl pl-10 pr-10 py-4 text-gray-700 bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"> ▼ </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 p-2">
                    {/* Bulk Generate — locked for free plan */}
                    {isFreePlan ? (
                        <button
                            onClick={() => navigate("/subscription")}
                            className="flex items-center gap-1.5 text-sm font-medium bg-indigo-50 text-indigo-400 px-4 py-2 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-colors group"
                            title="Upgrade to unlock Bulk AI Generate"
                        >
                            <Lock size={13} className="group-hover:hidden" />
                            <Zap size={13} className="hidden group-hover:block text-indigo-500" />
                            Generate All
                            <span className="text-xs font-semibold bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 px-1.5 py-0.5 rounded-full transition-colors">
                                Pro
                            </span>
                        </button>
                    ) : (
                        pendingGenerateCount > 0 && (
                            <Button
                                onClick={generateAllReplies}
                                disabled={isGeneratingAll || isPostingAll}
                                variant="primary"
                            >
                                {isGeneratingAll ? "Generating..." : `Generate All (${pendingGenerateCount})`}
                            </Button>
                        )
                    )}

                    {pendingRepliesCount > 0 && (
                        <Button
                            onClick={postAllReplies}
                            disabled={isPostingAll || isGeneratingAll}
                            variant="success"
                        >
                            {isPostingAll ? "Posting..." : `Post All (${pendingRepliesCount})`}
                        </Button>
                    )}

                    <button
                        onClick={refreshReviews}
                        disabled={loading}
                        className="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline disabled:opacity-50"
                    >
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewFilters;
