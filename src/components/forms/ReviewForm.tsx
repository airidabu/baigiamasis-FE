import {useState} from "react";
import {useReviews} from "../../contexts/ReviewsContext.tsx";
import {useParams} from "react-router";

const ReviewForm: React.FC = () =>{
    const { id } = useParams();
    const[form, setForm] = useState({
        nickname: "",
        email: "",
        text:"",
        rating: 2.5
    })

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const {createReview} = useReviews();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newReview = {
            nickname: form.nickname,
            email: form.email,
            text: form.text,
            rating: form.rating,
            bookId: id!
        }

        createReview(newReview).then(() => {
            console.log(newReview);
        })

        setForm({
            ...form,
            nickname: "",
            email: "",
            text: "",
            rating: 2.5
        })

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="nickname">Your Nickname</label>
                <input onChange={handleTextChange} value={form.nickname} type="text" name="nickname" id="nickname" />
            </div>
            <div className="form-control">
                <label htmlFor="email">Your Email</label>
                <input onChange={handleTextChange} value={form.email} type="email" name="email" id="email" />
            </div>
            <div className="form-control">
                <label htmlFor="text">Your Review</label>
                <textarea onChange={handleTextAreaChange} value={form.text} name="text" id="text"></textarea>
            </div>
            <div className="form-control">
                <label htmlFor="rating">Your Rating</label>
                <input onChange={handleTextChange} value={form.rating} type="range" name="rating" id="rating" max="5" step="0.5"/>
                <span>{form.rating}</span>
            </div>
            <button>Submit</button>
        </form>
    )
}

export default ReviewForm;