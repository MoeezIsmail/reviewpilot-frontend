import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useReviews } from "../../context/ReviewsContext.jsx";

const ReviewPagination = () => {
    const { currentPage, totalPagesLoaded, hasNextPage, goToPage, loading } = useReviews();

    if (totalPagesLoaded <= 1 && !hasNextPage) return null;

    const canGoPrev = currentPage > 1;
    const canGoNext = hasNextPage || currentPage < totalPagesLoaded;
    const pageNums = Array.from({ length: totalPagesLoaded }, (_, i) => i + 1);

    const totalNodes = totalPagesLoaded + (hasNextPage ? 1 : 0);
    const progressPercent = totalNodes > 1
        ? ((currentPage - 1) / (totalNodes - 1)) * 100
        : 0;

    return (
        <div className="flex flex-col items-center gap-3 py-3 bg-red-500">

            <div className="flex items-center">
                {/* Prev */}
                <button
                    onClick={() => canGoPrev && !loading && goToPage(currentPage - 1)}
                    disabled={!canGoPrev || loading}
                    className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 transition-all
                        ${canGoPrev && !loading
                            ? "!text-indigo-500 hover:!bg-indigo-50 cursor-pointer"
                            : "!text-gray-500 cursor-not-allowed"
                        }`}
                >
                    <ChevronLeft size={15} color={'black'} strokeWidth={2.5} />
                </button>

                {/* Track + Nodes */}
                <div className="relative flex items-center">

                    {/* Background track */}
                    <div className="absolute top-[18px] left-3.5 right-3.5 h-1 !bg-gray-100 rounded-full" />

                    {/* Filled progress */}
                    <div
                        className="absolute top-[18px] left-3.5 h-1 !bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `calc(${progressPercent}% * (100% - 28px) / 100%)` }}
                    />

                    {/* Nodes */}
                    <div className="relative flex items-start gap-6 px-3.5">
                        {pageNums.map((page) => {
                            const isActive = page === currentPage;
                            const isVisited = page < currentPage;
                            const isLoadingThis = loading && page === currentPage;

                            return (
                                <div key={page} className="flex flex-col items-center gap-1.5">
                                    <button
                                        onClick={() => !isActive && !loading && goToPage(page)}
                                        disabled={loading || isActive}
                                        className={`relative flex items-center justify-center rounded-full transition-all duration-300 z-10
                                            ${isActive
                                                ? "w-9 h-9 !bg-indigo-600 !text-white shadow-lg shadow-indigo-300 cursor-default ring-4 ring-indigo-100"
                                                : isVisited
                                                    ? "w-7 h-7 bg-indigo-500 !text-white hover:bg-indigo-600 hover:scale-110 cursor-pointer"
                                                    : "w-7 h-7 bg-white border-2 !border-gray-200 !text-gray-400 hover:border-indigo-300 hover:text-indigo-500 cursor-pointer"
                                            } ${loading && !isActive ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {isLoadingThis
                                            ? <Loader2 size={14} className="animate-spin" />
                                            : <span className={`font-bold leading-none ${isActive ? "text-sm" : "text-xs"}`}>{page}</span>
                                        }
                                        {isActive && (
                                            <span className="absolute inset-0 rounded-full animate-ping bg-indigo-400 opacity-20" />
                                        )}
                                    </button>
                                    <span className={`text-[10px] font-medium tracking-wide transition-colors
                                        ${isActive ? "!text-indigo-600" : isVisited ? "!text-indigo-400" : "!text-gray-300"}`}>
                                        {isActive ? "current" : `pg ${page}`}
                                    </span>
                                </div>
                            );
                        })}

                        {/* Ghost node for next unloaded page */}
                        {hasNextPage && (
                            <div className="flex flex-col items-center gap-1.5">
                                <button
                                    onClick={() => !loading && goToPage(totalPagesLoaded + 1)}
                                    disabled={loading}
                                    className={`w-7 h-7 rounded-full border-2 border-dashed flex items-center justify-center transition-all z-10 bg-white
                                        ${loading
                                            ? "!border-gray-200 !text-gray-300 cursor-not-allowed"
                                            : "border-indigo-300 !text-indigo-400 hover:border-indigo-500 hover:bg-indigo-50 hover:!text-indigo-600 cursor-pointer"
                                        }`}
                                >
                                    {loading
                                        ? <Loader2 size={11} className="animate-spin" />
                                        : <span className="text-[10px] font-bold">+</span>
                                    }
                                </button>
                                <span className="text-[10px] !text-gray-300 font-medium">more</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Next */}
                <button
                    onClick={() => canGoNext && !loading && goToPage(currentPage + 1)}
                    disabled={!canGoNext || loading}
                    className={`w-7 h-7 rounded-full flex items-center justify-center ml-3 transition-all
                        ${canGoNext && !loading
                            ? "!text-indigo-500 hover:bg-indigo-50 cursor-pointer"
                            : "!text-gray-300 cursor-not-allowed"
                        }`}
                >
                    <ChevronRight size={15} color={'black'} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default ReviewPagination;
