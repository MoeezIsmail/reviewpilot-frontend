import ReviewCard from "./ReviewCard.jsx";
import { useReviews } from "../../context/ReviewsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import ReviewFilters from "./ReviewFilters.jsx";
import useReviewFilters from "../../hooks/useReviewFilters.js";
import ReviewsSkeleton from "../skeletons/ReviewsSkeleton.jsx";
import ReviewPagination from "./ReviewPagination.jsx";
import { MessageSquare } from "lucide-react";

const ReviewsTable = () => {
    const {
        reviewsData,
        allReviews,
        loading,
        aiReplies,
        replyStatus,
        refreshReviews,
        postAllReplies,
        isPostingAll,
        generateAllReplies,
        isGeneratingAll,
    } = useReviews();
    const { user } = useAuth();
    const isFreePlan = !user?.subscription?.plan || user?.subscription?.plan === "starter";

    const {
        filter,
        setFilter,
        search,
        setSearch,
        sortBy,
        setSortBy,
        ratingFilter,
        setRatingFilter,
        filteredReviews,
        SORT_OPTIONS,
    } = useReviewFilters(allReviews, aiReplies, replyStatus);

    const currentPageIds = new Set(
        reviewsData.reviews?.map(r => r.reviewId || r.name) || []
    );

    const displayReviews = filteredReviews.filter(r =>
        currentPageIds.has(r.reviewId || r.name)
    );

    const pendingRepliesCount = reviewsData.reviews?.filter(r => {
        const id = r.reviewId || r.name;
        return replyStatus[id] === "ready";
    }).length || 0;

    const pendingGenerateCount = reviewsData.reviews?.filter(r => {
        const id = r.reviewId || r.name;
        const s = replyStatus[id];
        return s === "idle" || s === "failed";
    }).length || 0;

    if (loading && !reviewsData.reviews?.length) {
        return <ReviewsSkeleton />;
    }

    return (
        <div className="flex flex-col gap-4">
            <ReviewFilters
                filter={filter} setFilter={setFilter}
                search={search} setSearch={setSearch}
                sortBy={sortBy} setSortBy={setSortBy}
                ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
                SORT_OPTIONS={SORT_OPTIONS}
                pendingGenerateCount={pendingGenerateCount}
                generateAllReplies={generateAllReplies}
                isGeneratingAll={isGeneratingAll}
                isPostingAll={isPostingAll}
                pendingRepliesCount={pendingRepliesCount}
                postAllReplies={postAllReplies}
                refreshReviews={refreshReviews}
                loading={loading}
                isFreePlan={isFreePlan}
                displayCount={displayReviews.length}
            />

            {displayReviews.length > 0 ? (
                <div className="reviews-card-container flex flex-col gap-3 max-h-[73vh]">
                    {displayReviews.map((review, i) => (
                        <ReviewCard key={review.reviewId || review.name || i} review={review} />
                    ))}
                    <ReviewPagination />
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-3 h-64">
                    {!loading && (
                        <>
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                                <MessageSquare size={20} className="text-gray-400" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">No reviews found</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Try adjusting your filters</p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewsTable;
