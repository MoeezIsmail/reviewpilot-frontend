import ReviewCard from "./ReviewCard.jsx";
import { useReviews } from "../../context/ReviewsContext.jsx";
import ReviewFilters from "./ReviewFilters.jsx";
import useReviewFilters from "../../hooks/useReviewFilters.js";
import ReviewsSkeleton from "../skeletons/ReviewsSkeleton.jsx";
import ReviewPagination from "./ReviewPagination.jsx";

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

    // ← Filters allReviews pe apply hote hain (search/sort/rating)
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

    // ← Current page ke IDs
    const currentPageIds = new Set(
        reviewsData.reviews?.map(r => r.reviewId || r.name) || []
    );

    // ← Sirf current page ke reviews dikhao — filtered results mein se
    const displayReviews = filteredReviews.filter(r =>
        currentPageIds.has(r.reviewId || r.name)
    );

    // ← Buttons current page ke reviews pe calculate hon
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
                pendingRepliesCount={pendingRepliesCount}
                postAllReplies={postAllReplies}
                refreshReviews={refreshReviews}
                loading={loading}
            />

            {/* ← displayReviews use karo — filteredReviews nahi */}
            {displayReviews?.length > 0 ? (
                <div className="flex flex-col gap-3 max-h-[73vh] overflow-y-auto pr-2">
                    {displayReviews.map((review, i) => (
                        <ReviewCard key={review.reviewId || review.name || i} review={review} />
                    ))}
                    <ReviewPagination />
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-96">
                    {loading
                        ? null
                        : <p className="text-gray-400 text-sm">No reviews found.</p>
                    }
                </div>
            )}

        </div>
    );
};

export default ReviewsTable;