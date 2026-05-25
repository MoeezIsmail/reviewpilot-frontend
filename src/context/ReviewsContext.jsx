import React, { createContext, useState, useEffect, useContext, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { fetchReviews, fetchAiReply, postReply, fetchReviewsSummary } from "../api/reviewsApi.js";
import { useToast } from "../components/toast/ToastProvider.jsx";

const ReviewsContext = createContext();

const INITIAL_DATA = {
    reviews: [],
    averageRating: 0,
    totalReviewCount: 0,
    nextPageToken: null,
    accountId: null,
    locationId: null,
};

export const ReviewsProvider = ({ children }) => {
    const [reviewsData, setReviewsData] = useState(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [isPostingAll, setIsPostingAll] = useState(false);
    const [isGeneratingAll, setIsGeneratingAll] = useState(false);
    const [aiReplies, setAiReplies] = useState({});
    const [replyStatus, setReplyStatus] = useState({});

    // ─── Pagination ───────────────────────────────────────────
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCache, setPagesCache] = useState({});

    const { user, updateAiUsage } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const isAnyPlatformConnected = (u) =>
        !!(u?.platforms?.google?.accessToken || u?.platforms?.yelp?.accessToken);

    // ─── All Reviews — sab pages merge ───────────────────────
    // Filters, Analytics, Dashboard stats iske upar kaam karte hain
    const allReviews = useMemo(() => {
        const pages = Object.keys(pagesCache).sort((a, b) => Number(a) - Number(b));
        const merged = [];
        const seen = new Set();
        pages.forEach(p => {
            pagesCache[p].reviews?.forEach(r => {
                const id = r.reviewId || r.name;
                if (!seen.has(id)) {
                    seen.add(id);
                    merged.push(r);
                }
            });
        });
        return merged;
    }, [pagesCache]);

    // ─── Init Reply Status ────────────────────────────────────
    const initReplyStatus = useCallback((reviews) => {
        setReplyStatus(prev => {
            const updated = { ...prev };
            reviews?.forEach(r => {
                const id = r.reviewId || r.name;
                if (!updated[id]) {
                    updated[id] = r.reviewReply?.comment ? "posted" : "idle";
                }
            });
            return updated;
        });
    }, []);

    // ─── Fetch Page ───────────────────────────────────────────
    const fetchPage = useCallback(async (pageNum, token) => {
        if (!user?._id) return;
        setLoading(true);
        try {
            const response = await fetchReviews(token);
            const data = {
                ...response,
                averageRating: Math.floor((response.averageRating || 0) * 10) / 10,
            };

            setPagesCache(prev => ({ ...prev, [pageNum]: data }));
            setReviewsData(data);   // ← current page data
            setCurrentPage(pageNum);
            setHasFetched(true);
            initReplyStatus(data.reviews);

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
    }, [user, initReplyStatus, addToast, navigate]);

    // ─── Load Page 1 ─────────────────────────────────────────
    const loadReviews = useCallback(async () => {
        if (!user?._id || !isAnyPlatformConnected(user)) {
            setLoading(false);
            return;
        }
        await fetchPage(1, null);
    }, [user, fetchPage]);

    useEffect(() => {
        if (user && !hasFetched) loadReviews();
    }, [user, hasFetched, loadReviews]);

    // ─── Go To Page ───────────────────────────────────────────
    const goToPage = useCallback(async (pageNum) => {
        if (pageNum < 1 || loading) return;

        if (pagesCache[pageNum]) {
            setReviewsData(pagesCache[pageNum]);
            setCurrentPage(pageNum);
            return;
        }

        const prevPage = pagesCache[pageNum - 1];
        if (!prevPage?.nextPageToken) return;

        await fetchPage(pageNum, prevPage.nextPageToken);
    }, [pagesCache, fetchPage, loading]);

    // ─── Refresh ──────────────────────────────────────────────
    const refreshReviews = () => {
        setPagesCache({});
        setCurrentPage(1);
        setHasFetched(false);
        setReplyStatus({});
        setAiReplies({});
        setReviewsData(INITIAL_DATA);
    };

    const totalPagesLoaded = Object.keys(pagesCache).length;
    const hasNextPage = !!reviewsData.nextPageToken;

    // ─── Update Review In State + Cache ──────────────────────
    const updateReviewInState = useCallback((reviewId, replyText) => {
        const updater = (reviews) =>
            reviews.map(r => {
                const id = r.reviewId || r.name;
                return id === reviewId ? { ...r, reviewReply: { comment: replyText } } : r;
            });

        setReviewsData(prev => ({ ...prev, reviews: updater(prev.reviews) }));

        setPagesCache(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(p => {
                updated[p] = { ...updated[p], reviews: updater(updated[p].reviews) };
            });
            return updated;
        });
    }, []);

    // ─── Generate AI Reply ────────────────────────────────────
    const generateAiReply = async (reviewId, reviewText, rating) => {
        setReplyStatus(prev => ({ ...prev, [reviewId]: "generating" }));
        setAiReplies(prev => ({ ...prev, [reviewId]: { loading: true, reply: "" } }));
        try {
            const data = await fetchAiReply(reviewId, reviewText, rating);
            setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply: data.reply } }));
            setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
            if (data.used !== undefined) {
                updateAiUsage(data.used);
            }
            addToast("AI reply generated!", "success");
            return data.reply;
        } catch (err) {
            setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply: "" } }));
            setReplyStatus(prev => ({ ...prev, [reviewId]: "failed" }));
            const msg = err?.response?.data?.limitReached
                ? "AI reply limit reached. Upgrade to generate more."
                : "Failed to generate AI reply";
            addToast(msg, "error");
        }
    };

    const RATING_MAP_BULK = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

    // ─── Generate All ─────────────────────────────────────────
    const generateAllReplies = async () => {
        // Current page ke pending reviews
        const pending = reviewsData.reviews.filter(r => {
            const id = r.reviewId || r.name;
            const s = replyStatus[id];
            return s === "idle" || s === "failed";
        });

        if (!pending.length) {
            addToast("No pending reviews to generate replies for.", "error");
            return;
        }

        setIsGeneratingAll(true);
        let ok = 0, fail = 0, lastUsed = undefined;

        for (const review of pending) {
            const reviewId = review.reviewId || review.name;
            const reviewText = review.comment || "";
            const rating = RATING_MAP_BULK[review.starRating] || review.rating || 3;
            setReplyStatus(prev => ({ ...prev, [reviewId]: "generating" }));
            setAiReplies(prev => ({ ...prev, [reviewId]: { loading: true, reply: "" } }));
            try {
                const data = await fetchAiReply(reviewId, reviewText, rating);
                setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply: data.reply } }));
                setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
                if (data.used !== undefined) lastUsed = data.used;
                ok++;
            } catch {
                setAiReplies(prev => ({ ...prev, [reviewId]: { loading: false, reply: "" } }));
                setReplyStatus(prev => ({ ...prev, [reviewId]: "failed" }));
                fail++;
            }
        }

        if (lastUsed !== undefined) {
            updateAiUsage(lastUsed);
        }

        setIsGeneratingAll(false);
        if (ok) addToast(`${ok} AI replies generated!`, "success");
        if (fail) addToast(`${fail} failed.`, "error");
    };

    // ─── Post Single Reply ────────────────────────────────────
    const postSingleReply = async (reviewId, replyText) => {
        const prevStatus = replyStatus[reviewId];
        setReplyStatus(prev => ({ ...prev, [reviewId]: "posting" }));
        try {
            await postReply(reviewId, replyText, null, reviewsData.accountId, reviewsData.locationId);
            updateReviewInState(reviewId, replyText);
            setReplyStatus(prev => ({ ...prev, [reviewId]: "posted" }));
            addToast("Reply posted to Google!", "success");
        } catch {
            setReplyStatus(prev => ({ ...prev, [reviewId]: prevStatus }));
            addToast("Failed to post reply", "error");
        }
    };

    // ─── Post All Replies ─────────────────────────────────────
    const postAllReplies = async () => {
        const toPost = reviewsData.reviews.filter(r => {
            const id = r.reviewId || r.name;
            return replyStatus[id] === "ready";
        });

        if (!toPost.length) {
            addToast("No pending AI replies to post.", "error");
            return;
        }

        setIsPostingAll(true);
        toPost.forEach(r => {
            setReplyStatus(prev => ({ ...prev, [r.reviewId || r.name]: "posting" }));
        });

        let ok = 0, fail = 0;
        for (const review of toPost) {
            const reviewId = review.reviewId || review.name;
            const aiReply = aiReplies[reviewId]?.reply;
            try {
                await postReply(reviewId, aiReply, null, reviewsData.accountId, reviewsData.locationId);
                updateReviewInState(reviewId, aiReply);
                setReplyStatus(prev => ({ ...prev, [reviewId]: "posted" }));
                ok++;
            } catch {
                setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
                fail++;
            }
        }

        setIsPostingAll(false);
        if (ok) addToast(`${ok} replies posted!`, "success");
        if (fail) addToast(`${fail} failed.`, "error");
    };

    // ─── AI Review Summary (persists across navigation) ──────
    const [reviewSummary, setReviewSummary] = useState(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState(null);
    const [summaryAnalyzedCount, setSummaryAnalyzedCount] = useState(0);
    const summaryForCount = useRef(0); // review count when summary was last generated

    const generateReviewSummary = useCallback(async (reviews) => {
        if (!reviews?.length) return;
        setSummaryLoading(true);
        setSummaryError(null);
        try {
            const data = await fetchReviewsSummary(reviews);
            setReviewSummary(data.summary);
            setSummaryAnalyzedCount(data.analyzedCount ?? reviews.length);
            summaryForCount.current = reviews.length;
        } catch (err) {
            if (err?.response?.status === 429) {
                setSummaryError("Rate limit reached — please wait a few minutes before refreshing.");
            } else {
                setSummaryError(err?.response?.data?.message || "Could not generate summary. Please try again.");
            }
        } finally {
            setSummaryLoading(false);
        }
    }, []);

    // Auto-generate only when the allReviews count changes (new data fetched)
    useEffect(() => {
        if (allReviews.length && allReviews.length !== summaryForCount.current && !summaryLoading) {
            generateReviewSummary(allReviews);
        }
    }, [allReviews.length]);

    // ─── Update AI Reply (Edit) ───────────────────────────────
    const updateAiReply = (reviewId, newReply) => {
        setAiReplies(prev => ({ ...prev, [reviewId]: { ...prev[reviewId], reply: newReply } }));
        setReplyStatus(prev => ({ ...prev, [reviewId]: "ready" }));
    };

    // ─── Reply Performance Stats ──────────────────────────────
    const getReplyPerformanceStats = () => {
        const total = Object.keys(replyStatus).length;
        if (!total) return { posted: 0, ready: 0, pending: 0, postedCount: 0, readyCount: 0, pendingCount: 0, total: 0 };

        const posted = Object.values(replyStatus).filter(s => s === "posted").length;
        const ready = Object.values(replyStatus).filter(s => s === "ready").length;
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

    return (
        <ReviewsContext.Provider value={{
            // Current page data — sirf ReviewCards ke liye
            reviewsData,

            // ← Sab fetched reviews — Dashboard, Analytics, Filters ke liye
            allReviews,

            loading,
            error,
            aiReplies,
            replyStatus,
            generateAiReply,
            generateAllReplies,
            isGeneratingAll,
            postSingleReply,
            postAllReplies,
            isPostingAll,
            refreshReviews,
            updateAiReply,
            getReplyPerformanceStats,
            reviewSummary,
            summaryLoading,
            summaryError,
            summaryAnalyzedCount,
            generateReviewSummary,
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