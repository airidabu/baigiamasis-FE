import { useEffect, useState } from "react";
import { useBooks } from "../../contexts/BooksContext.tsx";
import Genre from "../../types/Genre.ts";
import { getGenres } from "../../api/genres.ts";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, TextField } from "@mui/material";

const BooksForm: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        pictureUrl: "",
        releaseDate: "",
        publisher: "",
        genres: [] as string[],
        pageNumber: "",
    });

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genresData = await getGenres();
                setGenres(genresData);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setForm({
                ...form,
                genres: [...form.genres, value]
            });
        } else {
            setForm({
                ...form,
                genres: form.genres.filter(genreId => genreId !== value)
            })
        }

    }

    const { createBook } = useBooks();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newBook = {
            name: form.name,
            description: form.description,
            pictureUrl: form.pictureUrl,
            releaseDate: form.releaseDate,
            publisher: form.publisher,
            genres: form.genres,
            pageNumber: parseInt(form.pageNumber),
        };

        createBook(newBook).then(() => {
            console.log("Successfully added new book", newBook);
        });

        setForm({
            name: "",
            description: "",
            pictureUrl: "",
            releaseDate: "",
            publisher: "",
            genres: [],
            pageNumber: "",
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px", mx: "auto" }}
        >
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={form.name}
                onChange={handleInputChange}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                name="description"
                value={form.description}
                onChange={handleInputChange}
            />
            <TextField
                label="Picture URL"
                variant="outlined"
                fullWidth
                name="pictureUrl"
                value={form.pictureUrl}
                onChange={handleInputChange}
            />
            <TextField
                label="Release Date"
                variant="outlined"
                fullWidth
                required
                type="date"
                name="releaseDate"
                value={form.releaseDate}
                onChange={handleInputChange}
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
                label="Publisher ID"
                variant="outlined"
                fullWidth
                required
                name="publisher"
                value={form.publisher}
                onChange={handleInputChange}
                helperText="Enter publisher ID (will be select dropdown later)"
            />
            <TextField
                label="Page Number"
                variant="outlined"
                fullWidth
                required
                type="number"
                name="pageNumber"
                value={form.pageNumber}
                onChange={handleInputChange}
            />
            <FormControl sx={{ minWidth: 200 }} component="fieldset" variant="standard" required>
                <FormLabel component="legend">Genres</FormLabel>
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        maxHeight: "200px",
                        overflow: "auto"
                    }}
                >
                    <FormGroup>
                        {genres.map((genre) => (
                            <FormControlLabel
                                key={genre._id}
                                control={
                                    <Checkbox
                                        checked={form.genres.includes(genre._id)}
                                        onChange={handleGenreChange}
                                        value={genre._id}
                                        name={genre.name}
                                    />
                                }
                                label={genre.name}
                            />
                        ))}
                    </FormGroup>
                </Paper>
            </FormControl>
            <Button variant="contained" type="submit">Add New Book</Button>
        </Box>
    );
};

export default BooksForm;