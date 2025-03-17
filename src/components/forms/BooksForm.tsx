import {useEffect, useState} from "react";
import {useBooks} from "../../contexts/BooksContext.tsx";
import Author from "../../types/Author.ts";
import Genre from "../../types/Genre.ts";
import {getAuthors} from "../../api/authors.ts";
import {getGenres} from "../../api/genres.ts";
import * as React from "react";
import Box from "@mui/material/Box";
import {Button, FormControl, InputLabel, Select, SelectChangeEvent, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const BooksForm: React.FC = () => {
    const [form, setForm] = useState({
        title: "",
        image: "",
        author: "",
        genre: "",
    })

    const [authors, setAuthors] = useState<Author[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getAuthors()
            .then(data => setAuthors(data))
            .catch(err => console.log(err));

        getGenres()
            .then(data => setGenres(data))
            .catch(err => console.log(err));
    },[])

    const createAuthorElements = authors
        .map((author: Author) => (
                <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
        ));

    const createGenreElements = genres.map((genre: Genre) => (
        <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
    ))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const {createBook} = useBooks();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newBook = {
            title: form.title,
            imageUrl: form.image,
            genreId: form.genre,
            authorId: form.author,
        }

        createBook(newBook).then(() => {
            console.log("Successfully added new book", newBook)
        })

        setForm({
            ...form,
            title: "",
            image: "",
            genre: "",
            author: ""
        })
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px", mx:"auto"}}
        >
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={form.title}
                onChange={handleInputChange}
            />
            <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                name="image"
                value={form.image}
                onChange={handleInputChange}
            />
            <FormControl sx={{m: 1, minWidth: 200}}>
                <InputLabel id="author-label">Author</InputLabel>
                <Select
                    labelId="author-label"
                    name="author"
                    value={form.author}
                    label="Author"
                    onChange={handleSelectChange}
                >
                    {createAuthorElements}
                </Select>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 200}}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                    labelId="genre-label"
                    name="genre"
                    value={form.genre}
                    label="Genre"
                    onChange={handleSelectChange}
                >
                    {createGenreElements}
                </Select>
            </FormControl>
            <Button variant="contained" type="submit">Add New Book</Button>
        </Box>
    )
}

export default BooksForm;