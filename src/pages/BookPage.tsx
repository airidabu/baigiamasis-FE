import {useParams} from "react-router";
import {useEffect, useState} from "react";
import Book from "../types/Book.ts";
import {getBook} from "../api/books.ts";
import {getBookReviews} from "../api/reviews.ts";
import Review from "../types/Review.ts";
import {ReviewsProvider} from "../contexts/ReviewsContext.tsx";
import ReviewsContent from "../components/ReviewsContent.tsx";

interface bookWithReviews extends Book {
    reviews: Review[];
}

const BookPage: React.FC = () => {
    const {id} = useParams<{id: string}>();
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
                    <ReviewsProvider>
                        <ReviewsContent
                            bookId={book.id ?? ""}
                        />
                    </ReviewsProvider>
                </div>
            )
        } else {
            return <h1>Book Not Found</h1>
        }
    }

    return createBookCard();
}

export default BookPage;