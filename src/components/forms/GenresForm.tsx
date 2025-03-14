import {useState} from "react";
import {useGenres} from "../../contexts/GenresContext.tsx";

const GenresForm: React.FC = () => {
    const [genreName, setGenreName] = useState("");

    const {createGenre} = useGenres();
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newGenre = {
            name: genreName
        }

        createGenre(newGenre).then(() => {
            console.log("Successfully created a new genre");
        })

        setGenreName("");
    }
    return (
            <form onSubmit={submitHandler}>
                <label htmlFor="genre-name">Genre Name</label>
                <input type="text" id="genre-name" name="genre-name" value={genreName} onChange={(e) => setGenreName(e.target.value)} />
                <button>Submit</button>
            </form>
    )
}

export default GenresForm;