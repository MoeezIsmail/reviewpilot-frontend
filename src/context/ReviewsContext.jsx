import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { fetchReviews, fetchAiReply, postReply } from "../api/reviewsApi.js";
import { useToast } from "../components/toast/ToastProvider.jsx";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [reviewsData, setReviewsData] = useState({
        accountId: null,
        locationId: null,
        reviewsData: {
            reviews: [],
            averageRating: 0,
            totalReviewCount: 0,
            nextPageToken: null,
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [isPostingAll, setIsPostingAll] = useState(false);
    const [aiReplies, setAiReplies] = useState({});
    const [replyStatus, setReplyStatus] = useState({});
    const [isGeneratingAll, setIsGeneratingAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCache, setPagesCache] = useState({});

    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const isAnyPlatformConnected = (user) => {
        return !!(user?.platforms?.google?.accessToken || user?.platforms?.yelp?.accessToken);
    };

    // ─── Fetch a specific page ────────────────────────────────
    const fetchPage = useCallback(async (pageNum, token) => {
        setLoading(true);
        try {
            const data = await fetchReviews(user._id, token);
            // data = { accountId, locationId, reviewsData: { reviews, averageRating, totalReviewCount, nextPageToken } }

            setPagesCache(prev => ({ ...prev, [pageNum]: data }));
            setReviewsData(data);
            setCurrentPage(pageNum);
            setHasFetched(true);

            // Init reply status
            setReplyStatus(prev => {
                const updated = { ...prev };
                data.reviewsData.reviews?.forEach(r => {
                    const id = r.reviewId || r.name;
                    if (!updated[id]) {
                        updated[id] = r.reviewReply?.comment ? "posted" : "idle";
                    }
                });
                return updated;
            });

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

    // ─── Load page 1 ─────────────────────────────────────────
    const loadReviews = useCallback(async () => {
        if (!user?._id || !isAnyPlatformConnected(user)) {
            setLoading(false);
            return;
        }
        await fetchPage(1, null);
    }, [user, fetchPage]);

    useEffect(() => {
        if (user && !hasFetched) loadReviews();
    }, [user, hasFetched]);

    // ─── Go to page ───────────────────────────────────────────
    const goToPage = useCallback(async (pageNum) => {
        if (pageNum < 1 || loading) return;

        if (pagesCache[pageNum]) {
            setReviewsData(pagesCache[pageNum]);
            setCurrentPage(pageNum);
            return;
        }

        const prevPageData = pagesCache[pageNum - 1];
        if (!prevPageData?.reviewsData?.nextPageToken) return;

        await fetchPage(pageNum, prevPageData.reviewsData.nextPageToken);
    }, [pagesCache, fetchPage, loading]);

    // ─── Refresh ──────────────────────────────────────────────
    const refreshReviews = () => {
        setPagesCache({});
        setCurrentPage(1);
        setHasFetched(false);
        setReplyStatus({});
        setAiReplies({});
    };

    const totalPagesLoaded = Object.keys(pagesCache).length;
    const hasNextPage = !!reviewsData.reviewsData?.nextPageToken;

    // ─── Generate AI Reply ────────────────────────────────────
    const generateAiReply = async (reviewId, reviewText) => {
        setReplyStatus(prev => ({ ...prev, [reviewId]: "generating" }));
        setAiReplies(prev => ({ ...prev, [reviewId]: { loading: true, reply: "" } }));

        try {
            const reply = await fetchAiReply(reviewId, reviewText);
            setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply } }));
            setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
            addToast("AI reply generated!", "success");
            return reply;
        } catch (err) {
            setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply: "" } }));
            setReplyStatus(prev => ({ ...prev, [reviewId]: "failed" }));
            addToast("Failed to generate AI reply", "error");
        }
    };

    // ─── Post Single Reply ────────────────────────────────────
    const postSingleReply = async (reviewId, replyText) => {
        const prevStatus = replyStatus[reviewId];
        setReplyStatus(prev => ({ ...prev, [reviewId]: "posting" }));

        try {
            await postReply(
                reviewId, replyText, null,
                reviewsData.accountId,
                reviewsData.locationId
            );

            // Update reviewsData state
            setReviewsData(prev => ({
                ...prev,
                reviewsData: {
                    ...prev.reviewsData,
                    reviews: prev.reviewsData.reviews.map(r => {
                        const id = r.reviewId || r.name;
                        return id === reviewId ? { ...r, reviewReply: { comment: replyText } } : r;
                    }),
                }
            }));

            // Sync cache
            setPagesCache(prev => {
                const cached = prev[currentPage];
                if (!cached) return prev;
                return {
                    ...prev,
                    [currentPage]: {
                        ...cached,
                        reviewsData: {
                            ...cached.reviewsData,
                            reviews: cached.reviewsData.reviews.map(r => {
                                const id = r.reviewId || r.name;
                                return id === reviewId ? { ...r, reviewReply: { comment: replyText } } : r;
                            }),
                        }
                    }
                };
            });

            setReplyStatus(prev => ({ ...prev, [reviewId]: "posted" }));
            addToast("Reply posted to Google!", "success");

        } catch (err) {
            setReplyStatus(prev => ({ ...prev, [reviewId]: prevStatus }));
            addToast("Failed to post reply", "error");
        }
    };

    // ─── Post All Replies ─────────────────────────────────────
    const postAllReplies = async () => {
        const reviewsToPost = reviewsData.reviewsData?.reviews?.filter(r => {
            const id = r.reviewId || r.name;
            return replyStatus[id] === "ready";
        });

        if (!reviewsToPost?.length) {
            addToast("No pending AI replies to post.", "error");
            return;
        }

        setIsPostingAll(true);

        const postingIds = reviewsToPost.map(r => r.reviewId || r.name);
        setReplyStatus(prev => {
            const updated = { ...prev };
            postingIds.forEach(id => { updated[id] = "posting"; });
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
                    reviewsData.accountId,
                    reviewsData.locationId
                );

                setReviewsData(prev => ({
                    ...prev,
                    reviewsData: {
                        ...prev.reviewsData,
                        reviews: prev.reviewsData.reviews.map(r => {
                            const id = r.reviewId || r.name;
                            return id === reviewId ? { ...r, reviewReply: { comment: aiReply } } : r;
                        }),
                    }
                }));

                setReplyStatus(prev => ({ ...prev, [reviewId]: "posted" }));
                successCount++;
            } catch (err) {
                setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
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
        if (!total) return { posted: 0, ready: 0, pending: 0, postedCount: 0, readyCount: 0, pendingCount: 0, total: 0 };

        // const posted = Object.values(replyStatus).filter(s => s === "posted").length;
        // const ready = Object.values(replyStatus).filter(s => s === "ready").length;
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

    // ─── Update AI Reply ──────────────────────────────────────
    const updateAiReply = (reviewId, newReply) => {
        setAiReplies(prev => ({ ...prev, [reviewId]: { ...prev[reviewId], reply: newReply } }));
        setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
    };

    // ─── Generate All Replies ─────────────────────────────────
    const generateAllReplies = async () => {
        const pendingReviews = reviewsData.reviewsData.reviews?.filter(r => {
            const id = r.reviewId || r.name;
            const status = replyStatus[id];
            return status === "idle" || status === "failed";
        });

        if (!pendingReviews?.length) {
            addToast("No pending reviews to generate replies for.", "error");
            return;
        }

        setIsGeneratingAll(true);
        let successCount = 0;
        let failCount = 0;

        for (const review of pendingReviews) {
            const reviewId = review.reviewId || review.name;
            const reviewText = review.comment || review.snippet || "";

            setReplyStatus(prev => ({ ...prev, [reviewId]: "generating" }));
            setAiReplies(prev => ({ ...prev, [reviewId]: { loading: true, reply: "" } }));

            try {
                const reply = await fetchAiReply(reviewId, reviewText);
                setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply } }));
                setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
                successCount++;
            } catch (err) {
                setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply: "" } }));
                setReplyStatus(prev => ({ ...prev, [reviewId]: "failed" }));
                failCount++;
            }
        }

        setIsGeneratingAll(false);
        if (successCount > 0) addToast(`${successCount} AI replies generated!`, "success");
        if (failCount > 0) addToast(`${failCount} replies failed.`, "error");
    };

    return (
        <ReviewsContext.Provider value={{
            reviewsData,           // { accountId, locationId, reviewsData: { reviews, averageRating, totalReviewCount, nextPageToken } }
            loading,
            error,
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
            currentPage,
            totalPagesLoaded,
            hasNextPage,
            goToPage,
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviews = () => useContext(ReviewsContext);