import { Search, ArrowUpDown, RefreshCw, Lock, Zap, Send, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePlanFeatures from "../../hooks/usePlanFeatures.js";
import { useToast } from "../toast/ToastProvider.jsx";

const RATING_OPTIONS = [
    { value: "all",  label: "All Ratings" },
    { value: "5",    label: "5 ★" },
    { value: "4",    label: "4 ★" },
    { value: "3",    label: "3 ★" },
    { value: "2",    label: "2 ★" },
    { value: "1",    label: "1 ★" },
];

const STATUS_TABS = [
    { value: "all",     label: "All" },
    { value: "replied", label: "Replied" },
    { value: "pending", label: "Pending" },
];

const ReviewFilters = ({
    filter, setFilter,
    search, setSearch,
    sortBy, setSortBy,
    ratingFilter, setRatingFilter,
    SORT_OPTIONS,
    pendingGenerateCount, generateAllReplies, isGeneratingAll, isPostingAll,
    pendingRepliesCount, postAllReplies, refreshReviews, loading,
    isFreePlan, displayCount,
}) => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { canBulkGenerate, canBulkPost } = usePlanFeatures();

    const handleLockedGenerate = () => {
        addToast("Upgrade your plan to unlock Bulk AI Generate.", "warning");
        navigate("/subscription");
    };

    const handleLockedPost = () => {
        addToast("Upgrade to Pro to unlock Bulk Posting.", "warning");
        navigate("/subscription");
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">

            {/* Search row */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
                <div className="relative">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        placeholder="Search by name or review text…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl pl-9 pr-24 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-700 transition-all"
                    />
                    {displayCount !== undefined && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 tabular-nums pointer-events-none">
                            {displayCount} shown
                        </span>
                    )}
                </div>
            </div>

            {/* Controls row */}
            <div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">

                {/* Left: status tabs + selects */}
                <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Status segmented control */}
                    <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                        {STATUS_TABS.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => setFilter(value)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                    filter === value
                                        ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-5 bg-gray-200 dark:bg-gray-600" />

                    {/* Rating select */}
                    <div className="relative">
                        <Star size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
                        <select
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            className="text-xs border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl pl-7 pr-3 py-2 focus:outline-none focus:border-indigo-400 cursor-pointer transition-colors appearance-none"
                        >
                            {RATING_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort select */}
                    <div className="relative">
                        <ArrowUpDown size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-xs border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl pl-7 pr-3 py-2 focus:outline-none focus:border-indigo-400 cursor-pointer transition-colors appearance-none"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right: action buttons */}
                <div className="flex items-center gap-2">
                    {/* Generate All */}
                    {isFreePlan ? (
                        <button
                            onClick={handleLockedGenerate}
                            className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-400 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 px-3 py-2 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                            <Lock size={11} />
                            Generate All
                            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">Pro</span>
                        </button>
                    ) : (
                        pendingGenerateCount > 0 && (
                            <button
                                onClick={canBulkGenerate ? generateAllReplies : handleLockedGenerate}
                                disabled={isGeneratingAll || isPostingAll}
                                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                    canBulkGenerate
                                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 border-gray-200 dark:border-gray-600"
                                }`}
                            >
                                {!canBulkGenerate
                                    ? <><Lock size={11} /> Generate All</>
                                    : isGeneratingAll
                                        ? <><Zap size={11} className="animate-pulse" /> Generating…</>
                                        : <><Zap size={11} /> Generate All ({pendingGenerateCount})</>
                                }
                            </button>
                        )
                    )}

                    {/* Post All */}
                    <button
                        onClick={canBulkPost ? postAllReplies : handleLockedPost}
                        disabled={isPostingAll || isGeneratingAll}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            canBulkPost
                                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-500 border-gray-200 dark:border-gray-600"
                        }`}
                    >
                        {!canBulkPost
                            ? <><Lock size={11} /> Post All</>
                            : isPostingAll
                                ? <><Send size={11} className="animate-pulse" /> Posting…</>
                                : <><Send size={11} /> Post All ({pendingRepliesCount})</>
                        }
                    </button>

                    {/* Refresh */}
                    <button
                        onClick={refreshReviews}
                        disabled={loading}
                        title="Refresh reviews"
                        className="flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewFilters;
