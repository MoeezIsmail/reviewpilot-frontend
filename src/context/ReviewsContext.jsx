import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext.jsx";
import { fetchReviews, fetchAiReply } from "../api/reviewsApi.js";
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

    const { user } = useAuth();
    const { addToast } = useToast();

    // Store AI replies globally
    const [aiReplies, setAiReplies] = useState({});

    const isAnyPlatformConnected = (user) => {
        return !!(
            user?.platforms?.google?.accessToken ||
            user?.platforms?.yelp?.accessToken
        );
    };

    useEffect(() => {
        const loadReviews = async () => {
            if (!user?._id || !isAnyPlatformConnected(user)) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await fetchReviews(user._id);
                setReviewsData(data);
            } catch (err) {
                console.log('error: ', err);
                addToast("Failed to fetch reviews", "error");
                setError("Failed to fetch reviews");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            // loadReviews();
        }
    }, [user]);

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

    return (
        <ReviewsContext.Provider value={{
            reviewsData,
            loading,
            error,
            loadNextPage,
            aiReplies,
            generateAiReply,
            isAnyPlatformConnected: isAnyPlatformConnected(user)
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviews = () => useContext(ReviewsContext);