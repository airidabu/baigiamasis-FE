import Author from "../types/Author.ts";

export type AuthorState = {
    authors: Author[];
    error: string|null;
};

export type AuthorsAction =
    | {type: "GET_AUTHORS"; payload: Author[]}
    | {type: "ADD_AUTHOR"; payload: Author}
    | {type: "REMOVE_AUTHOR"; payload: string};

export const initialState: AuthorState = {
    authors: [],
    error: null
};

export const authorsReducer = (state: AuthorState, action: AuthorsAction) =>{
    switch (action.type) {
        case "GET_AUTHORS":
            return {...state, error: null, authors: action.payload};
        case "ADD_AUTHOR":
            return {...state, authors: [...state.authors, action.payload]};
        case "REMOVE_AUTHOR":
            return {...state, authors: state.authors.filter(author => author.id !== action.payload)}
        default:
            return state;
    }
}