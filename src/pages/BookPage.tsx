import {useParams} from "react-router";
import {useEffect, useState} from "react";
import Book from "../types/Book.ts";
import {getBook} from "../api/books.ts";
import {getBookReviews} from "../api/reviews.ts";
import Review from "../types/Review.ts";

interface bookWithReviews extends Book {
    reviews: Review[];
}

const BookPage: React.FC = () => {
    const {id} = useParams();
    const [book, setBook] = useState<Book | undefined>();
    const [bookReviews, setBookReviews] = useState<bookWithReviews | undefined>();

    useEffect(() => {
        getBook(id!).then(fetchedBook => setBook(fetchedBook));
        getBookReviews(id!).then(fetchedReviews => setBookReviews(fetchedReviews));
    },[id])

    const createBookCard = () => {
        if (book && bookReviews) {
            return (
                <div>
                    <h1>{book.title}</h1>
                    <div>
                        <img src={book.imageUrl} alt="book cover"/>
                    </div>
                    <h2>Reviews</h2>
                    <div>
                        {bookReviews.reviews.map((review: Review) => (
                            <div key={review.id}>{review.text}</div>
                        ))}
                    </div>
                </div>
            )
        } else {
            return <h1>Book Not Found</h1>
        }
    }

    return createBookCard();
}

export default BookPage;