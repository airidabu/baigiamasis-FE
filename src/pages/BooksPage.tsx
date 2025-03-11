import Book from "../types/Book.ts";
import {useEffect, useState} from "react";
import {getBooks} from "../api/books.ts";
import {Link} from "react-router";
import BookCard from "../components/BookCard.tsx";

const BooksPage:React.FC = () =>{
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(()=>{
        getBooks().then(fetchedBooks => setBooks(fetchedBooks));
    },[])

    const createBooksCards = books.map((book: Book) => (
        <Link to={`/books/${book.id}`} key={book.id}>
            <BookCard
            title={book.title}
            imageUrl={book.imageUrl}
            />
        </Link>
    ))
    return (
        <div>
            {createBooksCards}
        </div>
    )
}

export default BooksPage;