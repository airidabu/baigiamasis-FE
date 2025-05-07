import Review from "../types/Review.ts";
import { useReviews } from "../contexts/ReviewsContext.tsx";
import { useEffect, useState } from "react";
import ReviewForm from "./forms/ReviewForm.tsx";
import Box from "@mui/material/Box";
import { Button, Paper, Rating, Stack, Typography, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext.tsx";

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconFilled": {
        color: theme.palette.secondary.main,
    },
    "& .MuiRating-iconHover": {
        color: theme.palette.secondary.dark,
    }
}));

const ReviewsContent: React.FC<{ bookId: string }> = ({ bookId }) => {
    const { state, fetchReviews, removeReview } = useReviews();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { userRole } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReviews = async () => {
            setIsLoading(true);
            await fetchReviews(bookId);
            setIsLoading(false);
        };

        loadReviews();
    }, [bookId, fetchReviews]);

    const createReviewElements = state.reviews.map((review: Review) => (
        <Paper
            sx={{
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                boxShadow: 2
            }}
            key={review._id}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography component="span" variant="body2" color="text.secondary" fontWeight="medium">
                    {review.user ?
                        (typeof review.user === 'object' ? `${review.user.name} ${review.user.surname}` : review.user)
                        : review.nickname}
                </Typography>
                <StyledRating
                    name="customized-rating"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                    size={isMobile ? "small" : "medium"}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteIcon fontSize="inherit" />}
                />
            </Box>

            <Typography
                component="div"
                variant="body1"
                color="text.primary"
                sx={{
                    mb: 1.5,
                    wordBreak: "break-word"
                }}
            >
                {review.comment}
            </Typography>

            {userRole === "admin" && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeReview(review._id!)}
                        sx={{
                            minWidth: { xs: 32, sm: 64 },
                            px: { xs: 1, sm: 2 }
                        }}
                    >
                        {!isMobile && "Delete"}
                    </Button>
                </Box>
            )}
        </Paper>
    ));

    return (
        <Box sx={{
            width: "100%",
            maxWidth: 800,
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 }
        }}>
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                <ReviewForm bookId={bookId} />
            </Box>
            <Box>
                <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                    Reviews
                </Typography>

                {isLoading ? (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 4 }}>
                        <CircularProgress size={50} />
                        <Typography variant="body1" sx={{ mt: 2 }}>Loading reviews...</Typography>
                    </Box>
                ) : (
                    <Stack spacing={{ xs: 1.5, sm: 2 }}>
                        {createReviewElements.length > 0
                            ? createReviewElements
                            : <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ py: 2, textAlign: 'center' }}
                            >
                                No reviews yet. Be the first to review!
                            </Typography>}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default ReviewsContent;