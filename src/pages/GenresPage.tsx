import {useEffect, useState} from "react";
import {getGenres} from "../api/genres.ts";
import Genre from "../types/Genre.ts";
import ItemsList from "../components/ItemsList.tsx";

const GenresPage: React.FC = () =>{
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getGenres().then(fetchedGenres => setGenres(fetchedGenres));
    },[])

    const createGenresElement = genres.map((genre: Genre, index: number) => (
        <li key={index}>{genre.name}</li>
    ))
    return (
        <ItemsList children={createGenresElement}></ItemsList>
    )
}

export default GenresPage;