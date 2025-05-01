import Author from "./Author";
import Genre from "./Genre";
import Publisher from "./Publisher";
import Status from "./Status";

interface Book {
    _id?: string;
    name: string;
    author: Author;
    imageUrl?: string;
    description?: string;
    releaseDate: string;
    publisher: Publisher;
    genres: Genre[];
    pageNumber: number;
    status: Status;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export default Book;