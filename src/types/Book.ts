import Author from "./Author";
import Genre from "./Genre";
import Publisher from "./Publisher";
import BookStatus from "./BookStatus";

interface Book {
    _id: string;
    name: string;
    author?: Author;
    publisher?: Publisher;
    genres?: Genre[];
    pageNumber?: number;
    status?: BookStatus;
    pictureUrl?: string;
    releaseDate?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    description?: string;
}

export default Book;