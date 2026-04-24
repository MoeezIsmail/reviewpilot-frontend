import ReviewActions from "./ReviewActions";
import { useReviews } from "../context/ReviewsContext.jsx";
import {fetchReviews, postReply} from "../api/reviewsApi.js";
import {useToast} from "./ToastProvider.jsx";

const ReviewRow = ({ review }) => {
    const { aiReplies, generateAiReply, reviewsData } = useReviews();
    const { addToast } = useToast();

    const aiData = aiReplies[review.reviewId] || {};
    const hasResponse = !!review.response?.snippet || !!aiData.reply;
    const loading = aiData.loading || false;

    const handleAutoReply = () => {
        generateAiReply(review.reviewId, review.snippet);
    };

    const handleApprove = async (reviewId, aiReply) => {
        if (!hasResponse) return;
        try {
            await postReply(reviewId, aiReply, reviewsData.accountId, reviewsData.locationId);  // ← yeh
            addToast("Reply posted to Google!", "success");
        } catch (err) {
            console.error(err);
            addToast("Failed to post reply", "error");
        }
    };

    const bg =
        review.rating <= 2
            ? "bg-red-50"
            : review.rating >= 4
                ? "bg-green-50"
                : "";

    return (
        <tr className={bg}>
            <td className="p-3 w-36">{review.name}</td>
            <td className="p-3 text-center w-24">⭐ {review.starRating}</td>
            <td className="p-3 w-2/5">{review.comment}</td>
            <td className="p-3 w-1/4">{review.reviewReply?.comment || aiData.reply || ""}</td>
            <td className="p-3">
                <ReviewActions
                    review={review}
                    handleApprove={handleApprove}
                    hasResponse={hasResponse}
                    loading={loading}
                    handleAutoReply={handleAutoReply}
                />
            </td>
        </tr>
    );
};

export default ReviewRow;