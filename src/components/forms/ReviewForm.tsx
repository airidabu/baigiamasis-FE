import { useState } from "react";
import { useReviews } from "../../contexts/ReviewsContext.tsx";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import { Button, Rating, TextField } from "@mui/material";
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

const ReviewForm: React.FC = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        nickname: "",
        email: "",
        comment: "",
        rating: 2.5
    })

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleRatingChange = (
        _: React.SyntheticEvent | null,
        newValue: number | null
    ) => {
        setForm((prevForm) => (
            {
                ...prevForm,
                rating: newValue ?? 0
            }
        ))
    }
    const { createReview } = useReviews();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newReview = {
            nickname: form.nickname,
            email: form.email,
            comment: form.comment,
            rating: form.rating,
            bookId: id!
        }

        createReview(newReview).then(() => {
            console.log(newReview);
        })

        setForm({
            ...form,
            nickname: "",
            email: "",
            comment: "",
            rating: 2.5
        })
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px" }}
        >
            <TextField
                label="Nickname"
                variant="outlined"
                fullWidth
                name="nickname"
                value={form.nickname}
                onChange={handleTextChange}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={form.email}
                onChange={handleTextChange}
            />
            <TextField
                multiline
                label="Comment"
                variant="outlined"
                fullWidth
                name="comment"
                value={form.comment}
                onChange={handleTextAreaChange}
            />
            <StyledRating
                name="rating"
                value={form.rating}
                precision={0.5}
                defaultValue={0}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteIcon fontSize="inherit" />}
                onChange={handleRatingChange}
            />
            <Button type="submit" variant="contained">Submit</Button>
        </Box>
    )
}

export default ReviewForm;