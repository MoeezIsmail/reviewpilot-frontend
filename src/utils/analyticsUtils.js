const RATING_MAP = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

// Reviews ko month wise group karo
export const groupReviewsByMonth = (reviews) => {
    const groups = {};
    reviews.forEach((r) => {
        if (!r.createTime) return;
        const date = new Date(r.createTime);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const label = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        if (!groups[key]) groups[key] = { key, label, count: 0, ratingSum: 0 };
        groups[key].count++;
        groups[key].ratingSum += RATING_MAP[r.starRating] || 0;
    });

    return Object.values(groups)
        .sort((a, b) => a.key.localeCompare(b.key))
        .map((g) => ({
            ...g,
            avgRating: g.count ? (g.ratingSum / g.count).toFixed(1) : 0,
        }));
};

// Rating distribution
export const getRatingDistribution = (reviews) => {
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
        const rating = RATING_MAP[r.starRating] || 0;
        if (rating >= 1 && rating <= 5) dist[rating]++;
    });
    const total = reviews.length || 1;
    return Object.entries(dist).map(([star, count]) => ({
        star: Number(star),
        count,
        percentage: Math.round((count / total) * 100),
    }));
};

// Response rate
export const getResponseRate = (reviews, replyStatus) => {
    const total = reviews.length;
    if (!total) return 0;
    const replied = reviews.filter((r) => {
        const id = r.reviewId || r.name;
        return r.reviewReply?.comment || replyStatus[id] === "posted";
    }).length;
    return Math.round((replied / total) * 100);
};

// Sentiment breakdown
export const getSentimentBreakdown = (reviews) => {
    let positive = 0, neutral = 0, negative = 0;
    reviews.forEach((r) => {
        const rating = RATING_MAP[r.starRating] || 0;
        if (rating >= 4) positive++;
        else if (rating === 3) neutral++;
        else negative++;
    });
    return { positive, neutral, negative };
};