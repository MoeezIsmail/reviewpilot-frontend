import React, { useMemo } from "react";
import { Star } from "lucide-react";

const parseReviewDate = (review) => {
    if (review.createTime) return new Date(review.createTime).getTime();
    if (review.date) return new Date().getTime();
    return 0;
};

const formatDate = (review) => {
    if (review.createTime) {
        return new Date(review.createTime).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }
    return review.date || "";
};

const getReviewerName = (review) => {
    if (review.reviewer?.displayName) return review.reviewer.displayName;
    if (review.user?.name) return review.user.name;
    return "Anonymous";
};

const getReviewText = (review) => {
    if (review.comment) return review.comment;
    if (review.snippet) return review.snippet;
    return "";
};

const getRating = (review) => {
    if (review.starRating) {
        const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
        return map[review.starRating] || 0;
    }
    return review.rating || 0;
};

const sortReviewsByDate = (reviews) => {
    if (!reviews || !reviews.length) return [];
    return [...reviews]
        .map((review) => ({ ...review, parsedDate: parseReviewDate(review) }))
        .sort((a, b) => b.parsedDate - a.parsedDate);
};

const RecentReviews = ({ reviews }) => {
    const latestReviews = useMemo(() => sortReviewsByDate(reviews).slice(0, 4), [reviews]);

    if (!latestReviews.length) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Reviews</h2>
                <p className="text-gray-400 text-sm">No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Reviews</h2>
            <div className="space-y-4">
                {latestReviews.map((review, i) => {
                    const rating = getRating(review);
                    return (
                        <div
                            key={i}
                            className={`p-4 rounded-lg border ${
                                rating >= 4 ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900" :
                                rating === 3 ? "bg-yellow-50 dark:bg-yellow-950/30 border-amber-200 dark:border-yellow-900" :
                                "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-medium block text-gray-900 dark:text-gray-100">{getReviewerName(review)}</span>
                                    <span className="text-xs text-gray-400">{formatDate(review)}</span>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{getReviewText(review)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentReviews;
