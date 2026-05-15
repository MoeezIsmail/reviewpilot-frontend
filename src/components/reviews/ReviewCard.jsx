import { useReviews } from "../../context/ReviewsContext.jsx";
import { formatDate, getInitials, getRating, getReviewerName, getReviewText } from "../../utils/reviewUtils.jsx";
import { getAvatarColor, getReviewerProfileImage } from "../../utils/avatarUtils.jsx";
import ReviewReplyBox from "./ReviewReplyBox.jsx";
import ReviewActions from "./ReviewActions.jsx";

const STATUS_CONFIG = {
    idle:       { label: "Pending",    bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-700 dark:text-yellow-400" },
    generating: { label: "Generating", bg: "bg-blue-100 dark:bg-blue-900/40",     text: "text-blue-700 dark:text-blue-400"   },
    ready:      { label: "Ready",      bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-700 dark:text-indigo-400" },
    posting:    { label: "Posting...", bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-700 dark:text-orange-400" },
    posted:     { label: "Posted",     bg: "bg-green-100 dark:bg-green-900/40",   text: "text-green-700 dark:text-green-400"  },
    failed:     { label: "Failed",     bg: "bg-red-100 dark:bg-red-900/40",       text: "text-red-700 dark:text-red-400"    },
};

const ReviewerAvatar = ({ profilePic, initials, avatarColor }) => (
    <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
    >
        {profilePic
            ? <img src={profilePic} alt={initials} className="w-full h-full object-cover" />
            : initials
        }
    </div>
);

const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-200 dark:text-gray-600"}`}>
                ★
            </span>
        ))}
    </div>
);

const ReviewCard = ({ review }) => {
    const { aiReplies, generateAiReply, isPostingAll, replyStatus, postSingleReply } = useReviews();

    const reviewId = review.reviewId || review.name;
    const aiData = aiReplies[reviewId] || {};
    const status = replyStatus[reviewId] || "idle";

    const existingReply = review.reviewReply?.comment || "";
    const replyText = aiData.reply || existingReply;
    const isPosted = status === "posted";

    const rating = getRating(review.starRating);
    const reviewerName = getReviewerName(review);
    const avatarColor = getAvatarColor(reviewerName);
    const initials = getInitials(reviewerName);
    const profilePic = getReviewerProfileImage(review);
    const currentStatus = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <ReviewerAvatar
                        profilePic={profilePic}
                        initials={initials}
                        avatarColor={avatarColor}
                    />
                    <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{reviewerName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(review.createTime)} · Google
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <StarRating rating={rating} />
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${currentStatus.bg} ${currentStatus.text}`}>
                        {currentStatus.label}
                    </span>
                </div>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {getReviewText(review)}
            </p>

            {/* Reply Box */}
            <ReviewReplyBox
                reviewId={reviewId}
                replyText={replyText}
                status={status}
                isPosted={isPosted}
            />

            {/* Actions */}
            <ReviewActions
                status={status}
                hasReply={!!replyText}
                isPostingAll={isPostingAll}
                onPost={() => postSingleReply(reviewId, replyText)}
                onAiReply={() => generateAiReply(reviewId, getReviewText(review), rating)}
            />

        </div>
    );
};

export default ReviewCard;
