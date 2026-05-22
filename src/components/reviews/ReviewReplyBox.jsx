import { CheckCircle2, Pencil, X, Check, Sparkles } from "lucide-react";
import useEditReply from "../../hooks/useEditReply.js";

const ReviewReplyBox = ({ reviewId, replyText, status, isPosted }) => {
    const {
        isEditing,
        editedText,
        setEditedText,
        startEditing,
        cancelEditing,
        saveEdit,
    } = useEditReply(reviewId, replyText);

    if (!replyText) return null;

    const containerClass = isPosted
        ? "bg-emerald-50 dark:bg-emerald-950/30 border-l-[3px] border-emerald-400 rounded-xl"
        : "bg-indigo-50 dark:bg-indigo-950/30 border-l-[3px] border-indigo-400 rounded-xl";

    return (
        <div className={`${containerClass} p-3.5 mb-3`}>
            {/* Label row */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                    {isPosted
                        ? <CheckCircle2 size={12} className="text-emerald-500" />
                        : <Sparkles size={12} className="text-indigo-500" />
                    }
                    <p className={`text-xs font-semibold ${
                        isPosted
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-indigo-700 dark:text-indigo-400"
                    }`}>
                        {isPosted ? "Posted Reply" : "AI Reply"}
                    </p>
                </div>

                {!isPosted && !isEditing && (
                    <button
                        onClick={startEditing}
                        className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <Pencil size={11} />
                        Edit
                    </button>
                )}
            </div>

            {/* Content */}
            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={4}
                        autoFocus
                        className="w-full text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-indigo-200 dark:border-indigo-700 rounded-lg p-2.5 resize-none focus:outline-none focus:border-indigo-400 transition-colors placeholder-gray-400"
                        placeholder="Edit your reply…"
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                            {editedText.length} chars
                        </span>
                        <div className="flex gap-1.5">
                            <button
                                onClick={cancelEditing}
                                className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            >
                                <X size={11} />
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                disabled={!editedText.trim()}
                                className="flex items-center gap-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Check size={11} />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{replyText}</p>
            )}
        </div>
    );
};

export default ReviewReplyBox;
