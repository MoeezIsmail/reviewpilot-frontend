import ai  from "../assets/ai-technology.png";
import Lottie from "lottie-react";
import aiLoader from "../assets/ai-loader.json";
import {useReviews} from "../context/ReviewsContext.jsx";
import Button from "../includes/Button.jsx";

const ReviewActions = ({ review, isApproved, hasResponse, isEdited, handleAutoReply, loading, handleApprove }) => {
    const { aiReplies } = useReviews();

    return (
        <div className="flex justify-center gap-2">
            <Button
                variant="success"
                size="md"
                disabled={!isApproved && !hasResponse}
                loading={loading}
                onClick={() => handleApprove(review.review_id, aiReplies[review.review_id].reply)}
            >
                {!loading && "Approve"}
            </Button>


            <Button
                variant="gray"
                size="md"
                disabled={!hasResponse && !isEdited}
            >
                Edit
            </Button>


            <div
                className={`p-4 text-white rounded-lg cursor-pointer ${hasResponse || loading ? 'opacity-40 !cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !hasResponse && !loading && handleAutoReply()}
            >
                {loading ? (
                    <Lottie animationData={aiLoader} loop={true} className="w-10 h-10"/>
                ) : (
                    <img src={ai} alt="AI reply" className="w-10 h-8" title="AI Reply"/>
                )}
            </div>
        </div>
    );
};

export default ReviewActions;