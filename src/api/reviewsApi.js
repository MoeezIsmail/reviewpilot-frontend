import { reviewsApi } from "./axios.js";

export const fetchReviews = async (id, pageToken = null) => {
    const params = pageToken ? { pageToken } : {};
    const res = await reviewsApi.get(`/${id}`, { params });
    return res.data;
}

export const fetchAiReply = async (reviewId, reviewText, rating) => {
    const res = await reviewsApi.post('/ai-reply', { reviewId, reviewText, rating });
    return res.data.reply;
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