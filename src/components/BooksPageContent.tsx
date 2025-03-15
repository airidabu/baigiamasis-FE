import {useBooks} from "../contexts/BooksContext.tsx";
import {useEffect} from "react";
import Book from "../types/Book.ts";
import {Link} from "react-router";
import BookCard from "./BookCard.tsx";
import ItemsContainer from "./ItemsContainer.tsx";
import BooksForm from "./forms/BooksForm.tsx";
import Container from "@mui/material/Container";

const BooksPageContent: React.FC = () => {
    const {state, fetchBooks, removeBook} = useBooks();

    useEffect(() => {
        fetchBooks();
    }, [])

    const createBooksCards = state.books.map((book: Book) => (
        <div key={book.id}>
            <Link to={`/books/${book.id}`}>
                <BookCard
                    title={book.title}
                    imageUrl={book.imageUrl}
                />
            </Link>
            <button onClick={() => removeBook(book.id!)}>❌</button>
        </div>
    ))
    return (
        <Container>
            <ItemsContainer children={createBooksCards}></ItemsContainer>
            <div>
                <BooksForm/>
            </div>
        </Container>
    )
}

export default BooksPageContent;