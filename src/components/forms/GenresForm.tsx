import {useState} from "react";
import {addGenre} from "../../api/genres.ts";
import Genre from "../../types/Genre.ts";

const GenresForm: React.FC = () => {
    const [genreName, setGenreName] = useState("");
    const [error, setError] = useState("");

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!genreName) {
            setError("Please enter a genre");
            return;
        }

        const newGenre: Genre = {
            name: genreName,
        }

       try {
            await addGenre(newGenre);
       } catch (error) {
            setError("Failed to add Genre");
            console.error(error);
       }

        setError("");
        setGenreName("");
    }
    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={submitHandler}>
                <label htmlFor="genre-name">Genre Name</label>
                <input type="text" id="genre-name" name="genre-name" value={genreName} onChange={(e) => setGenreName(e.target.value)} />
                <button>Submit</button>
            </form>
        </>
    )
}

export default GenresForm;