import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { fetchReviews, fetchAiReply, postReply } from "../api/reviewsApi.js";
import { useToast } from "../components/toast/ToastProvider.jsx";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [reviewsData, setReviewsData] = useState({
        reviews: [],
        nextPageToken: null,
        accountId: null,
        locationId: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [isPostingAll, setIsPostingAll] = useState(false);
    const [aiReplies, setAiReplies] = useState({});
    const [replyStatus, setReplyStatus] = useState({});
    const [isGeneratingAll, setIsGeneratingAll] = useState(false);

    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const isAnyPlatformConnected = (user) => {
        return !!(user?.platforms?.google?.accessToken || user?.platforms?.yelp?.accessToken);
    };

    // ─── Load Reviews ─────────────────────────────────────────
    const loadReviews = useCallback(async () => {
        if (!user?._id || !isAnyPlatformConnected(user)) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const data = await fetchReviews(user._id);
            setReviewsData(data);
            setHasFetched(true);

            // Initialize reply status for each review
            const initialStatus = {};
            data.reviews.forEach((r) => {
                const id = r.reviewId || r.name;
                initialStatus[id] = r.reviewReply?.comment ? "posted" : "idle";
            });
            setReplyStatus(initialStatus);

        } catch (err) {
            const message = err.response?.data?.message;
            if (message === "Business location not found. Please reconnect Google.") {
                addToast("Please reconnect your Google Business account.", "error");
                navigate("/settings");
            } else {
                addToast("Failed to fetch reviews", "error");
            }
            setError(message || "Failed to fetch reviews");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user && !hasFetched) loadReviews();
    }, [user, hasFetched]);

    const refreshReviews = () => setHasFetched(false);

    // ─── Load Next Page ───────────────────────────────────────
    const loadNextPage = (async (userId) => {
        if (!reviewsData.nextPageToken) return;
        try {
            setLoading(true);
            const data = await fetchReviews(userId, reviewsData.nextPageToken);

            setReviewsData((prev) => ({
                reviews: [...prev.reviews, ...data.reviews],
                nextPageToken: data.nextPageToken,
                accountId: prev.accountId,
                locationId: prev.locationId,
            }));

            // Status initialize for new reviews
            const newStatus = {};
            data.reviews.forEach((r) => {
                const id = r.reviewId || r.name;
                newStatus[id] = r.reviewReply?.comment ? "posted" : "idle";
            });

            setReplyStatus((prev) => ({ ...prev, ...newStatus }));
        } catch (err) {
            addToast("Failed to fetch more reviews", "error");
        } finally {
            setLoading(false);
        }
    }, [reviewsData.nextPageToken]);

    // ─── Generate AI Reply ────────────────────────────────────
    const generateAiReply = async (reviewId, reviewText) => {
        setReplyStatus((prev) => ({ ...prev, [reviewId]: "generating" }));
        setAiReplies((prev) => ({ ...prev, [reviewId]: { loading: true, reply: "" } }));

        try {
            const reply = await fetchAiReply(reviewId, reviewText);
            setAiReplies((prev) => ({ ...prev, [reviewId]: { loading: false, reply } }));
            setReplyStatus((prev) => ({ ...prev, [reviewId]: "ready" }));
            addToast("AI reply generated!", "success");
            return reply;
        } catch (err) {
            console.error(err);
            setAiReplies((prev) => ({ ...prev, [reviewId]: { loading: false, reply: "" } }));
            setReplyStatus((prev) => ({ ...prev, [reviewId]: "failed" }));
            addToast("Failed to generate AI reply", "error");
        }
    };

    // ─── Post Single Reply ────────────────────────────────────
    const postSingleReply = async (reviewId, replyText) => {
        // Optimistic update
        const prevStatus = replyStatus[reviewId];
        setReplyStatus((prev) => ({ ...prev, [reviewId]: "posting" }));

        try {
            await postReply(
                reviewId,
                replyText,
                null,
                reviewsData.accountId,
                reviewsData.locationId
            );

            // Real-time sync — update review in state
            setReviewsData((prev) => ({
                ...prev,
                reviews: prev.reviews.map((r) => {
                    const id = r.reviewId || r.name;
                    if (id === reviewId) {
                        return {
                            ...r,
                            reviewReply: { comment: replyText }
                        };
                    }
                    return r;
                }),
            }));

            setReplyStatus((prev) => ({ ...prev, [reviewId]: "posted" }));
            addToast("Reply posted to Google!", "success");

        } catch (err) {
            // Rollback on failure
            setReplyStatus((prev) => ({ ...prev, [reviewId]: prevStatus }));
            console.error(err);
            addToast("Failed to post reply", "error");
        }
    };

    // ─── Post All Replies ─────────────────────────────────────
    const postAllReplies = async () => {
        const reviewsToPost = reviewsData.reviews.filter((review) => {
            const reviewId = review.reviewId || review.name;
            return replyStatus[reviewId] === "ready";
        });

        if (!reviewsToPost.length) {
            addToast("No pending AI replies to post.", "error");
            return;
        }

        setIsPostingAll(true);

        // Optimistic — sab "posting" mark karo
        const postingIds = reviewsToPost.map((r) => r.reviewId || r.name);
        setReplyStatus((prev) => {
            const updated = { ...prev };
            postingIds.forEach((id) => { updated[id] = "posting"; });
            return updated;
        });

        let successCount = 0;
        let failCount = 0;

        for (const review of reviewsToPost) {
            const reviewId = review.reviewId || review.name;
            const aiReply = aiReplies[reviewId]?.reply;
            try {
                await postReply(
                    reviewId, aiReply, null,
                    reviewsData.accountId, reviewsData.locationId
                );

                // Real-time sync
                setReviewsData((prev) => ({
                    ...prev,
                    reviews: prev.reviews.map((r) => {
                        const id = r.reviewId || r.name;
                        if (id === reviewId) return { ...r, reviewReply: { comment: aiReply } };
                        return r;
                    }),
                }));

                setReplyStatus((prev) => ({ ...prev, [reviewId]: "posted" }));
                successCount++;

            } catch (err) {
                // Rollback single failed review
                setReplyStatus((prev) => ({ ...prev, [reviewId]: "ready" }));
                failCount++;
            }
        }

        setIsPostingAll(false);
        if (successCount > 0) addToast(`${successCount} replies posted!`, "success");
        if (failCount > 0) addToast(`${failCount} replies failed.`, "error");
    };

    // ─── Reply Performance Stats ──────────────────────────────
    const getReplyPerformanceStats = () => {
        const total = Object.keys(replyStatus).length;
        if (!total) return { posted: 0, ready: 0, pending: 0 };

        const posted = Object.values(replyStatus).filter((s) => s === "posted").length;
        const ready = Object.values(replyStatus).filter((s) => s === "ready").length;
        const pending = total - posted - ready;

        return {
            posted: Math.round((posted / total) * 100),
            ready: Math.round((ready / total) * 100),
            pending: Math.round((pending / total) * 100),
            postedCount: posted,
            readyCount: ready,
            pendingCount: pending,
            total,
        };
    };

    // ─── Update AI Reply (Edit ke baad) ──────────────────────
    const updateAiReply = (reviewId, newReply) => {
        setAiReplies((prev) => ({
            ...prev,
            [reviewId]: { ...prev[reviewId], reply: newReply }
        }));
        // Status "ready" pe rakhо — taake post ho sake
        setReplyStatus((prev) => ({ ...prev, [reviewId]: "ready" }));
    };

    const generateAllReplies = async () => {
        const pendingReviews = reviewsData.reviews.filter((review) => {
            const reviewId = review.reviewId || review.name;
            const status = replyStatus[reviewId];
            return status === "idle" || status === "failed";
        });

        if (!pendingReviews.length) {
            addToast("No pending reviews to generate replies for.", "error");
            return;
        }

        setIsGeneratingAll(true);
        let successCount = 0;
        let failCount = 0;

        for (const review of pendingReviews) {
            const reviewId = review.reviewId || review.name;
            const reviewText = review.comment || review.snippet || "";

            setReplyStatus((prev) => ({ ...prev, [reviewId]: "generating" }));
            setAiReplies((prev) => ({ ...prev, [reviewId]: { loading: true, reply: "" } }));

            try {
                const reply = await fetchAiReply(reviewId, reviewText);
                setAiReplies((prev) => ({ ...prev, [reviewId]: { loading: false, reply } }));
                setReplyStatus((prev) => ({ ...prev, [reviewId]: "ready" }));
                successCount++;
            } catch (err) {
                setAiReplies((prev) => ({ ...prev, [reviewId]: { loading: false, reply: "" } }));
                setReplyStatus((prev) => ({ ...prev, [reviewId]: "failed" }));
                failCount++;
            }
        }

        setIsGeneratingAll(false);
        if (successCount > 0) addToast(`${successCount} AI replies generated!`, "success");
        if (failCount > 0) addToast(`${failCount} replies failed.`, "error");
    };

    return (
        <ReviewsContext.Provider value={{
            reviewsData,
            loading,
            error,
            loadNextPage,
            aiReplies,
            replyStatus,
            generateAiReply,
            postSingleReply,
            refreshReviews,
            postAllReplies,
            isPostingAll,
            getReplyPerformanceStats,
            updateAiReply,
            generateAllReplies,
            isGeneratingAll,
            isAnyPlatformConnected: isAnyPlatformConnected(user),
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviews = () => useContext(ReviewsContext);