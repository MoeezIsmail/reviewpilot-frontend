import { reviewsApi } from "./axios.js";

export const fetchReviews = async (id, pageToken = null) => {

    const res = await reviewsApi.get(`/${id}`)
    console.log('res: ', res.data);
    return res.data
}

export const fetchAiReply = async (reviewId, reviewText) => {
    const res = await reviewsApi.post(`/${reviewId}/ai-reply`, { reviewText });
    return res.data.reply;
};

export const postReply = async (reviewId, reply, accountId, locationId) => {
    const res = await reviewsApi.post(`/${reviewId}/approve-reply`, {
        reply,
        accountId,
        locationId,
    });
    return res;
};