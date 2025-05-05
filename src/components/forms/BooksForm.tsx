import { useEffect, useState } from "react";
import { useBooks } from "../../contexts/BooksContext.tsx";
import Genre from "../../types/Genre.ts";
import { getGenres } from "../../api/genres.ts";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, InputLabel, Select, SelectChangeEvent, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const BooksForm: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        pictureUrl: "",
        releaseDate: "",
        publisher: "",
        genres: "",
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

    const handleSelectChange = (e: SelectChangeEvent) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

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
            genres: "",
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
                label="Genres ID"
                variant="outlined"
                fullWidth
                required
                name="genres"
                value={form.genres}
                onChange={handleInputChange}
                helperText="Enter genre ID (will be multi-select later)"
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
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                    labelId="genre-label"
                    name="genres"
                    value={form.genres}
                    label="Genre"
                    onChange={handleSelectChange}
                >
                    {genres.map(genre => (
                        <MenuItem key={genre._id} value={genre._id}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" type="submit">Add New Book</Button>
        </Box>
    );
};

export default BooksForm;