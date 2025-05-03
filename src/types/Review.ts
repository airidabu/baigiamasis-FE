import Book from "./Book";
import User from "./User";

interface Review {
    _id: string;
    user: User;
    book: Book;
    rating: number;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export default Review;