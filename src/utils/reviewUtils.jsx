export const getRating = (rating) => {
    if (rating) {
        const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
        return map[rating] || 0;
    }
    return rating || 0;
};

export const getReviewerName = (review) => {
    return review.reviewer?.displayName || review.user?.name || "Anonymous";
};

export const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
};

export const formatDate = (time) => {
    if (time) {
        return new Date(time).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }
    return "";
};

export const getReviewText = (review) => {
    return review.comment || review.snippet || "";
};