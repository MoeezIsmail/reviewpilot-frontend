import React, { useMemo } from "react";
import { Star } from "lucide-react";

// ─── Google Business Profile API format handle karo ──────────
const parseReviewDate = (review) => {
    // Google Business Profile API → createTime field
    if (review.createTime) {
        return new Date(review.createTime).getTime();
    }
    // SerpAPI fallback → date field (relative string)
    if (review.date) {
        return new Date().getTime(); // fallback
    }
    return 0;
};

const formatDate = (review) => {
    if (review.createTime) {
        return new Date(review.createTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    return review.date || "";
};

const getReviewerName = (review) => {
    // Google Business Profile API
    if (review.reviewer?.displayName) return review.reviewer.displayName;
    // SerpAPI fallback
    if (review.user?.name) return review.user.name;
    return "Anonymous";
};

const getReviewText = (review) => {
    // Google Business Profile API
    if (review.comment) return review.comment;
    // SerpAPI fallback
    if (review.snippet) return review.snippet;
    return "";
};

const getRating = (review) => {
    // Google Business Profile API → starRating is string
    if (review.starRating) {
        const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
        return map[review.starRating] || 0;
    }
    // SerpAPI fallback → rating is number
    return review.rating || 0;
};

// Sort reviews by date
const sortReviewsByDate = (reviews) => {
    if (!reviews || !reviews.length) return [];
    return [...reviews]
        .map((review) => ({
            ...review,
            parsedDate: parseReviewDate(review),
        }))
        .sort((a, b) => b.parsedDate - a.parsedDate);
};

const RecentReviews = ({ reviews }) => {
    const latestReviews = useMemo(() => {
        const sortedReviews = sortReviewsByDate(reviews);
        return sortedReviews.slice(0, 4);
    }, [reviews]);

    if (!latestReviews.length) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
                <p className="text-gray-400 text-sm">No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
            <div className="space-y-4">
                {latestReviews.map((review, i) => {
                    const rating = getRating(review);
                    return (
                        <div
                            key={i}
                            className={`p-4 rounded-lg border ${
                                rating > 2
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-medium block">
                                        {getReviewerName(review)}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {formatDate(review)}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`w-4 h-4 ${
                                                index < rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {getReviewText(review)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentReviews;