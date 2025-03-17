import Review from "../types/Review.ts";
import {useReviews} from "../contexts/ReviewsContext.tsx";
import {useEffect} from "react";
import ReviewForm from "./forms/ReviewForm.tsx";
import Box from "@mui/material/Box";
import {Button, Paper, Rating, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {styled} from "@mui/material/styles";

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconFilled": {
        color: theme.palette.secondary.main,
    },
    "& .MuiRating-iconHover": {
        color: theme.palette.secondary.dark,
    }
}));

const ReviewsContent: React.FC<{bookId: string}> = ({ bookId }) => {
    const {state, fetchReviews,removeReview} = useReviews();

    useEffect(() => {
        fetchReviews(bookId);
    }, []);

    const createReviewElements = state.reviews.map((review: Review) => (
            <Paper sx={{p: 2}} key={review.id}>
                <Typography component="span" variant="body2" color="text.secondary">
                    {review.nickname} {review.email}
                </Typography>
                <Typography component="div" variant="body1" color="text.primary">
                    {review.text}
                </Typography>
                <Box>
                    <StyledRating
                        name="customized-rating"
                        value={review.rating}
                        readOnly
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteIcon fontSize="inherit" />}
                    />
                </Box>
                <Button variant="contained" color="secondary" onClick={() => removeReview(review.id!)}>❌</Button>
            </Paper>
    ))


    return (
        <Box sx={{display: "flex", gap: 2}}>
            <Box>
                <Typography variant="h5" component="div" gutterBottom>
                    Reviews
                </Typography>
                <div>
                    {createReviewElements}
                </div>
            </Box>
            <Box>
                <ReviewForm/>
            </Box>

        </Box>
    )
}

export default ReviewsContent;