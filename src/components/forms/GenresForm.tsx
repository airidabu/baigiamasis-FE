import { useState } from "react";
import { useGenres } from "../../contexts/GenresContext.tsx";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";

const GenresForm: React.FC = () => {
    const [genreName, setGenreName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const { createGenre, state } = useGenres();
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const genreExists = state.genres.some((genre) => genre.name.toLowerCase() === genreName.toLocaleLowerCase());

        if (genreExists) {
            setError(`Genre "${genreName}" already exists`);
            setOpen(true);
            return;
        }

        try {
            const newGenre = {
                name: genreName
            }
            createGenre(newGenre).then(() => {
                console.log("Successfully created a new genre");
            })
            setGenreName("");
        } catch (error) {
            console.error("Error creating genre", error);
            setError("Failed to create genre. Please try again.");
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={submitHandler}
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px", mx: "auto" }}
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default GenresForm;