import {useEffect, useState, CSSProperties} from "react";
import {getBook} from "../api/books.ts";
import Book from "../types/Book.ts";
import {BounceLoader} from "react-spinners";
import {Rating} from "@mui/material";
import {styled} from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#5D001E"
}

interface ReviewCardProps {
    nickname: string;
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

const ReviewCard: React.FC<ReviewCardProps> = ({nickname, email, bookId, text, rating}) => {
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        getBook(bookId).then(fetchedBook => setBook(fetchedBook));
    }, [bookId]);

    return (
        <>
            {book ? (
                    <div>
                        <div>Review by {nickname} for {book.title}</div>
                        <div>{email}</div>
                        <div>Time posted </div>
                        <p>{text}</p>
                        <p>{rating}</p>
                        <StyledRating
                            name="customized-rating"
                            value={rating}
                            readOnly
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteIcon fontSize="inherit" />}
                        />
                    </div>
                ) : (
                    <div>
                       <BounceLoader
                       color="#5D001E"
                        cssOverride={override}
                       />
                    </div>
            )}
        </>
    )
}

export default ReviewCard;