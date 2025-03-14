import GenresForm from "./forms/GenresForm.tsx";
import {useGenres} from "../contexts/GenresContext.tsx";
import {useEffect} from "react";
import ItemsList from "./ItemsList.tsx";

const GenresPageContent: React.FC = () => {
    const {state, fetchGenres, removeGenre} = useGenres();

    useEffect(() => {
        fetchGenres();
    }, []);

    const createGenreElements = state.genres.map((genre) => (
        <li key={genre.id}>{genre.name}
            <button onClick={() => removeGenre(genre.id!)}>❌</button>
        </li>
    ))

    return (
        <div>
            <ItemsList children={createGenreElements}></ItemsList>
            <div>
                <GenresForm/>
            </div>
        </div>
    )
}

export default GenresPageContent;