import { useState } from "react";
import { useReviews } from "../context/ReviewsContext.jsx";
import { useToast } from "../components/toast/ToastProvider.jsx";

const useEditReply = (reviewId, initialReply) => {
    const { updateAiReply } = useReviews();
    const { addToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(initialReply || "");

    const startEditing = () => {
        setEditedText(initialReply || "");
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setEditedText(initialReply || "");
        setIsEditing(false);
    };

    const saveEdit = () => {
        if (!editedText.trim()) return;
        updateAiReply(reviewId, editedText.trim());
        setIsEditing(false);
        addToast("Reply updated.", "success");
    };

    return {
        isEditing,
        editedText,
        setEditedText,
        startEditing,
        cancelEditing,
        saveEdit,
    };
};

export default useEditReply;