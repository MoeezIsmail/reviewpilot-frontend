import ReviewActions from "./ReviewActions";
import { useReviews } from "../context/ReviewsContext.jsx";
import { postReply } from "../api/reviewsApi.js";
import { useToast } from "./ToastProvider.jsx";
import {getInitials, getRating, getReviewerName, getReviewText, formatDate} from "../utils/reviewUtils.jsx";
import {getAvatarColor, getReviewerProfileImage} from "../utils/avatarUtils.jsx";


const ReviewCard = ({ review }) => {
    const { aiReplies, generateAiReply, reviewsData } = useReviews();
    const { addToast } = useToast();

    const reviewId = review.name || review.review_id;
    const aiData = aiReplies[reviewId] || {};
    const existingReply = review.reviewReply?.comment || review.response?.snippet || "";
    const hasResponse = !!existingReply || !!aiData.reply;
    const loading = aiData.loading || false;
    const rating = getRating(review);
    const reviewerName = getReviewerName(review);
    const avatarColor = getAvatarColor(reviewerName);
    const initials = getInitials(reviewerName);
    const profilePic = getReviewerProfileImage(review);

    const handleAutoReply = () => {
        generateAiReply(reviewId, getReviewText(review));
    };

    const handleApprove = async () => {
        if (!hasResponse) return;
        const replyText = aiData.reply || existingReply;
        try {
            await postReply(reviewId, replyText, reviewsData.accountId, reviewsData.locationId);
            addToast("Reply posted to Google!", "success");
        } catch (err) {
            console.error(err);
            addToast("Failed to post reply", "error");
        }
    };

    const isReplied = !!existingReply;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">

            {/* Header — Avatar + Name + Rating + Badge */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                        style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
                    >
                        <img src={profilePic} alt={initials}/>
                    </div>
                    <div>
                        <p className="font-medium text-sm text-gray-900">{reviewerName}</p>
                        <p className="text-xs text-gray-400">{formatDate(review)} · Google</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                        ))}
                    </div>
                    {/* Status Badge */}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isReplied
                            ? "bg-green-100 text-green-700"
                            : hasResponse
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-yellow-100 text-yellow-700"
                    }`}>
                        {isReplied ? "Replied" : hasResponse ? "Ready" : "Pending"}
                    </span>
                </div>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-600 leading-relaxed">{getReviewText(review)}</p>

            {/* AI Reply Box */}
            {(aiData.reply || existingReply) && (
                <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-indigo-500">
                    <p className="text-xs text-gray-400 mb-1 font-medium">
                        {existingReply ? "Reply" : "AI Reply"}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {aiData.reply || existingReply}
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={handleApprove}
                    disabled={!hasResponse || isReplied}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                        hasResponse && !isReplied
                            ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    {loading ? "..." : "Approve"}
                </button>

                <button
                    disabled={!hasResponse}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                        hasResponse
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    Edit
                </button>

                <button
                    onClick={handleAutoReply}
                    disabled={loading || isReplied}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                        !loading && !isReplied
                            ? "!bg-indigo-50 text-indigo-600 hover:!bg-indigo-100 cursor-pointer"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    {loading ? "Generating..." : "AI Reply"}
                </button>
            </div>

        </div>
    );
};

export default ReviewCard;