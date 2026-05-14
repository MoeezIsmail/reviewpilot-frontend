import usePlanFeatures from "../../hooks/usePlanFeatures.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toast/ToastProvider.jsx";
import Button from "../ui/Button.jsx";
import { Lock } from "lucide-react";

const ReviewActions = ({ status, hasReply, isPostingAll, onPost, onAiReply }) => {
    const { canUseAiReply, remainingAiReplies } = usePlanFeatures();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const isPosted = status === "posted";
    const isPosting = status === "posting";
    const isGenerating = status === "generating";

    const handleAiReply = () => {
        if (!canUseAiReply) {
            addToast("AI reply limit reached. Upgrade your plan to continue.", "warning");
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
                        ? "!bg-gray-100 dark:!bg-gray-700 !text-gray-400 hover:!bg-gray-200 dark:hover:!bg-gray-600 cursor-pointer"
                        : "!bg-indigo-50 dark:!bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:!bg-indigo-100 dark:hover:!bg-indigo-900/60"
                }`}
            >
                {isGenerating ? (
                    "Generating..."
                ) : !canUseAiReply ? (
                    <span className="flex items-center gap-1">
                        <Lock size={11} />
                        Limit Reached
                    </span>
                ) : (
                    "AI Reply"
                )}
            </Button>

            {remainingAiReplies !== Infinity && remainingAiReplies <= 5 && !isPosted && (
                <span className="text-xs text-orange-500">
                    {remainingAiReplies} left
                </span>
            )}
        </div>
    );
};

export default ReviewActions;
