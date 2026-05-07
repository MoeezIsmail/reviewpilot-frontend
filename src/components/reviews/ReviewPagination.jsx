import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useReviews } from "../../context/ReviewsContext.jsx";

const ReviewPagination = () => {
    const { currentPage, totalPagesLoaded, hasNextPage, goToPage, loading } = useReviews();

    if (totalPagesLoaded <= 1 && !hasNextPage) return null;

    const canGoPrev = currentPage > 1;
    const canGoNext = hasNextPage || currentPage < totalPagesLoaded;
    const pageNums = Array.from({ length: totalPagesLoaded }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center gap-4 py-3">

            {/* Node track */}
            <div className="flex items-center">

                {/* Prev */}
                <button
                    onClick={() => canGoPrev && !loading && goToPage(currentPage - 1)}
                    disabled={!canGoPrev || loading}
                    className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 transition-all
                        ${canGoPrev && !loading
                            ? "text-indigo-500 hover:bg-indigo-50 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                >
                    <ChevronLeft size={15} strokeWidth={2.5} />
                </button>

                {/* Nodes + connectors */}
                <div className="flex items-center">
                    {pageNums.map((page, idx) => {
                        const isActive = page === currentPage;
                        const isVisited = page < currentPage;
                        const isLoadingThis = loading && page === currentPage;
                        const isLast = idx === pageNums.length - 1;

                        return (
                            <div key={page} className="flex items-center">
                                {/* Node */}
                                <div className="flex flex-col items-center gap-1.5">
                                    <button
                                        onClick={() => !isActive && !loading && goToPage(page)}
                                        disabled={loading || isActive}
                                        className={`relative flex items-center justify-center rounded-full transition-all duration-300
                                            ${isActive
                                                ? "w-9 h-9 bg-indigo-600 text-white shadow-lg shadow-indigo-300 cursor-default ring-4 ring-indigo-100"
                                                : isVisited
                                                    ? "w-7 h-7 bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-110 cursor-pointer"
                                                    : "w-7 h-7 bg-white border-2 border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 cursor-pointer"
                                            } ${loading && !isActive ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {isLoadingThis
                                            ? <Loader2 size={14} className="animate-spin" />
                                            : <span className={`font-bold leading-none ${isActive ? "text-sm" : "text-xs"}`}>{page}</span>
                                        }
                                        {/* Active pulse ring */}
                                        {isActive && (
                                            <span className="absolute inset-0 rounded-full animate-ping bg-indigo-400 opacity-20" />
                                        )}
                                    </button>
                                    <span className={`text-[10px] font-medium tracking-wide transition-colors
                                        ${isActive ? "text-indigo-600" : isVisited ? "text-indigo-400" : "text-gray-300"}`}>
                                        {isActive ? "current" : `pg ${page}`}
                                    </span>
                                </div>

                                {/* Connector line (between nodes) */}
                                {!isLast && (
                                    <div className={`w-10 h-0.5 mx-1 mb-4 rounded-full transition-all duration-300
                                        ${page < currentPage
                                            ? "bg-indigo-400"
                                            : "bg-gray-200"
                                        }`}
                                    />
                                )}

                                {/* Dashed connector + ghost node for next unloaded page */}
                                {isLast && hasNextPage && (
                                    <div className="flex items-center mb-4">
                                        <div className="w-6 h-0.5 mx-1 border-t-2 border-dashed border-indigo-200 rounded-full" />
                                        <button
                                            onClick={() => !loading && goToPage(totalPagesLoaded + 1)}
                                            disabled={loading}
                                            className={`w-7 h-7 rounded-full border-2 border-dashed flex items-center justify-center transition-all
                                                ${loading
                                                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                                    : "border-indigo-300 text-indigo-400 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
                                                }`}
                                        >
                                            {loading
                                                ? <Loader2 size={11} className="animate-spin" />
                                                : <span className="text-[10px] font-bold">+</span>
                                            }
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Next */}
                <button
                    onClick={() => canGoNext && !loading && goToPage(currentPage + 1)}
                    disabled={!canGoNext || loading}
                    className={`w-7 h-7 rounded-full flex items-center justify-center ml-3 transition-all
                        ${canGoNext && !loading
                            ? "text-indigo-500 hover:bg-indigo-50 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                >
                    <ChevronRight size={15} strokeWidth={2.5} />
                </button>
            </div>

            {/* Progress bar */}
            {totalPagesLoaded > 1 && (
                <div className="flex items-center gap-2">
                    <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${(currentPage / totalPagesLoaded) * 100}%` }}
                        />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                        {currentPage} / {totalPagesLoaded}{hasNextPage ? "+" : ""}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ReviewPagination;
