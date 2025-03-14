import * as React from "react";
import {useAuthors} from "../contexts/AuthorsContext.tsx";
import {useEffect} from "react";
import Author from "../types/Author.ts";
import {Link} from "react-router";
import ItemsList from "./ItemsList.tsx";
import AuthorForm from "./forms/AuthorForm.tsx";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    gap: 30px;
    justify-content: space-around;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
`

const AuthorsPageContent: React.FC = () => {
    const {state, fetchAuthors,removeAuthor } = useAuthors();

    useEffect(() => {
        fetchAuthors();
    }, []);

    const createAuthorElements = state.authors
        .map((author: Author) => (
            <div key={author.id}>
                <Link  to={`/authors/${author.id}`}><li>{author.name}</li></Link>
                <button  onClick={() => removeAuthor(author.id!)}>❌</button>
            </div>
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

export default AuthorsPageContent;