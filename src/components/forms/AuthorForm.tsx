import {useState} from "react";
import {addAuthor} from "../../api/authors.ts";

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

        addAuthor(newAuthor).then(() => {
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
        <>
            <h2>Add New Author</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Full Name</label>
                    <input onChange={handleChange} name="name" id="name" type="text" value={form.name}/>
                </div>
                <div className="birthday">
                    <h2>Date of Birth</h2>
                    <div className="form-control">
                        <label htmlFor="year">Year</label>
                        <input onChange={handleChange} type="number" id="year" name="year" value={form.year}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="month">Month</label>
                        <input onChange={handleChange} type="number" id="month" name="month" value={form.month}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="day">Day</label>
                        <input onChange={handleChange} type="number" id="day" name="day" value={form.day}/>
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="profile-photo">Author's Photo</label>
                    <input onChange={handleChange} type="text" name="profilePhoto" id="profilePhoto" value={form.profilePhoto}/>
                </div>
                <button>Add New Author</button>
            </form>
        </>
    )
}

export default AuthorForm;