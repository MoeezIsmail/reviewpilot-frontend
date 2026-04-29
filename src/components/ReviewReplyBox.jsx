import { Check, X, Pencil } from "lucide-react";
import Button from "../includes/Button.jsx";
import useEditReply from "../hooks/useEditReply.js";

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

    return (
        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-indigo-500">

            <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-400 font-medium">
                    {isPosted ? "✓ Posted Reply" : "AI Reply"}
                </p>

                {!isPosted && !isEditing && (
                    <Button
                        onClick={startEditing}
                        children={`Edit ${<Pencil size={11} />}`}
                        className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 transition-all"
                    />
                )}
            </div>

            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={4}
                        className="w-full text-sm text-gray-700 bg-white border border-indigo-300 rounded-lg p-2 resize-none focus:outline-none focus:border-indigo-500"
                        placeholder="Edit your reply..."
                        autoFocus
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                            {editedText.length} characters
                        </span>
                        <div className="flex gap-2">
                            <div
                                onClick={cancelEditing}
                                className="flex items-center justify-center !text-red-500 hover:!text-white-700 px-2 py-1 rounded border border-red-200 hover:bg-gray-100"
                            >
                                <X size={24} />
                            </div>
                            <button
                                onClick={saveEdit}
                                disabled={!editedText.trim()}
                                className="flex items-center justify-center !text-green-500 hover:!bg-green-700 px-2 py-1 rounded disabled:opacity-50"
                            >
                                <Check size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-600 leading-relaxed">{replyText}</p>
            )}

        </div>
    );
};

export default ReviewReplyBox;