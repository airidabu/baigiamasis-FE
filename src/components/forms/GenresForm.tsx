import {useState} from "react";
import {useGenres} from "../../contexts/GenresContext.tsx";
import {Box, TextField, Button} from "@mui/material";

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
            <Box
                component="form"
                onSubmit={submitHandler}
                sx={{display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px", mx: "auto"}}
            >
                <TextField
                    label="Genre Name"
                    variant="outlined"
                    fullWidth
                    value={genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
    )
}

export default GenresForm;