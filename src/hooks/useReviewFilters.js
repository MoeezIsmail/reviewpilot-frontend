import { useState, useMemo } from "react";

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "highest", label: "Highest Rating" },
    { value: "lowest",  label: "Lowest Rating" },
];

const RATING_MAP = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

const useReviewFilters = (reviews, aiReplies, replyStatus) => {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [ratingFilter, setRatingFilter] = useState("all"); // "all" | "1" | "2" | "3" | "4" | "5"

    const filteredReviews = useMemo(() => {
        let result = [...(reviews || [])];

        // ─── Status Filter ────────────────────────────────
        result = result.filter((r) => {
            const reviewId = r.reviewId || r.name;
            const reply = r.reviewReply?.comment || aiReplies[reviewId]?.reply || "";
            if (filter === "replied") return reply !== "";
            if (filter === "pending") return reply === "";
            return true;
        });

        // ─── Rating Filter ────────────────────────────────
        if (ratingFilter !== "all") {
            result = result.filter((r) => {
                const rating = RATING_MAP[r.starRating] || r.rating || 0;
                return rating === Number(ratingFilter);
            });
        }

        // ─── Search Filter ────────────────────────────────
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((r) => {
                const text = (r.comment || r.snippet || "").toLowerCase();
                const name = (r.reviewer?.displayName || r.user?.name || "").toLowerCase();
                return text.includes(q) || name.includes(q);
            });
        }

        // ─── Sort ─────────────────────────────────────────
        result.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.createTime || 0) - new Date(a.createTime || 0);
            }
            if (sortBy === "oldest") {
                return new Date(a.createTime || 0) - new Date(b.createTime || 0);
            }
            if (sortBy === "highest") {
                return (RATING_MAP[b.starRating] || 0) - (RATING_MAP[a.starRating] || 0);
            }
            if (sortBy === "lowest") {
                return (RATING_MAP[a.starRating] || 0) - (RATING_MAP[b.starRating] || 0);
            }
            return 0;
        });

        return result;
    }, [reviews, filter, search, sortBy, ratingFilter, aiReplies]);

    return {
        filter, setFilter,
        search, setSearch,
        sortBy, setSortBy,
        ratingFilter, setRatingFilter,
        filteredReviews,
        SORT_OPTIONS,
    };
};

export default useReviewFilters;