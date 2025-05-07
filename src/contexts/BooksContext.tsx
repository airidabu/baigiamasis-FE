import { BookAction, bookReducer, BookState, initialState } from "../reducers/bookReducer.ts";
import { getBooks, addBook, deleteBook, updateBook } from "../api/books.ts";
import Book from "../types/Book.ts";
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

type BooksContextType = {
    state: BookState;
    dispatch: Dispatch<BookAction>;
    fetchBooks: () => Promise<void>;
    createBook: (book: Omit<Book, "id">) => Promise<void>;
    removeBook: (id: string) => Promise<void>;
    updateBookData: (id: string, book: Partial<Book>) => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, initialState);

    const fetchBooks = async () => {
        try {
            const books = await getBooks();
            dispatch({ type: "GET_BOOKS", payload: books });
        } catch (error) {
            console.error(error);
        }
    }

    const createBook = async (book: Book) => {
        try {
            const newBook = await addBook(book)
            dispatch({ type: "ADD_BOOK", payload: newBook })
        } catch (error) {
            console.error(error);
        }
    }

    const removeBook = async (bookId: string) => {
        try {
            await deleteBook(bookId);
            dispatch({ type: "DELETE_BOOK", payload: bookId })
        } catch (error) {
            console.error(error);
        }
    }

    const updateBookData = async (id: string, book: Partial<Book>) => {
        try {
            const updatedBook = await updateBook(id, book);
            if (updatedBook) {
                dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <BooksContext.Provider value={{ state, dispatch, fetchBooks, createBook, removeBook, updateBookData }}>
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