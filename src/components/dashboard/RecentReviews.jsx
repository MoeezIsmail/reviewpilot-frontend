import { useMemo } from "react";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const parseDate = (review) => {
    if (review.createTime) return new Date(review.createTime).getTime();
    return 0;
};

const formatDate = (review) => {
    if (!review.createTime) return review.date || "";
    return new Date(review.createTime).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
    });
};

const getReviewerName = (review) =>
    review.reviewer?.displayName || review.user?.name || "Anonymous";

const getReviewText = (review) =>
    review.comment || review.snippet || "";

const getRating = (review) => {
    if (review.starRating) {
        return { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }[review.starRating] || 0;
    }
    return review.rating || 0;
};

const ratingStyle = (rating) => {
    if (rating >= 4) return "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50";
    if (rating === 3) return "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50";
    return "bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50";
};

const getInitials = (name) =>
    name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

const AVATAR_COLORS = [
    { bg: "#e0e7ff", text: "#4338ca" },
    { bg: "#fce7f3", text: "#9d174d" },
    { bg: "#d1fae5", text: "#065f46" },
    { bg: "#fef3c7", text: "#92400e" },
    { bg: "#ede9fe", text: "#5b21b6" },
];

const getAvatarColor = (name) => {
    const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
};

const RecentReviews = ({ reviews }) => {
    const latestReviews = useMemo(
        () => [...(reviews || [])].sort((a, b) => parseDate(b) - parseDate(a)).slice(0, 4),
        [reviews]
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Recent Reviews</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest customer feedback</p>
                </div>
                <Link
                    to="/reviews"
                    className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                    View all
                    <ArrowRight size={12} />
                </Link>
            </div>

            {latestReviews.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-sm text-gray-400 dark:text-gray-500">
                    No reviews yet
                </div>
            ) : (
                <div className="space-y-3">
                    {latestReviews.map((review, i) => {
                        const rating = getRating(review);
                        const name = getReviewerName(review);
                        const avatar = getAvatarColor(name);
                        const text = getReviewText(review);
                        return (
                            <div
                                key={review.reviewId || review.name || i}
                                className={`p-3.5 rounded-xl border transition-all duration-200 hover:shadow-sm ${ratingStyle(rating)}`}
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                            style={{ backgroundColor: avatar.bg, color: avatar.text }}
                                        >
                                            {getInitials(name)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(review)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 shrink-0">
                                        {Array.from({ length: 5 }, (_, idx) => (
                                            <Star
                                                key={idx}
                                                size={11}
                                                className={idx < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-gray-600"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {text && (
                                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                                        {text}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentReviews;
