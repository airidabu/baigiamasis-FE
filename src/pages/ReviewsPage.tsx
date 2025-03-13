import Review from "../types/Review.ts";
import {useEffect, useState} from "react";
import {getReviews} from "../api/reviews.ts";
import ItemsContainer from "../components/ItemsContainer.tsx";
import ReviewCard from "../components/ReviewCard.tsx";

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        getReviews().then(fetchedReviews => setReviews(fetchedReviews));
    },[])

    const createReviewElements = reviews.map((review: Review, index) => (
        <ReviewCard
        key={index}
        nickname={review.nickname}
        email={review.email}
        bookId={review.bookId}
        text={review.text}
        rating={review.rating}
        />
    ))
    return <ItemsContainer children={createReviewElements}></ItemsContainer>;
}

export default ReviewsPage;