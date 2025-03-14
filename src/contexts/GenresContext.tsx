import {GenresAction, genresReducer, GenreState, initialState} from "../reducers/genreReducer.ts";
import {getGenres, addGenre, deleteGenre} from "../api/genres.ts";
import Genre from "../types/Genre.ts";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

type GenresContextType = {
    state: GenreState;
    dispatch: Dispatch<GenresAction>;
    fetchGenres: () => Promise<void>;
    createGenre: (genre: Omit<Genre, "id">) => Promise<void>;
    removeGenre: (id: string) => Promise<void>;
}

const GenresContext = createContext<GenresContextType | undefined>(undefined);

export const GenresProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(genresReducer, initialState);

    const fetchGenres = async () => {
        try {
            const genres = await getGenres();
            dispatch({type: "GET_GENRES", payload: genres});
        } catch (error) {
            console.error(error);
        }
    }

    const createGenre = async (genre: Omit<Genre, "id">) => {
        try {
            const newGenre = await addGenre(genre);
            dispatch({type: "ADD_GENRE", payload: newGenre});
        } catch (error) {
            console.error(error);
        }
    }

    const removeGenre = async (id: string) => {
        try {
            await deleteGenre(id);
            dispatch({type: "DELETE_GENRE", payload: id});
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <GenresContext.Provider value={{state, dispatch, fetchGenres, createGenre, removeGenre}}>
            {children}
        </GenresContext.Provider>
    )
}

export const useGenres = () => {
    const ctx = useContext(GenresContext);
    if(!ctx) {
        throw new Error("useGenres must be used within the context");
    }

    return ctx;
}