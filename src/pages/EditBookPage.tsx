import { useEffect, useState } from "react";
import BooksForm from "../components/forms/BooksForm";
import { BooksProvider } from "../contexts/BooksContext";
import { useParams, useNavigate } from "react-router";
import { getBook } from "../api/books";
import { CircularProgress, Container, Paper, Typography, Alert } from "@mui/material";
import Book from "../types/Book";

const EditBookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) {
                setError("No book ID provided");
                setLoading(false);
                return;
            }

            try {
                const bookData = await getBook(id);
                if (!bookData) {
                    setError("Book not found");
                } else {
                    setBook(bookData);
                }
            } catch (err) {
                console.error("Error fetching book:", err);
                setError("Failed to load book information");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleSuccess = () => {
        navigate(`/books/${id}`);
    };

    const handleCancel = () => {
        navigate(`/books/${id}`);
    };

    return (
        <BooksProvider>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom color="primary.main">
                    Edit Book
                </Typography>

                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                        <CircularProgress />
                    </div>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                ) : book ? (
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <BooksForm
                            mode="edit"
                            book={book}
                            onSuccess={handleSuccess}
                            onCancel={handleCancel}
                        />
                    </Paper>
                ) : (
                    <Alert severity="warning">Book data unavailable</Alert>
                )}
            </Container>
        </BooksProvider>
    );
};

export default EditBookPage;