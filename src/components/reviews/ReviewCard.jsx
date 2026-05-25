import { useReviews } from "../../context/ReviewsContext.jsx";
import { formatDate, getInitials, getRating, getReviewerName, getReviewText } from "../../utils/reviewUtils.jsx";
import { getAvatarColor, getReviewerProfileImage } from "../../utils/avatarUtils.jsx";
import ReviewReplyBox from "./ReviewReplyBox.jsx";
import ReviewActions from "./ReviewActions.jsx";
import { Sparkles } from "lucide-react";

const STATUS_CONFIG = {
    idle:       { label: "Pending",    bg: "bg-amber-50 dark:bg-amber-950/40",    text: "text-amber-700 dark:text-amber-400",    dot: "bg-amber-400" },
    generating: { label: "Generating", bg: "bg-blue-50 dark:bg-blue-950/40",      text: "text-blue-700 dark:text-blue-400",      dot: "bg-blue-400 animate-pulse" },
    ready:      { label: "Ready",      bg: "bg-indigo-50 dark:bg-indigo-950/40",  text: "text-indigo-700 dark:text-indigo-400",  dot: "bg-indigo-500" },
    posting:    { label: "Posting…",   bg: "bg-orange-50 dark:bg-orange-950/40",  text: "text-orange-700 dark:text-orange-400",  dot: "bg-orange-400 animate-pulse" },
    posted:     { label: "Posted",     bg: "bg-emerald-50 dark:bg-emerald-950/40",text: "text-emerald-700 dark:text-emerald-400",dot: "bg-emerald-500" },
    failed:     { label: "Failed",     bg: "bg-rose-50 dark:bg-rose-950/40",      text: "text-rose-700 dark:text-rose-400",      dot: "bg-rose-500" },
};

// Inline style for left accent — avoids Tailwind v4 border shorthand conflicts
const RATING_ACCENT = {
    5: "#34d399", // emerald-400
    4: "#a3e635", // lime-400
    3: "#fbbf24", // amber-400
    2: "#fb923c", // orange-400
    1: "#fb7185", // rose-400
};

const ReviewerAvatar = ({ profilePic, initials, avatarColor }) => (
    <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 overflow-hidden"
        style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
    >
        {profilePic
            ? <img src={profilePic} alt={initials} className="w-full h-full object-cover" />
            : initials
        }
    </div>
);

const StarRating = ({ rating }) => (
    <div className="flex gap-px">
        {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm leading-none ${i < rating ? "text-amber-400" : "text-gray-200 dark:text-gray-600"}`}>
                ★
            </span>
        ))}
    </div>
);

const AiReplyGeneratingBox = () => (
    <div className="bg-blue-50 dark:bg-blue-950/30 border-l-[3px] border-blue-400 rounded-xl p-3.5">
        <div className="flex items-center gap-2 mb-3">
            <Sparkles size={13} className="text-blue-500 animate-pulse" />
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                AI Reply
            </p>
            <span className="text-xs text-blue-500 dark:text-blue-300">Generating...</span>
        </div>
        <div className="space-y-2">
            <div className="h-2.5 bg-blue-100 dark:bg-blue-900/60 rounded-full animate-pulse w-full" />
            <div className="h-2.5 bg-blue-100 dark:bg-blue-900/60 rounded-full animate-pulse w-10/12" />
            <div className="h-2.5 bg-blue-100 dark:bg-blue-900/60 rounded-full animate-pulse w-7/12" />
        </div>
    </div>
);

const ReviewCard = ({ review }) => {
    const { aiReplies, generateAiReply, isPostingAll, replyStatus, postSingleReply } = useReviews();

    const reviewId      = review.reviewId || review.name;
    const aiData        = aiReplies[reviewId] || {};
    const status        = aiData.loading ? "generating" : (replyStatus[reviewId] || "idle");
    const existingReply = review.reviewReply?.comment || "";
    const replyText     = aiData.reply || existingReply;
    const isPosted      = status === "posted";

    const rating        = getRating(review.starRating);
    const reviewerName  = getReviewerName(review);
    const avatarColor   = getAvatarColor(reviewerName);
    const initials      = getInitials(reviewerName);
    const profilePic    = getReviewerProfileImage(review);
    const currentStatus = STATUS_CONFIG[status] || STATUS_CONFIG.idle;
    const accentColor   = RATING_ACCENT[rating] || RATING_ACCENT[3];

    return (
        <div
            className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            style={{ borderLeft: `3px solid ${accentColor}` }}
        >
            <div className="p-5 space-y-3">
                {/* Header: avatar + name/date + stars + status */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <ReviewerAvatar
                            profilePic={profilePic}
                            initials={initials}
                            avatarColor={avatarColor}
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                {reviewerName}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {formatDate(review.createTime)} · Google
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                        <StarRating rating={rating} />
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${currentStatus.bg} ${currentStatus.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentStatus.dot}`} />
                            {currentStatus.label}
                        </span>
                    </div>
                </div>

                {/* Review text */}
                {getReviewText(review) && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {getReviewText(review)}
                    </p>
                )}

                {/* Reply box */}
                {replyText && (
                    <ReviewReplyBox
                        reviewId={reviewId}
                        replyText={replyText}
                        isPosted={isPosted}
                    />
                )}

                {aiData.loading && !replyText && <AiReplyGeneratingBox />}

                {/* Actions — always visible, part of the same flow */}
                <div className="pt-1 border-t border-gray-100 dark:border-gray-700">
                    <ReviewActions
                        status={status}
                        isPostingAll={isPostingAll}
                        onPost={() => postSingleReply(reviewId, replyText)}
                        onAiReply={() => generateAiReply(reviewId, getReviewText(review), rating)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
