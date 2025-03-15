import * as React from "react";
import {useEffect, useState} from "react";
import Author from "../types/Author.ts";
import {getAuthor} from "../api/authors.ts";
import Book from "../types/Book.ts";
import {getAuthorBooks} from "../api/books.ts";
import BookCard from "../components/BookCard.tsx";
import {Link, useParams} from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";
import ItemsContainer from "../components/ItemsContainer.tsx";

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
            return <Box sx={{ display: "flex", gap: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <h1>{author!.name}</h1>
                    <Box
                        component="img"
                        src={author!.photoUrl}
                        alt={author!.name}
                        maxWidth="300px"
                        height="auto"
                    />
                    <h2>Born on {author!.birthDate!.year + "-" + author!.birthDate!.month + "-" + author!.birthDate!.day}</h2>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Box>
                    <h2>Books by {author.name}</h2>
                    <ItemsContainer children={createBooks}></ItemsContainer>
                </Box>
            </Box>
        else
            return <h1>Author not found</h1>
    }

    return (
        <Container>
            {createAuthorCard()}
        </Container>
    );
}

export default AuthorPage;