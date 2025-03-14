import * as React from "react";
import {useAuthors} from "../contexts/AuthorsContext.tsx";
import {useEffect} from "react";
import Author from "../types/Author.ts";
import {Link} from "react-router";
import ItemsList from "./ItemsList.tsx";
import AuthorForm from "./forms/AuthorForm.tsx";


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
        <div>
            <ItemsList children={createAuthorElements}></ItemsList>
            <div>
                <AuthorForm/>
            </div>
        </div>
    )
}

export default AuthorsPageContent;