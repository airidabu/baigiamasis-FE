import * as React from "react";
import {useEffect, useState} from "react";
import ItemsList from "../components/ItemsList.tsx";
import Author from "../types/Author.ts";
import {getAuthors} from "../api/authors.ts";
import {Link} from "react-router";

const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        getAuthors().then(fetchedAuthors => setAuthors(fetchedAuthors));
    }, []);

    const createAuthorElements = authors
        .map((author: Author, index) => (
            <Link to={`/authors/${author.id}`}><li key={index}>{author.name}</li></Link>
        ));

    return <ItemsList children={createAuthorElements}></ItemsList>
}

export default AuthorsPage;