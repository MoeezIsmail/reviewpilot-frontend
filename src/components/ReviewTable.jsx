import {useState, useEffect} from "react";
import ReviewCard from "./ReviewCard.jsx";
import {useReviews} from "../context/ReviewsContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {RefreshCw} from "lucide-react";
import Lottie from "lottie-react";
import loader from "../assets/loading.json";
import Button from "../includes/Button.jsx";
import ReviewFilters from "./ReviewFilters.jsx";
import useReviewFilters from "../hooks/useReviewFilters.js";

const ReviewsTable = () => {
    const {
        reviewsData,
        loadNextPage,
        loading,
        aiReplies,
        replyStatus,
        refreshReviews,
        postAllReplies,
        isPostingAll,
        generateAllReplies,
        isGeneratingAll
    } = useReviews();

    const {user} = useAuth();

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

    useEffect(() => {
        const handleScroll = () => {

            const bottom = document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight;

            if (bottom && !loading && reviewsData.nextPageToken) {
                loadNextPage(user._id);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [reviewsData.nextPageToken, loading, user?._id]);

    const pendingRepliesCount = reviewsData.reviews.filter((review) => {
        const reviewId = review.reviewId || review.name;
        return replyStatus[reviewId] === "ready";  // ← sirf "ready" wale
    }).length;

    const pendingGenerateCount = reviewsData.reviews.filter((review) => {
        const reviewId = review.reviewId || review.name;
        const status = replyStatus[reviewId];
        return status === "idle" || status === "failed";
    }).length;

    return (
        <div className="flex flex-col gap-4">

            {/* Top Toolbar — Bulk Actions + Refresh */}
            <div className="flex items-center justify-end gap-3">

            </div>

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
            {filteredReviews?.length > 0 ? (<div className="flex flex-col gap-3 max-h-[68vh] overflow-y-auto pr-2">
                    {filteredReviews.map((review, i) => (<ReviewCard key={review.name || i} review={review}/>))}
                </div>) : (
                <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-96">
                    {loading ? <Lottie animationData={loader} loop className="max-w-96"/> :
                        <p className="text-gray-400 text-sm">No reviews found.</p>}
                </div>)}

            {/* Load More */}
            {reviewsData?.nextPageToken && (<div className="flex justify-center">
                    <button
                        onClick={() => loadNextPage(user._id)}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg text-sm font-medium text-white ${loading ? "!bg-gray-400" : "!bg-indigo-600 hover:!bg-indigo-700"}`}
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                </div>)}
        </div>
    );
};

export default ReviewsTable;