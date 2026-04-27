export const getRating = (review) => {
    if (review.starRating) {
        const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
        return map[review.starRating] || 0;
    }
    return review.rating || 0;
};

export const getReviewerName = (review) => {
    return review.reviewer?.displayName || review.user?.name || "Anonymous";
};

export const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
};

export const formatDate = (review) => {
    if (review.createTime) {
        return new Date(review.createTime).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }
    return review.date || "";
};

export const getReviewText = (review) => {
    return review.comment || review.snippet || "";
};