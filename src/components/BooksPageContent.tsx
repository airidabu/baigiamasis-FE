import { useBooks } from "../contexts/BooksContext.tsx";
import { useEffect } from "react";
import Book from "../types/Book.ts";
import { Link } from "react-router";
import BookCard from "./BookCard.tsx";
import ItemsContainer from "./ItemsContainer.tsx";
import BooksForm from "./forms/BooksForm.tsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";


const BooksPageContent: React.FC = () => {
    const { state, fetchBooks, removeBook } = useBooks();

    useEffect(() => {
        fetchBooks();
    }, [])

    const createBooksCards = state.books.map((book: Book) => (
        <Box
            key={book._id}
            sx={{
                width: 240,
                height: 340,
                margin: 1
            }}
        >
            <Link to={`/books/${book._id}`} style={{
                textDecoration: "none",
                display: "block",
                height: "calc(100% - 40px)"
            }}>
                <BookCard
                    name={book.name}
                    imageUrl={book.imageUrl}
                />
            </Link>
            <Typography variant="subtitle1" noWrap align="center">
                {book.name}
            </Typography>
            <Typography variant="subtitle2" noWrap align="center" color="text.secondary">
                {book.author.name} {book.author.surname}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <Button variant="outlined" onClick={() => removeBook(book._id!)}>Remove Book❌</Button>
            </Box>
        </Box>
    ))
    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <ItemsContainer children={createBooksCards}></ItemsContainer>
                <div>
                    <BooksForm />
                </div>
            </Box>
        </Container>
    )
}

export default BooksPageContent;