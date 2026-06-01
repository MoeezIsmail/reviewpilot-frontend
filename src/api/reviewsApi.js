import { reviewsApi } from "./axios.js";

// ── Reviews Page (paginated) — UNCHANGED ──────────────────────────────────────

export const fetchReviews = async (pageToken = null) => {
    const params = pageToken ? { pageToken } : {};
    const res = await reviewsApi.get('/', { params });
    return res.data;
};

export const fetchAiReply = async (reviewId, reviewText, rating) => {
    const res = await reviewsApi.post('/ai-reply', { reviewId, reviewText, rating });
    return res.data; // { reply, used, limit }
};

export const postReply = async (reviewId, reply, rating, accountId, locationId) => {
    const res = await reviewsApi.post('/post-reply', {
        reviewId,
        reply,
        rating,
        accountId,
        locationId,
    });
    return res;
};

export const fetchReviewsSummary = async (reviews) => {
    const res = await reviewsApi.post('/summary', { reviews });
    return res.data; // { success, summary, analyzedCount }
};

// ── Analytics Cache ───────────────────────────────────────────────────────────

// Returns full cached reviews + metadata. Triggers background fetch when stale.
export const fetchAnalyticsData = (userId) =>
    reviewsApi.get(`/${userId}/analytics-data`);

// Lightweight polling endpoint — only returns cache status, not the reviews array.
export const getCacheStatus = (userId) =>
    reviewsApi.get(`/${userId}/cache-status`);

// Force a background re-fetch regardless of cache age.
export const refreshAnalyticsCache = (userId) =>
    reviewsApi.post(`/${userId}/refresh-analytics`);
