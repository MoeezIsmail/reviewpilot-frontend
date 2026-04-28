import Button from "../includes/Button.jsx";

const ReviewCard = ({ review }) => {
    const { aiReplies, generateAiReply, reviewsData, isPostingAll, replyStatus, postSingleReply } = useReviews();
    const { addToast } = useToast();

    const reviewId = review.reviewId || review.name;
    const aiData = aiReplies[reviewId] || {};
    const status = replyStatus[reviewId] || "idle";

    const existingReply = review.reviewReply?.comment || "";
    const rating = getRating(review.starRating);
    const reviewerName = getReviewerName(review);
    const avatarColor = getAvatarColor(reviewerName);
    const initials = getInitials(reviewerName);
    const profilePic = getReviewerProfileImage(review);

    const replyText = aiData.reply || existingReply;
    const hasReply = !!replyText;

    const handleAutoReply = () => generateAiReply(reviewId, getReviewText(review));
    const handleApprove = () => postSingleReply(reviewId, replyText);

    // ─── Status based UI ─────────────────────────────────────
    const statusConfig = {
        idle:       { label: "Pending",    bg: "bg-yellow-100", text: "text-yellow-700" },
        generating: { label: "Generating", bg: "bg-blue-100",   text: "text-blue-700"   },
        ready:      { label: "Ready",      bg: "bg-indigo-100", text: "text-indigo-700" },
        posting:    { label: "Posting...", bg: "bg-orange-100", text: "text-orange-700" },
        posted:     { label: "Posted",     bg: "bg-green-100",  text: "text-green-700"  },
        failed:     { label: "Failed",     bg: "bg-red-100",    text: "text-red-700"    },
    };

    const currentStatus = statusConfig[status] || statusConfig.idle;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
                    >
                        {profilePic
                            ? <img src={profilePic} alt={initials} className="w-full h-full object-cover" />
                            : initials
                        }
                    </div>
                    <div>
                        <p className="font-medium text-sm text-gray-900">{reviewerName}</p>
                        <p className="text-xs text-gray-400">{formatDate(review.createTime)} · Google</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                        ))}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${currentStatus.bg} ${currentStatus.text}`}>
                        {currentStatus.label}
                    </span>
                </div>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-600 leading-relaxed">{getReviewText(review)}</p>

            {/* Reply Box */}
            {hasReply && (
                <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-indigo-500">
                    <p className="text-xs text-gray-400 mb-1 font-medium">
                        {status === "posted" ? "✓ Posted Reply" : "AI Reply"}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{replyText}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <Button
                    variant="success"
                    size="sm"
                    onClick={handleApprove}
                    disabled={status !== "ready" || isPostingAll}
                    loading={status === "posting"}
                    children={status === "posting" ? "Posting..." : status === "posted" ? "Posted ✓" : "Post"}
                />

                <Button
                    variant="gray"
                    size="sm"
                    disabled={!hasReply || status === "posted" || status === "posting"}
                    children={'Edit'}
                />

                <Button
                    size="sm"
                    onClick={handleAutoReply}
                    disabled={status === "generating" || status === "posted" || status === "posting" || isPostingAll}
                    className="!bg-indigo-50 text-indigo-600 hover:!bg-indigo-100"
                    children={status === "generating" ? "Generating..." : "AI Reply"}
                />
            </div>
        </div>
    );
};

export default ReviewCard;