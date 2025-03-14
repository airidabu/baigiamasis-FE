import {AuthorsAction, authorsReducer, AuthorState, initialState} from "../reducers/authorReducer.ts";
import {getAuthors, addAuthor, deleteAuthor} from "../api/authors.ts";
import Author from "../types/Author.ts";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

type AuthorsContextType = {
    state: AuthorState;
    dispatch: Dispatch<AuthorsAction>;
    fetchAuthors: () => Promise<void>;
    createAuthor: (author: Omit<Author, "id">) => Promise<void>;
    removeAuthor: (id:string) => Promise<void>;
}

const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined);

export const AuthorsProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(authorsReducer, initialState);

    const fetchAuthors = async () => {
        try {
            const authors = await getAuthors();
            dispatch({type: "GET_AUTHORS", payload: authors});
        } catch (error) {
            console.error(error);
        }
    }

    const createAuthor = async (author: Omit<Author, "id">) => {
        try {
            const newAuthor = await addAuthor(author);
            dispatch({type: "ADD_AUTHOR", payload: newAuthor})
        } catch (error) {
            console.error(error);
        }
    };

    const removeAuthor = async (id: string) => {
        try {
            await deleteAuthor(id);
            dispatch({type: "REMOVE_AUTHOR", payload: id})
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthorsContext.Provider value={{state, dispatch, fetchAuthors, createAuthor, removeAuthor}}>
            {children}
        </AuthorsContext.Provider>
    )
};

export const useAuthors = () => {
    const ctx = useContext(AuthorsContext);
    if (!ctx) {
        throw new Error("useAuthors must be used within the context");
    }

    return ctx;
}