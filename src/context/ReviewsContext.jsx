import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext.jsx";
import {fetchReviews, fetchAiReply, postReply} from "../api/reviewsApi.js";
import { useToast } from "../components/ToastProvider.jsx";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [reviewsData, setReviewsData] = useState({
        reviews: [],
        nextPageToken: null,
        accountId: null,      // ← new
        locationId: null,     // ← new
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [isPostingAll, setIsPostingAll] = useState(false);

    const { user } = useAuth();
    const { addToast } = useToast();

    // Store AI replies globally
    const [aiReplies, setAiReplies] = useState({});

    const isAnyPlatformConnected = (user) => {
        return user?.platforms?.google?.accessToken || user?.platforms?.yelp?.accessToken;
    };

    console.log(isAnyPlatformConnected(user));

    useEffect(() => {
        const loadReviews = async () => {
            if (!user?._id || !isAnyPlatformConnected(user)) {
                setLoading(false);
                return;
            }

            if (hasFetched) return;

            try {
                setLoading(true);
                const data = await fetchReviews(user._id);
                setReviewsData(data);
                setHasFetched(true);
            } catch (err) {
                const message = err.response?.data?.message;

                if (message === "Business location not found. Please reconnect Google.") {
                    addToast("Please reconnect your Google Business account.", "error");
                    // Settings page pe bhejo
                    window.location.href = "/settings";
                } else {
                    addToast("Failed to fetch reviews", "error");
                }

                setError(message || "Failed to fetch reviews");
            } finally {
                setLoading(false);
            }
        };

        if (user) loadReviews();

    }, [user, hasFetched]);

    const loadNextPage = async (userId) => {
        if (reviewsData.nextPageToken) {
            try {
                setLoading(true);
                const data = await fetchReviews(userId, reviewsData.nextPageToken);
                setReviewsData((prevData) => ({
                    reviews: [...prevData.reviews, ...data.reviews],
                    nextPageToken: data.nextPageToken,
                    accountId: prevData.accountId,
                    locationId: prevData.locationId,
                }));
            } catch (err) {
                console.log('error: ', err);
                addToast("Failed to fetch more reviews", "error");
            } finally {
                setLoading(false);
            }
        }
    };

    const generateAiReply = async (reviewId, reviewText) => {
        try {
            // Show row-level loading (optional)
            setAiReplies((prev) => ({
                ...prev,
                [reviewId]: { loading: true, reply: "" }
            }));

            const reply = await fetchAiReply(reviewId, reviewText);

            setAiReplies((prev) => ({
                ...prev,
                [reviewId]: { loading: false, reply }
            }));

            addToast("AI reply generated!", "success");
            return reply;
        } catch (err) {
            console.error(err);
            setAiReplies((prev) => ({
                ...prev,
                [reviewId]: { loading: false, reply: "" }
            }));
            addToast("Failed to generate AI reply", "error");
        }
    };

    const refreshReviews = async () => {
        setHasFetched(false);
    };

    const postAllReplies = async () => {
        const reviewsToPost = reviewsData.reviews.filter((review) => {
            const reviewId = review.reviewId || review.name;
            const aiReply = aiReplies[reviewId]?.reply;
            const existingReply = review.reviewReply?.comment || review.response?.snippet;
            return !!aiReply && !existingReply; // sirf wo jo AI reply generated ho but posted nahi
        });

        if (!reviewsToPost.length) {
            addToast("No pending AI replies to post.", "error");
            return;
        }

        setIsPostingAll(true);

        let successCount = 0;
        let failCount = 0;

        for (const review of reviewsToPost) {
            const reviewId = review.reviewId || review.name;
            const aiReply = aiReplies[reviewId]?.reply;
            try {
                await postReply(
                    reviewId,
                    aiReply,
                    review.starRating,
                    reviewsData.accountId,
                    reviewsData.locationId
                );

                setAiReplies((prev) => ({
                    ...prev,
                    [reviewId]: { ...prev[reviewId], posted: true }
                }));

                successCount++;
            } catch (err) {
                console.error('Failed to post reply for:', reviewId, err);
                failCount++;
            }
        }

        setIsPostingAll(false);

        if (successCount > 0) addToast(`${successCount} replies posted successfully!`, "success");
        if (failCount > 0) addToast(`${failCount} replies failed to post.`, "error");
    };

    return (
        <ReviewsContext.Provider value={{
            reviewsData,
            loading,
            error,
            loadNextPage,
            aiReplies,
            generateAiReply,
            refreshReviews,
            postAllReplies,
            isPostingAll,
            isAnyPlatformConnected: isAnyPlatformConnected(user)
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviews = () => useContext(ReviewsContext);