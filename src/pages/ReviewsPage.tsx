import Review from "../types/Review.ts";
import {useEffect, useState} from "react";
import {getReviews} from "../api/reviews.ts";
import ItemsContainer from "../components/ItemsContainer.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import {Paper} from "@mui/material";
import Container from "@mui/material/Container";

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        getReviews().then(fetchedReviews => setReviews(fetchedReviews));
    },[])

    const createReviewElements = reviews.map((review: Review, index) => (
        <Paper key={index} sx={{p: 2}} elevation={3}>
            <ReviewCard
                nickname={review.nickname}
                email={review.email}
                bookId={review.bookId}
                text={review.text}
                rating={review.rating}
            />
        </Paper>
    ))
    return <Container><ItemsContainer children={createReviewElements}></ItemsContainer></Container>;
}

export default ReviewsPage;