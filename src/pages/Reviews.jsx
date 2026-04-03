import ReviewsTable from "../components/ReviewTable"
import {useReviews} from "../context/ReviewsContext.jsx";

export default function Reviews() {
    const { reviewsData } = useReviews();

    return <ReviewsTable reviews={reviewsData.reviews}/>

}