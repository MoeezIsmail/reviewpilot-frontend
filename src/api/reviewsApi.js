import { reviewsApi } from "./axios.js";

export const fetchReviews = async (id, pageToken = null) => {
    const params = pageToken ? { pageToken } : {};
    const res = await reviewsApi.get(`/${id}`, { params });
    return res.data;
}

export const fetchAiReply = async (reviewId, reviewText) => {
    const res = await reviewsApi.post(`/${reviewId}/ai-reply`, { reviewText });
    return res.data.reply;
};

export const postReply = async (reviewId, reply, rating, accountId, locationId) => {
    const res = await reviewsApi.post(`/${reviewId}/post-reply`, {
        reply,
        rating,
        accountId,
        locationId,
    });
    return res;
};