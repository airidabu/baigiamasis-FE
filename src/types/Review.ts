import Book from "./Book";
import User from "./User";

interface Review {
    _id?: string;
    user?: User | string;
    book?: Book | string;
    rating: number;
    comment: string;
    nickname?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export default Review;