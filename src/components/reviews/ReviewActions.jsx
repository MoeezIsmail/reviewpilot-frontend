import Button from "../ui/Button.jsx";

const ReviewActions = ({
                           status,
                           hasReply,
                           isPostingAll,
                           onPost,
                           onAiReply,
                       }) => {
    const isPosted = status === "posted";
    const isPosting = status === "posting";
    const isGenerating = status === "generating";

    return (
        <div className="flex gap-2">
            {/* Post Button */}
            <Button
                variant="success"
                size="sm"
                onClick={onPost}
                disabled={status !== "ready" || isPostingAll}
                loading={isPosting}
            >
                {isPosting ? "Posting..." : isPosted ? "Posted ✓" : "Post"}
            </Button>

            {/* AI Reply Button */}
            <Button
                size="sm"
                onClick={onAiReply}
                disabled={isGenerating || isPosted || isPosting || isPostingAll}
                className="!bg-indigo-50 text-indigo-600 hover:!bg-indigo-100"
            >
                {isGenerating ? "Generating..." : "AI Reply"}
            </Button>
        </div>
    );
};

export default ReviewActions;
