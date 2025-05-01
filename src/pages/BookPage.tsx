import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Book from "../types/Book.ts";
import { getBook } from "../api/books.ts";
import { getBookReviews } from "../api/reviews.ts";
import Review from "../types/Review.ts";
import { ReviewsProvider } from "../contexts/ReviewsContext.tsx";
import ReviewsContent from "../components/ReviewsContent.tsx";
import Container from "@mui/material/Container";
import { Card, CardContent, CardMedia, Typography, Chip, Box } from "@mui/material";

interface bookWithReviews extends Book {
    reviews: Review[];
}

const BookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | undefined>();
    const [bookReviews, setBookReviews] = useState<bookWithReviews | undefined>();

    useEffect(() => {
        getBook(id!).then(fetchedBook => setBook(fetchedBook));
        getBookReviews(id!).then(fetchedReviews => setBookReviews(fetchedReviews));
    }, [id])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const createBookCard = () => {
        if (book && bookReviews) {
            return (
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Card sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, mb: 4, p: 1 }}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={"https://static.vecteezy.com/system/resources/thumbnails/020/484/423/small_2x/hand-drawn-open-book-vector.jpg"}
                            alt={book.name}
                            sx={{
                                width: { xs: "100%", sm: 200 },
                                height: { xs: "auto", sm: 300 },
                                objectFit: "cover"
                            }}
                        />
                        <CardContent sx={{ width: "100%" }}>
                            <Typography variant="h4" component="div" gutterBottom>
                                {book.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                By {book.author.name} {book.author.surname}
                            </Typography>
                            {book.description && (
                                <Typography variant="body1" paragraph>
                                    {book.description}
                                </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary">
                                Publisher: {book.publisher.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Released: {formatDate(book.releaseDate)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Pages: {book.pageNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Status: {book.status.status}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2">Genres:</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                    {book.genres.map((genre) => (
                                        <Chip key={genre._id} label={genre.name} size="small" />
                                    ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <ReviewsProvider>
                        <ReviewsContent
                            bookId={book._id ?? ""}
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