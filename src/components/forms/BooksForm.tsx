import {useEffect, useState} from "react";
import {useBooks} from "../../contexts/BooksContext.tsx";
import Author from "../../types/Author.ts";
import Genre from "../../types/Genre.ts";
import {getAuthors} from "../../api/authors.ts";
import {getGenres} from "../../api/genres.ts";
import * as React from "react";

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
                <option key={author.id} value={author.id}>{author.name}</option>
        ));

    const createGenreElements = genres.map((genre: Genre) => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
    ))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="title">Books Title</label>
                <input value={form.title} onChange={handleInputChange} type="text" name="title" id="title" />
            </div>
            <div className="form-control">
                <label htmlFor="image">Image URL</label>
                <input value={form.image} onChange={handleInputChange} type="text" name="image" id="image" />
            </div>
            <div className="form-control">
                <label htmlFor="author">Select Book author</label>
                <select value={form.author} onChange={handleSelectChange} name="author" id="authors-select">
                    <option value="">--Please select and author</option>
                    {createAuthorElements}
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="genre">Select Book genre</label>
                <select value={form.genre} onChange={handleSelectChange} name="genre" id="genres-select">
                    <option value="">--Please select a genre</option>
                    {createGenreElements}
                </select>
            </div>
            <button>Add New Book</button>
        </form>
    )
}

export default BooksForm;