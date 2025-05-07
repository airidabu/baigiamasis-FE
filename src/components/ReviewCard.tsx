import { useEffect, useState, CSSProperties } from "react";
import { getBook } from "../api/books.ts";
import Book from "../types/Book.ts";
import { BounceLoader } from "react-spinners";
import { Box, Rating, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#5D001E"
}

interface ReviewCardProps {
    name: string;
    email: string;
    bookId: string;
    text: string;
    rating: number;
}

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconFilled": {
        color: theme.palette.secondary.main,
    },
    "& .MuiRating-iconHover": {
        color: theme.palette.secondary.dark,
    }
}));

const ReviewCard: React.FC<ReviewCardProps> = ({ name, bookId, text, rating }) => {
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        getBook(bookId).then(fetchedBook => setBook(fetchedBook));
    }, [bookId]);

    return (
        <>
            {book ? (
                <Box>
                    <Typography
                        variant="h5"
                        color="secondary"
                    >
                        Review by {name} for {book.name}
                    </Typography>
                    <Typography variant="h4">
                        {text}
                    </Typography>
                    <StyledRating
                        name="customized-rating"
                        value={rating}
                        readOnly
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteIcon fontSize="inherit" />}
                    />
                </Box>
            ) : (
                <Box>
                    <BounceLoader
                        color="#5D001E"
                        cssOverride={override}
                    />
                </Box>
            )}
        </>
    )
}

export default ReviewCard;