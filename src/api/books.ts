import axios from "axios";
import {API_URL} from "../config.ts";
import Book from "../types/Book.ts";

export const getAuthorBooks = async (authorId: string): Promise<Book[]> => {
    try {
        const {data} = await axios.get(`${API_URL}/books/?authorId=${authorId}`);
        return data;
    } catch (error) {
        console.error("Error fetching author " + authorId + " books", error);
        return [];
    }
}

export const getBooks = async (): Promise<Book[]> => {
    try {
        const {data} = await axios.get(`${API_URL}/books`);
        return data;
    } catch (error) {
        console.error("Error fetching books",error);
        return [];
    }
}

export const getBook = async (id: string): Promise<Book | undefined> => {
    try {
        const {data} = await axios.get(`${API_URL}/books/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching book",error);
        return undefined;
    }
}