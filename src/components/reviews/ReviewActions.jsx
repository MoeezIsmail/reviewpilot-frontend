import { Sparkles, Send, CheckCircle2, Lock } from "lucide-react";
import usePlanFeatures from "../../hooks/usePlanFeatures.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toast/ToastProvider.jsx";

const ReviewActions = ({ status, isPostingAll, onPost, onAiReply }) => {
    const { canUseAiReply, remainingAiReplies } = usePlanFeatures();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const isPosted    = status === "posted";
    const isPosting   = status === "posting";
    const isGenerating = status === "generating";
    const canPost     = status === "ready" && !isPostingAll;

    const handleAiReply = () => {
        if (!canUseAiReply) {
            addToast("AI reply limit reached. Upgrade your plan to continue.", "warning");
            navigate("/subscription");
            return;
        }
        onAiReply();
    };

    return (
        <div className="flex items-center gap-2">
            {/* AI Reply */}
            <button
                onClick={handleAiReply}
                disabled={isGenerating || isPosted || isPosting || isPostingAll}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    !canUseAiReply
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                        : "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
                }`}
            >
                {!canUseAiReply
                    ? <><Lock size={11} /> Limit Reached</>
                    : isGenerating
                        ? <><Sparkles size={11} className="animate-pulse" /> Generating…</>
                        : <><Sparkles size={11} /> AI Reply</>
                }
            </button>

            {/* Post button */}
            <button
                onClick={onPost}
                disabled={!canPost}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isPosted
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                        : canPost
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                }`}
            >
                {isPosting
                    ? <><Send size={11} className="animate-pulse" /> Posting…</>
                    : isPosted
                        ? <><CheckCircle2 size={11} /> Posted</>
                        : <><Send size={11} /> Post Reply</>
                }
            </button>

            {/* AI replies remaining warning */}
            {remainingAiReplies !== Infinity && remainingAiReplies <= 5 && !isPosted && (
                <span className="ml-auto text-xs font-medium text-amber-600 dark:text-amber-400 tabular-nums">
                    {remainingAiReplies} left
                </span>
            )}
        </div>
    );
};

export default ReviewActions;
