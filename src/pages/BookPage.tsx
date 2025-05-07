import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Book from "../types/Book.ts";
import { getBook, deleteBook } from "../api/books.ts";
import Container from "@mui/material/Container";
import { Card, CardContent, CardMedia, Typography, Box, Button, Divider } from "@mui/material";
import { useAuth } from "../contexts/AuthContext.tsx";
import ReviewsContent from "../components/ReviewsContent.tsx"; // Import the ReviewsContent component
import { ReviewsProvider } from "../contexts/ReviewsContext.tsx"; // Import the ReviewsProvider

const BookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | undefined>();
    const { userRole, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getBook(id!).then(fetchedBook => setBook(fetchedBook));
    }, [id])

    const handleEdit = () => {
        navigate(`/books/edit/${id}`);
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await deleteBook(id!);
            navigate("/books");
        }
    };

    const createBookCard = () => {
        if (book) {
            return (
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Card sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, mb: 4, p: 1 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={book.pictureUrl ? book.pictureUrl : "https://static.vecteezy.com/system/resources/thumbnails/020/484/423/small_2x/hand-drawn-open-book-vector.jpg"}
                            alt={book.name}
                            sx={{
                                width: { xs: "100%", sm: 200 },
                                height: { xs: "auto", sm: 300 },
                                objectFit: "cover",
                                border: "2px solid",
                                borderColor: "primary.main",
                                borderRadius: 1,
                            }}
                        />
                        <CardContent>
                            <Typography variant="h3" component="div" gutterBottom>
                                {book.name}
                            </Typography>
                            <Typography variant="h4">
                                {book.author ? `${book.author.name} ${book.author.surname}` : "Unknown Author"}
                            </Typography>
                            <Typography>
                                {book.publisher?.name || "Unknown Publisher"}
                            </Typography>
                            {book.description?.trim() && (
                                <Typography>
                                    {book.description}
                                </Typography>
                            )}
                            {isAuthenticated && (userRole === "admin" || userRole === "author") && (
                                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                                    <Button variant="contained" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>

                    <Divider sx={{ my: 4 }} />

                    <ReviewsProvider>
                        <ReviewsContent bookId={id!} />
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