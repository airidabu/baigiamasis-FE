import { useEffect, useState } from "react";
import { useBooks } from "../../contexts/BooksContext.tsx";
import Author from "../../types/Author.ts";
import Genre from "../../types/Genre.ts";
import Publisher from "../../types/Publisher.ts";
import { getAuthors } from "../../api/authors.ts";
import { getGenres } from "../../api/genres.ts";
import { getPublishers } from "../../api/publishers.ts";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, InputLabel, Select, SelectChangeEvent, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const BooksForm: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        imageUrl: "",
        description: "",
        authorId: "",
        publisherId: "",
        genreIds: [] as string[],
        pageNumber: 0,
        releaseDate: ""
    })

    const [authors, setAuthors] = useState<Author[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);

    useEffect(() => {
        getAuthors()
            .then(data => setAuthors(data))
            .catch(err => console.log(err));

        getGenres()
            .then(data => setGenres(data))
            .catch(err => console.log(err));

        getPublishers()
            .then(data => setPublishers(data))
            .catch(err => console.log(err));
    }, [])

    const createAuthorElements = authors
        .map((author: Author) => (
            <MenuItem key={author._id} value={author._id}>{author.name} {author.surname}</MenuItem>
        ));

    const createGenreElements = genres.map((genre: Genre) => (
        <MenuItem key={genre._id} value={genre._id}>{genre.name}</MenuItem>
    ))

    const createPublisherElements = publishers.map((publisher: Publisher) => (
        <MenuItem key={publisher._id} value={publisher._id}>{publisher.name}</MenuItem>
    ))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleMultiSelectChange = (e: SelectChangeEvent<string[]>) => {
        setForm({
            ...form,
            genreIds: e.target.value as string[]
        })
    }

    const { createBook } = useBooks();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedAuthor = authors.find(author => author._id === form.authorId);
        const selectedPublisher = publishers.find(publisher => publisher._id === form.publisherId);
        const selectedGenres = genres.filter(genre => form.genreIds.includes(genre._id || ""));

        const newBook = {
            name: form.name,
            imageUrl: form.imageUrl,
            description: form.description,
            author: selectedAuthor!,
            publisher: selectedPublisher!,
            genres: selectedGenres,
            pageNumber: form.pageNumber,
            releaseDate: form.releaseDate,
        }

        createBook(newBook).then(() => {
            console.log("Successfully added new book", newBook)
        })

        setForm({
            name: "",
            imageUrl: "",
            description: "",
            authorId: "",
            publisherId: "",
            genreIds: [],
            pageNumber: 0,
            releaseDate: ""
        })
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px", mx: "auto" }}
        >
            <TextField
                label="Book Name"
                variant="outlined"
                fullWidth
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
            />
            <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                name="imageUrl"
                value={form.imageUrl}
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
                label="Page Number"
                variant="outlined"
                fullWidth
                type="number"
                name="pageNumber"
                value={form.pageNumber}
                onChange={handleInputChange}
                required
            />
            <TextField
                label="Release Date"
                variant="outlined"
                fullWidth
                type="date"
                name="releaseDate"
                value={form.releaseDate}
                onChange={handleInputChange}
                required
            />
            <FormControl fullWidth required>
                <InputLabel id="author-label">Author</InputLabel>
                <Select
                    labelId="author-label"
                    name="authorId"
                    value={form.authorId}
                    label="Author"
                    onChange={handleSelectChange}
                >
                    {createAuthorElements}
                </Select>
            </FormControl>

            <FormControl fullWidth required>
                <InputLabel id="publisher-label">Publisher</InputLabel>
                <Select
                    labelId="publisher-label"
                    name="publisherId"
                    value={form.publisherId}
                    label="Publisher"
                    onChange={handleSelectChange}
                >
                    {createPublisherElements}
                </Select>
            </FormControl>

            <FormControl fullWidth required>
                <InputLabel id="genre-label">Genres</InputLabel>
                <Select
                    labelId="genre-label"
                    multiple
                    name="genreIds"
                    value={form.genreIds}
                    label="Genres"
                    onChange={handleMultiSelectChange}
                >
                    {createGenreElements}
                </Select>
            </FormControl>
            <Button variant="contained" type="submit">Add New Book</Button>
        </Box>
    )
}

export default BooksForm;