import Book from "../types/Book.ts";

export type BookState = {
    books: Book[];
    error: string | null;
}

export type BookAction =
    | { type: "GET_BOOKS", payload: Book[] }
    | { type: "ADD_BOOK", payload: Book }
    | { type: "DELETE_BOOK", payload: string }
    | { type: "UPDATE_BOOK", payload: Book }

export const initialState: BookState = {
    books: [],
    error: null
};

export const bookReducer = (state: BookState, action: BookAction) => {
    switch (action.type) {
        case "GET_BOOKS":
            return { ...state, books: action.payload };
        case "ADD_BOOK":
            return { ...state, books: [...state.books, action.payload] };
        case "UPDATE_BOOK":
            return {
                ...state,
                books: state.books.map(book =>
                    book._id === action.payload._id ? action.payload : book
                )
            };
        case "DELETE_BOOK":
            return { ...state, books: state.books.filter(book => book._id !== action.payload) };
        default:
            return state;
    }
}