import ReviewCard from "./ReviewCard.jsx";
import { useReviews } from "../../context/ReviewsContext.jsx";
import ReviewFilters from "./ReviewFilters.jsx";
import useReviewFilters from "../../hooks/useReviewFilters.js";
import ReviewsSkeleton from "../skeletons/ReviewsSkeleton.jsx";
import ReviewPagination from "./ReviewPagination.jsx";

const ReviewsTable = () => {
    const {
        reviewsData,
        loading,
        aiReplies,
        replyStatus,
        refreshReviews,
        postAllReplies,
        isPostingAll,
        generateAllReplies,
        isGeneratingAll,
    } = useReviews();

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
    } = useReviewFilters(reviewsData.reviews, aiReplies, replyStatus);

    const pendingRepliesCount = reviewsData.reviews.filter((review) => {
        const reviewId = review.reviewId || review.name;
        return replyStatus[reviewId] === "ready";
    }).length;

    const pendingGenerateCount = reviewsData.reviews.filter((review) => {
        const reviewId = review.reviewId || review.name;
        const status = replyStatus[reviewId];
        return status === "idle" || status === "failed";
    }).length;

    if (loading && !reviewsData.reviews?.length) {
        return <ReviewsSkeleton />;
    }

    return (
        <div className="flex flex-col gap-4">

            {/* Filters */}
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
                pendingRepliesCount={pendingRepliesCount} postAllReplies={postAllReplies}
                refreshReviews={refreshReviews} loading={loading}
            />

            {/* Reviews */}
            {filteredReviews?.length > 0 ? (
                <div className="flex flex-col gap-3 max-h-[72vh] overflow-y-auto pr-2">
                    {filteredReviews.map((review, i) => (
                        <ReviewCard key={review.name || i} review={review} />
                    ))}

                    <ReviewPagination />
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-96">
                    <p className="text-gray-400 text-sm">No reviews found.</p>
                </div>
            )}

        </div>
    );
};

export default ReviewsTable;
