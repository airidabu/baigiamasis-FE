import Review from "../types/Review.ts";
import { useEffect, useState } from "react";
import { getReviews } from "../api/reviews.ts";
import ItemsContainer from "../components/ItemsContainer.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        getReviews().then(fetchedReviews => setReviews(fetchedReviews));
    }, [])

    const createReviewElements = reviews.map((review: Review) => (
        <Paper key={review._id} sx={{ p: 2 }} elevation={3}>
            <ReviewCard
                nickname={review.user ? `${review.user.name} ${review.user.surname}` : review.nickname || ""}
                email={review.email || ""}
                bookId={review.book?._id || ""}
                text={review.comment}
                rating={review.rating}
            />
        </Paper>
    ))
    return <Container><ItemsContainer children={createReviewElements}></ItemsContainer></Container>;
}

export default ReviewsPage;