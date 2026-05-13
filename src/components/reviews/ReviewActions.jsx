import usePlanFeatures from "../../hooks/usePlanFeatures.js";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";

const ReviewActions = ({ status, hasReply, isPostingAll, onPost, onAiReply }) => {
    const { canUseAiReply, remainingAiReplies, canBulkPost } = usePlanFeatures();
    const navigate = useNavigate();

    const isPosted = status === "posted";
    const isPosting = status === "posting";
    const isGenerating = status === "generating";

    const handleAiReply = () => {
        if (!canUseAiReply) {
            navigate("/subscription");
            return;
        }
        onAiReply();
    };

    return (
        <div className="flex gap-2 items-center">
            <Button
                variant="success"
                size="sm"
                onClick={onPost}
                disabled={status !== "ready" || isPostingAll}
                loading={isPosting}
            >
                {isPosting ? "Posting..." : isPosted ? "Posted ✓" : "Post"}
            </Button>

            <Button
                size="sm"
                onClick={handleAiReply}
                disabled={isGenerating || isPosted || isPosting || isPostingAll}
                className={`${
                    !canUseAiReply
                        ? "!bg-gray-100 text-gray-400"
                        : "!bg-indigo-50 text-indigo-600 hover:!bg-indigo-100"
                }`}
                title={!canUseAiReply ? "AI reply limit reached — upgrade plan" : ""}
            >
                {isGenerating
                    ? "Generating..."
                    : !canUseAiReply
                        ? "Limit Reached"
                        : `AI Reply`
                }
            </Button>

            {/* Remaining count */}
            {remainingAiReplies !== Infinity && remainingAiReplies <= 5 && !isPosted && (
                <span className="text-xs text-orange-500">
                    {remainingAiReplies} left
                </span>
            )}
        </div>
    );
};

export default ReviewActions;
