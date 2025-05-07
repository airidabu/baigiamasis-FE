import { useState } from "react";
import { useReviews } from "../../contexts/ReviewsContext.tsx";
import { useParams, Link as RouterLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext.tsx";
import Box from "@mui/material/Box";
import { Button, Rating, TextField, Typography, Paper, Link, Alert, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconFilled": {
        color: theme.palette.secondary.main,
    },
    "& .MuiRating-iconHover": {
        color: theme.palette.secondary.dark,
    }
}));

const ReviewForm: React.FC<{ bookId?: string }> = ({ bookId }) => {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const [form, setForm] = useState({
        comment: "",
        rating: 2.5
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingChange = (
        _: React.SyntheticEvent | null,
        newValue: number | null
    ) => {
        setForm((prevForm) => ({
            ...prevForm,
            rating: newValue ?? 0
        }));
    };

    const { createReview } = useReviews();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!isAuthenticated) {
            setError("You must be logged in to submit a review");
            return;
        }

        const targetBookId = bookId || id;

        if (!targetBookId) {
            setError("No book ID available");
            return;
        }

        if (!form.comment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        if (form.rating <= 0) {
            setError("Please provide a rating");
            return;
        }

        const newReview = {
            comment: form.comment.trim(),
            rating: Number(form.rating),
            book: targetBookId,
            user: user?.id
        };

        console.log("Sending review data:", newReview);

        try {
            await createReview(newReview);
            setSuccess(true);
            setForm({
                comment: "",
                rating: 2.5
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error submitting review:", error);

            if (error.response && error.response.data) {
                console.error("Server error details:", error.response.data);
                setError(`Server error: ${error.response.data.message || error.response.statusText}`);
            } else {
                setError("Failed to submit review. Please try again.");
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom>
                    Want to share your review?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please <Link component={RouterLink} to="/login" color="secondary" sx={{ fontWeight: 'bold' }}>
                        login</Link> or <Link component={RouterLink} to="/register" color="secondary" sx={{ fontWeight: 'bold' }}>
                        register</Link> to leave a review.
                </Typography>
            </Paper>
        );
    }

    return (
        <>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
                message="Review submitted successfully!"
            />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: "400px",
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                }}
            >
                <Typography variant="h6">Add Your Review</Typography>
                <TextField
                    multiline
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    name="comment"
                    value={form.comment}
                    onChange={handleTextAreaChange}
                    required
                    rows={4}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography component="span">Rating:</Typography>
                    <StyledRating
                        name="rating"
                        value={form.rating}
                        precision={0.5}
                        defaultValue={2.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteIcon fontSize="inherit" />}
                        onChange={handleRatingChange}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!form.comment.trim() || form.rating <= 0}
                >
                    Submit Review
                </Button>
            </Box>
        </>
    );
};

export default ReviewForm;