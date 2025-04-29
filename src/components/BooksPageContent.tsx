import {useBooks} from "../contexts/BooksContext.tsx";
import {useEffect} from "react";
import Book from "../types/Book.ts";
import {Link} from "react-router";
import BookCard from "./BookCard.tsx";
import ItemsContainer from "./ItemsContainer.tsx";
import BooksForm from "./forms/BooksForm.tsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";


const BooksPageContent: React.FC = () => {
    const {state, fetchBooks, removeBook} = useBooks();

    useEffect(() => {
        fetchBooks();
    }, [])

    const createBooksCards = state.books.map((book: Book) => (
        <Box
            key={book.id}
            sx={{
                width: 240,
                height: 340,
                margin: 1
            }}
        >
            <Link to={`/books/${book.id}`} style={{
                textDecoration: "none",
                display:"block",
                height: "calc(100% - 40px)"
            }}>
                <BookCard
                    title={book.title}
                    imageUrl={book.imageUrl}
                />
            </Link>
            <Box sx={{display: "flex", justifyContent: "flex-end", mt: 1}}>
                <Button variant="outlined" onClick={() => removeBook(book.id!)}>Remove Book❌</Button>
            </Box>
        </Box>
    ))
    return (
        <Container>
            <Box sx={{display: "flex", justifyContent: "space-around"}}>
                <ItemsContainer children={createBooksCards}></ItemsContainer>
                <div>
                    <BooksForm/>
                </div>
            </Box>
        </Container>
    )
}

export default BooksPageContent;