import {useState} from "react";
import {useAuthors} from "../../contexts/AuthorsContext.tsx";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";

const AuthorForm: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        year:"",
        month:"",
        day:"",
        profilePhoto:""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const {createAuthor} = useAuthors();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newAuthor = {
            name: form.name,
            birthDate:{
                year: +form.year,
                month: +form.month,
                day: +form.day,
            },
            photoUrl:form.profilePhoto
        }

        createAuthor(newAuthor).then(() => {
            console.log("Successfully added a new author", newAuthor);
        });

        setForm({
            ...form,
            name: "",
            year:"",
            month:"",
            day:"",
            profilePhoto:""
        })
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Add New Author</h2>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px", mx:"auto"}}
            >
                <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Year"
                    variant="outlined"
                    fullWidth
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                />
                <TextField
                    label="Month"
                    variant="outlined"
                    fullWidth
                    name="month"
                    value={form.month}
                    onChange={handleChange}
                />
                <TextField
                    label="Day"
                    variant="outlined"
                    fullWidth
                    name="day"
                    value={form.day}
                    onChange={handleChange}
                />
                <TextField
                    label="Profile Photo Link"
                    variant="outlined"
                    fullWidth
                    name="profilePhoto"
                    value={form.profilePhoto}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add New Author
                </Button>
            </Box>
        </Box>
    )
}

export default AuthorForm;