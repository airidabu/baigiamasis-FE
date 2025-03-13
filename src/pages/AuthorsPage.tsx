import * as React from "react";
import {useEffect, useState} from "react";
import ItemsList from "../components/ItemsList.tsx";
import Author from "../types/Author.ts";
import {getAuthors} from "../api/authors.ts";
import {Link} from "react-router";
import AuthorForm from "../components/forms/AuthorForm.tsx";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    gap: 30px;
    justify-content: space-around;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
`

const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        getAuthors().then(fetchedAuthors => setAuthors(fetchedAuthors));
    }, []);

    const createAuthorElements = authors
        .map((author: Author, index) => (
            <Link key={index} to={`/authors/${author.id}`}><li>{author.name}</li></Link>
        ));

    return (
        <Wrapper>
            <ItemsList children={createAuthorElements}></ItemsList>
            <div>
                <AuthorForm/>
            </div>
        </Wrapper>
    )
}

export default AuthorsPage;