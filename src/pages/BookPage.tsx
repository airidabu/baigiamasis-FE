import {useParams} from "react-router";
import {useEffect, useState} from "react";
import Book from "../types/Book.ts";
import {getBook} from "../api/books.ts";
import {getBookReviews} from "../api/reviews.ts";
import Review from "../types/Review.ts";
import {ReviewsProvider} from "../contexts/ReviewsContext.tsx";
import ReviewsContent from "../components/ReviewsContent.tsx";
import Container from "@mui/material/Container";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

interface bookWithReviews extends Book {
    reviews: Review[];
}

const BookPage: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [book, setBook] = useState<Book | undefined>();
    const [bookReviews, setBookReviews] = useState<bookWithReviews | undefined>();

    useEffect(() => {
        getBook(id!).then(fetchedBook => setBook(fetchedBook));
        getBookReviews(id!).then(fetchedReviews => setBookReviews(fetchedReviews));
    },[id])

    const createBookCard = () => {
        if (book && bookReviews) {
            return (
                <Container maxWidth="lg" sx={{py: 4}}>
                    <Card sx={{display: "flex", flexDirection: {xs:"column", sm: "row"}, mb: 4, p: 1}}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={book.imageUrl}
                            alt={book.title}
                            sx={{
                                width: {xs:"100%", sm: 200},
                                height: {xs: "auto", sm: 300},
                                objectFit: "cover"
                            }}
                        />
                        <CardContent>
                            <Typography variant="h4" component="div" gutterBottom>
                                {book.title}
                            </Typography>
                        </CardContent>
                    </Card>
                    <ReviewsProvider>
                        <ReviewsContent
                            bookId={book.id ?? ""}
                        />
                    </ReviewsProvider>
                </Container>
            )
        } else {
            return <h1>Book Not Found</h1>
        }
    }

    return createBookCard();
}

export default BookPage;