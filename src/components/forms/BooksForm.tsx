import { useEffect, useState } from "react";
import { useBooks } from "../../contexts/BooksContext.tsx";
import Genre from "../../types/Genre.ts";
import { getGenres } from "../../api/genres.ts";
import { getPublishers } from "../../api/publishers.ts";
import Publisher from "../../types/Publisher.ts";
import Book from "../../types/Book.ts";
import * as React from "react";
import Box from "@mui/material/Box";
import { Alert, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

interface BooksFormProps {
    mode?: "create" | "edit";
    book?: Book;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const BooksForm: React.FC<BooksFormProps> = ({ mode = "create", book, onSuccess, onCancel }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEdit = mode === "edit";

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

        const fetchPublishers = async () => {
            try {
                const publishersData = await getPublishers();
                setPublishers(publishersData);
            } catch (error) {
                console.error("Failed to fetch publishers:", error);
            }
        };

        fetchGenres();
        fetchPublishers();
    }, []);

    useEffect(() => {
        if (isEdit && book) {
            setForm({
                name: book.name || "",
                description: book.description || "",
                pictureUrl: book.pictureUrl || "",
                releaseDate: book.releaseDate ? new Date(book.releaseDate).toISOString().split('T')[0] : "",
                publisher: book.publisher ? (typeof book.publisher !== 'string' ? book.publisher._id as string : book.publisher) : "",
                genres: book.genres ?
                    book.genres.map(genre =>
                        typeof genre !== 'string' ? genre._id || "" : genre
                    ) : [],
                pageNumber: book.pageNumber ? book.pageNumber.toString() : "",
            });
        }
    }, [isEdit, book]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name as string]: value
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

    const { createBook, updateBookData } = useBooks();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const bookData = {
                name: form.name,
                description: form.description,
                pictureUrl: form.pictureUrl,
                releaseDate: form.releaseDate,
                publisher: { _id: form.publisher } as Publisher,
                genres: form.genres.map(id => ({ _id: id } as Genre)),
                pageNumber: parseInt(form.pageNumber),
            };

            if (isEdit && book?._id) {
                await updateBookData(book._id, bookData);
                setSuccess(true);
                if (onSuccess) onSuccess();
            } else {
                await createBook(bookData);
                setSuccess(true);
                setForm({
                    name: "",
                    description: "",
                    pictureUrl: "",
                    releaseDate: "",
                    publisher: "",
                    genres: [],
                    pageNumber: "",
                });
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            console.error("Error saving book:", err);
            setError("Failed to save book. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
        setSuccess(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "600px", mx: "auto" }}
        >
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
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

            <FormControl fullWidth required>
                <InputLabel id="publisher-select-label">Publisher</InputLabel>
                <Select
                    labelId="publisher-select-label"
                    id="publisher-select"
                    value={form.publisher}
                    label="Publisher"
                    name="publisher"
                    onChange={handleSelectChange}
                >
                    {publishers.map((publisher) => (
                        <MenuItem key={publisher._id} value={publisher._id}>
                            {publisher.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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

            {isEdit ? (
                <Grid container spacing={2}>
                    {onCancel && (
                        <Grid>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={onCancel}
                                sx={{ mr: 1 }}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    )}
                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Update Book"}
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add New Book"}
                </Button>
            )}

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={isEdit ? "Book updated successfully!" : "Book added successfully!"}
            />
        </Box>
    );
};

export default BooksForm;