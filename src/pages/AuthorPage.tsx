import * as React from "react";
import {useEffect, useState} from "react";
import Author from "../models/Author.ts";
import {getAuthor} from "../api/authors.ts";
import Book from "../models/Book.ts";
import {getAuthorBooks} from "../api/books.ts";
import BookCard from "../components/BookCard.tsx";
import ItemsList from "../components/ItemsList.tsx";
import {Link, useParams} from "react-router";

const AuthorPage: React.FC = () => {
    const {id} = useParams();
    const [author, setAuthor] = useState<Author | undefined>(undefined);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getAuthor(id!).then(fetchedAuthor => setAuthor(fetchedAuthor));
        getAuthorBooks(id!).then(fetchedBooks => setBooks(fetchedBooks));
    }, [id]);

    const createBooks = books.map(book => {
        return <Link key={book.id} to={`/books/${book.id}`}>
            <BookCard imageUrl={book.imageUrl} title={book.title}></BookCard>
        </Link>
    })

    const createAuthorCard = () => {
        if (author)
            return <div>
                <img src={author!.photoUrl} alt=""/>
                <h1>{author!.name}</h1>
                <h2>{author!.birthDate!.year + "-" + author!.birthDate!.month + "-" + author!.birthDate!.day}</h2>
                <ItemsList children={createBooks}></ItemsList>
            </div>
        else
            return <h1>Author not found</h1>
    }

    return createAuthorCard();
}

export default AuthorPage;