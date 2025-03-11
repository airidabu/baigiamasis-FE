const ReviewForm: React.FC = () =>{
    return (
        <form>
            <div className="form-control">
                <label htmlFor="nickname">Your Nickname</label>
                <input type="text" name="nickname" id="nickname" />
            </div>
            <div className="form-control">
                <label htmlFor="email">Your Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="form-control">
                <label htmlFor="text">Your Review</label>
                <textarea name="text" id="text"></textarea>
            </div>
            <div className="form-control">
                <label htmlFor="rating">Your Rating</label>
                <input type="range" name="rating" id="rating" max="5" step="0.5"/>
            </div>
            <button>Submit</button>
        </form>
    )
}

export default ReviewForm;