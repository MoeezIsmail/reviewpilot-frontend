import {useState, useEffect} from "react";
import ReviewCard from "./ReviewCard.jsx";
import {useReviews} from "../context/ReviewsContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {RefreshCw} from "lucide-react";
import Lottie from "lottie-react";
import loader from "../assets/loading.json";
import Button from "../includes/Button.jsx";
import InputField from "../includes/InputField.jsx";

const ReviewsTable = () => {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

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
        isGeneratingAll} = useReviews();

    const {user} = useAuth();

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

    const filteredReviews = reviewsData.reviews
        ?.filter((r) => {
            const reviewId = r.name || r.review_id;

            const reply = r.reviewReply?.comment || r.response?.snippet ||
                aiReplies[reviewId]?.reply || "";

            if (filter === "replied") return reply !== "";

            if (filter === "pending") return reply === "";

            return true;
        })
        ?.filter((r) => {
            const text = r.comment || r.snippet || "";

            const name = r.reviewer?.displayName || r.user?.name || "";

            return text.toLowerCase().includes(search.toLowerCase()) ||
                name.toLowerCase().includes(search.toLowerCase());
        });

    let existingReply;

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

            {/* Toolbar */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-end gap-3">
                    {pendingGenerateCount > 0 && (
                        <Button
                            onClick={generateAllReplies}
                            disabled={isGeneratingAll || isPostingAll}
                            variant="primary"
                        >
                            {isGeneratingAll
                                ? `Generating...`
                                : `Generate All (${pendingGenerateCount})`
                            }
                        </Button>
                    )}

                    {pendingRepliesCount > 0 && (
                        <Button
                            onClick={postAllReplies}
                            disabled={isPostingAll}
                            children={`Post All (${pendingRepliesCount})`}
                            variant={'success'}
                        />

                    )}

                    <InputField
                        placeholder="Search reviews..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        onClick={refreshReviews}
                        disabled={loading}
                        className="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline disabled:opacity-50"
                    >
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""}/>
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                </div>

                <div className="flex gap-2">
                    {["all", "replied", "pending"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                                filter === f
                                    ? "!bg-indigo-600 text-white"
                                    : "!bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews */}
            {filteredReviews?.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {filteredReviews.map((review, i) => (
                        <ReviewCard key={review.name || i} review={review}/>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-64">
                    {loading
                        ? <Lottie animationData={loader} loop={true} className="w-40 h-40"/>
                        : <p className="text-gray-400 text-sm">No reviews found.</p>
                    }
                </div>
            )}

            {/* Load More */}
            {reviewsData?.nextPageToken && (
                <div className="flex justify-center">
                    <button
                        onClick={() => loadNextPage(user._id)}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg text-sm font-medium text-white ${
                            loading ? "!bg-gray-400" : "!bg-indigo-600 hover:!bg-indigo-700"
                        }`}
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewsTable;