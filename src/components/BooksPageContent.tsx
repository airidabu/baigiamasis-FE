import { useBooks } from "../contexts/BooksContext.tsx";
import { useEffect, useState } from "react";
import Book from "../types/Book.ts";
import { Link } from "react-router";
import BookCard from "./BookCard.tsx";
import ItemsContainer from "./ItemsContainer.tsx";
import BooksForm from "./forms/BooksForm.tsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, Collapse, CircularProgress, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../contexts/AuthContext.tsx";

const BooksPageContent: React.FC = () => {
    const { state, fetchBooks } = useBooks();
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { userRole, isAuthenticated } = useAuth();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            await fetchBooks();
            setIsLoading(false);
        };

        loadBooks();
    }, []);

    const createBooksCards = state.books.map((book: Book) => (
        <Box
            key={book._id}
            sx={{
                width: isSmallScreen ? '100%' : 240,
                height: isSmallScreen ? 'auto' : 340,
                margin: 1
            }}
        >
            <Link to={`/books/${book._id}`} style={{
                textDecoration: "none",
                display: "block",
                height: isSmallScreen ? "auto" : "calc(100% - 40px)"
            }}>
                <BookCard
                    title={book.name}
                    imageUrl={book.pictureUrl ? book.pictureUrl : "https://static.vecteezy.com/system/resources/thumbnails/020/484/423/small_2x/hand-drawn-open-book-vector.jpg"}
                />
            </Link>
        </Box>
    ))

    if (isSmallScreen) {
        return (
            <Container>
                {isAuthenticated && (userRole === "admin" || userRole === "author") && (
                    <Box sx={{ width: '100%', mb: 3 }}>
                        <Button
                            variant="contained"
                            onClick={() => setFormOpen((prev) => !prev)}
                            sx={{ width: '100%', mb: 1 }}
                        >
                            {isFormOpen ? "Close Form" : "Add New Book"}
                        </Button>
                        <Collapse in={isFormOpen}>
                            <BooksForm />
                        </Collapse>
                    </Box>
                )}
                {isLoading ? (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}>
                        <CircularProgress size={60} />
                        <Typography variant="h6" sx={{ mt: 2 }}>Loading books...</Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <ItemsContainer children={createBooksCards}></ItemsContainer>
                    </Box>
                )}
            </Container>
        );
    }

    return (
        <Container>
            {isLoading ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}>
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ mt: 2 }}>Loading books...</Typography>
                </Box>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <ItemsContainer children={createBooksCards}></ItemsContainer>
                    {isAuthenticated && (userRole === "admin" || userRole === "author") && (
                        <div>
                            <Button
                                variant="contained"
                                onClick={() => setFormOpen((prev) => !prev)}
                                sx={{ mb: 2 }}
                            >
                                {isFormOpen ? "Close Form" : "Add New Book"}
                            </Button>
                            <Collapse in={isFormOpen}>
                                <BooksForm />
                            </Collapse>
                        </div>
                    )}
                </Box>
            )}
        </Container>
    )
}

export default BooksPageContent;