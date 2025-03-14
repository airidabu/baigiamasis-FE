import Review from "../types/Review.ts";
import {useReviews} from "../contexts/ReviewsContext.tsx";
import {useEffect} from "react";
import ReviewForm from "./forms/ReviewForm.tsx";

const ReviewsContent: React.FC<{bookId: string}> = ({ bookId }) => {
    const {state, fetchReviews,removeReview} = useReviews();

    useEffect(() => {
        fetchReviews(bookId);
    }, []);

    const createReviewElements = state.reviews.map((review: Review) => (
            <div key={review.id}>
                {review.rating}
                {review.text}
                {review.nickname}
                {review.email}
                <button onClick={() => removeReview(review.id!)}>❌</button>
            </div>
    ))


    return (
        <div>
            <div>
                <h2>Reviews</h2>
                <div>
                    {createReviewElements}
                </div>
            </div>
            <div>
                <ReviewForm/>
            </div>

        </div>
    )
}

export default ReviewsContent;