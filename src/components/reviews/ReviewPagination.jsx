import { Loader2 } from "lucide-react";
import { useReviews } from "../../context/ReviewsContext.jsx";

const ReviewPagination = () => {
    const { currentPage, totalPagesLoaded, hasNextPage, goToPage, loading } = useReviews();

    if (totalPagesLoaded === 1 && !hasNextPage) return null;

    const pageNums = Array.from({ length: totalPagesLoaded }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center">
                {pageNums.map((page, idx) => {
                    const isActive = page === currentPage;
                    const isVisited = page < currentPage;
                    const isLast = idx === pageNums.length - 1;
                    const isLoadingThis = loading && isActive;

                    return (
                        <div key={page} className="flex items-center">
                            {/* Node */}
                            <button
                                onClick={() => !isActive && !loading && goToPage(page)}
                                disabled={loading || isActive}
                                className={`relative flex items-center justify-center rounded-full font-bold transition-all duration-300 z-10
                                    ${isActive
                                        ? "w-9 h-9 !bg-indigo-600 !text-white shadow-md shadow-indigo-300 cursor-default ring-4 ring-indigo-100"
                                        : isVisited
                                            ? "w-8 h-8 bg-indigo-500 !text-white hover:scale-110 cursor-pointer"
                                            : "w-8 h-8 bg-indigo-200 border-2 !border-gray-200 !text-gray-400 hover:border-indigo-300 hover:!text-indigo-500 cursor-pointer"
                                    } ${loading && !isActive ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {isLoadingThis
                                    ? <Loader2 size={14} className="animate-spin" />
                                    : <span className={isActive ? "text-sm" : "text-xs"}>{page}</span>
                                }
                                {isActive && (
                                    <span className="absolute inset-0 rounded-full animate-ping !bg-indigo-400 opacity-20" />
                                )}
                            </button>

                            {/* Line to next numbered node */}
                            {!isLast && (
                                <div className={`w-10 h-0.5 transition-all duration-500
                                    ${page < currentPage ? "!bg-indigo-500" : "!bg-gray-200"}`}
                                />
                            )}

                            {/* Line + "+" ghost node after last loaded page */}
                            {isLast && hasNextPage && (
                                <>
                                    <div className={`w-10 h-0.5 transition-all duration-500
                                        ${page <= currentPage ? "!bg-indigo-400" : "!bg-gray-200"}`}
                                    />
                                    <button
                                        onClick={() => !loading && goToPage(totalPagesLoaded + 1)}
                                        disabled={loading}
                                        className={`w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center font-bold transition-all z-10 bg-white
                                            ${loading
                                                ? "!border-gray-200 !text-gray-300 cursor-not-allowed"
                                                : "!border-indigo-300 !text-indigo-400 hover:!border-indigo-500 hover:bg-indigo-50 hover:!text-indigo-600 cursor-pointer"
                                            }`}
                                    >
                                        {loading
                                            ? <Loader2 size={11} className="animate-spin" />
                                            : <span className="text-sm">+</span>
                                        }
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewPagination;
