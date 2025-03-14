import {BookAction, bookReducer, BookState, initialState} from "../reducers/bookReducer.ts";
import {getBooks, addBook, deleteBook} from "../api/books.ts";
import Book from "../types/Book.ts";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

type BooksContextType = {
    state: BookState;
    dispatch: Dispatch<BookAction>;
    fetchBooks: () => Promise<void>;
    createBook: (book: Omit<Book, "id">) => Promise<void>;
    removeBook: (id:string) => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, initialState);

    const fetchBooks = async () => {
        try {
            const books = await getBooks();
            dispatch({type: "GET_BOOKS", payload: books});
        } catch (error) {
            console.error(error);
        }
    }

    const createBook = async (book: Omit<Book, "id">) =>{
        try {
            const newBook = await addBook(book)
            dispatch({type: "ADD_BOOK", payload: newBook})
        }  catch (error) {
            console.error(error);
        }
    }

    const removeBook = async (bookId: string) => {
        try {
            await deleteBook(bookId);
            dispatch({type: "DELETE_BOOK", payload: bookId})
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <BooksContext.Provider value={{state, dispatch, fetchBooks, createBook, removeBook}}>
            {children}
        </BooksContext.Provider>
    )
}

export const useBooks = () => {
    const ctx = useContext(BooksContext);
    if (!ctx) {
        throw new Error("useBooks must be used within context.");
    }
    return ctx;
}