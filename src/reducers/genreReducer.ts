import Genre from "../types/Genre.ts";

export type GenreState = {
    genres: Genre[];
    error: string | null;
}

export type GenresAction =
    | { type: "GET_GENRES", payload: Genre[] }
    | { type: "ADD_GENRE", payload: Genre }
    | { type: "DELETE_GENRE", payload: string }

export const initialState: GenreState = {
    genres: [],
    error: null,
}

export const genresReducer = (state: GenreState, action: GenresAction) => {
    switch (action.type) {
        case "GET_GENRES":
            return { ...state, genres: action.payload };
        case "ADD_GENRE":
            return { ...state, genres: [...state.genres, action.payload] };
        case "DELETE_GENRE":
            return { ...state, genres: state.genres.filter(genre => genre._id !== action.payload) };
        default:
            return state;
    }
}