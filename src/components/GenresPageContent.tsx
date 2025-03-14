import styled from "styled-components";
import GenresForm from "./forms/GenresForm.tsx";
import {useGenres} from "../contexts/GenresContext.tsx";
import {useEffect} from "react";
import ItemsList from "./ItemsList.tsx";

const Wrapper = styled.div`
    display: flex;
    gap: 30px;
    justify-content: space-around;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
`
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
        <Wrapper>
            <ItemsList children={createGenreElements}></ItemsList>
            <div>
                <GenresForm/>
            </div>
        </Wrapper>
    )
}

export default GenresPageContent;