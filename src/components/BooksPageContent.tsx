import {useBooks} from "../contexts/BooksContext.tsx";
import {useEffect} from "react";
import Book from "../types/Book.ts";
import {Link} from "react-router";
import BookCard from "./BookCard.tsx";
import ItemsContainer from "./ItemsContainer.tsx";
import BooksForm from "./forms/BooksForm.tsx";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    gap: 30px;
    justify-content: space-around;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
`

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
        <Wrapper>
            <ItemsContainer children={createBooksCards}></ItemsContainer>
            <div>
                <BooksForm/>
            </div>
        </Wrapper>
    )
}

export default BooksPageContent;