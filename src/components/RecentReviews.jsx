import React, { useMemo } from "react";
import { Star } from "lucide-react";

// Utility function to parse relative date strings
const parseRelativeDate = (relativeDate) => {
    // Match formats like "5 minutes ago", "1 hour ago", "2 days ago", "1 year ago"
    const regex = /(\d+)\s*(minute|hour|day|month|year)s?\s*(ago)|(\w+\sago)/;
    const match = relativeDate.match(regex);

    if (match) {
        const currentDate = new Date();
        if (match[4]) {
            // If it's something like "a year ago"
            const unit = match[4].split(" ")[1]; // Get "year", "month", etc.
            return adjustDateByUnit(currentDate, unit, 1); // "a year ago" -> 1 year ago
        } else {
            // If it's something like "5 minutes ago"
            const value = parseInt(match[1], 10);
            const unit = match[2];
            return adjustDateByUnit(currentDate, unit, value);
        }
    }

    return new Date(); // In case the date format doesn't match, return the current date
};

// Helper function to adjust the current date by the given unit
const adjustDateByUnit = (currentDate, unit, value) => {
    if (unit === "minute") {
        currentDate.setMinutes(currentDate.getMinutes() - value);
    } else if (unit === "hour") {
        currentDate.setHours(currentDate.getHours() - value);
    } else if (unit === "day") {
        currentDate.setDate(currentDate.getDate() - value);
    } else if (unit === "month") {
        currentDate.setMonth(currentDate.getMonth() - value);
    } else if (unit === "year") {
        currentDate.setFullYear(currentDate.getFullYear() - value);
    }
    return currentDate;
};

// Function to sort reviews
const sortReviewsByDate = (reviews) => {
    return reviews
        .map((review) => ({
            ...review,
            parsedDate: parseRelativeDate(review.date).getTime(), // Convert to timestamp for proper comparison
        }))
        .sort((a, b) => b.parsedDate - a.parsedDate); // Sort by most recent
};

const RecentReviews = ({ reviews }) => {
    // Sort reviews and limit to the top 4 latest
    const latestReviews = useMemo(() => {
        const sortedReviews = sortReviewsByDate(reviews);
        return sortedReviews.slice(0, 4);
    }, [reviews]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
            <div className="space-y-4">
                {latestReviews.map((r, i) => (
                    <div
                        key={i}
                        className={`p-4 rounded-lg border ${
                            r.rating > 2
                                ? "bg-green-50 border-green-200"
                                : "bg-red-50 border-red-200"
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-medium block">{r.user.name}</span>
                                <span className="text-xs text-gray-400">{r.date}</span>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`w-4 h-4 ${
                                            index < r.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{r.snippet}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentReviews;