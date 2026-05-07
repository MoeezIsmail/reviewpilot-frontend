import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useReviews } from "../../context/ReviewsContext.jsx";

const ReviewPagination = () => {
    const { currentPage, totalPagesLoaded, hasNextPage, goToPage, loading } = useReviews();

    if (totalPagesLoaded <= 1 && !hasNextPage) return null;

    const canGoPrev = currentPage > 1;
    const canGoNext = hasNextPage || currentPage < totalPagesLoaded;

    const pageChips = Array.from({ length: totalPagesLoaded }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center gap-3 pt-2 pb-1 select-none">
            {/* Track */}
            <div className="flex items-center gap-1">
                {/* Prev Arrow */}
                <button
                    onClick={() => canGoPrev && goToPage(currentPage - 1)}
                    disabled={!canGoPrev || loading}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
                        ${canGoPrev && !loading
                            ? "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                >
                    <ChevronLeft size={16} strokeWidth={2.5} />
                </button>

                {/* Page chips */}
                <div className="flex items-center gap-1.5 px-1">
                    {pageChips.map((page) => {
                        const isActive = page === currentPage;
                        const isLoading = loading && page === currentPage;
                        return (
                            <button
                                key={page}
                                onClick={() => !isActive && !loading && goToPage(page)}
                                disabled={loading}
                                className={`relative h-8 min-w-[2rem] px-2.5 rounded-lg text-xs font-semibold transition-all duration-200
                                    ${isActive
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-110 ring-2 ring-indigo-300 ring-offset-1"
                                        : "text-gray-500 border border-gray-200 bg-white hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 cursor-pointer"
                                    } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
                            >
                                {isLoading
                                    ? <Loader2 size={12} className="animate-spin mx-auto" />
                                    : page
                                }
                            </button>
                        );
                    })}

                    {/* Dashed "next" indicator */}
                    {hasNextPage && currentPage === totalPagesLoaded && (
                        <button
                            onClick={() => !loading && goToPage(totalPagesLoaded + 1)}
                            disabled={loading}
                            className={`h-8 px-2.5 rounded-lg text-xs font-semibold border-2 border-dashed transition-all duration-200
                                ${loading
                                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                    : "border-indigo-300 text-indigo-400 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 cursor-pointer"
                                }`}
                        >
                            {loading
                                ? <Loader2 size={12} className="animate-spin mx-auto" />
                                : "···"
                            }
                        </button>
                    )}
                </div>

                {/* Next Arrow */}
                <button
                    onClick={() => canGoNext && goToPage(currentPage + 1)}
                    disabled={!canGoNext || loading}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
                        ${canGoNext && !loading
                            ? "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                >
                    <ChevronRight size={16} strokeWidth={2.5} />
                </button>
            </div>

            {/* Subtle label */}
            <p className="text-[11px] text-gray-400 tracking-wide">
                Page {currentPage}
                {totalPagesLoaded > 1 && ` of ${totalPagesLoaded}${hasNextPage ? "+" : ""}`}
            </p>
        </div>
    );
};

export default ReviewPagination;
