import axios from "axios";
import Book from "../types/Book.ts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAuthorBooks = async (authorId: string): Promise<Book[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/books/?authorId=${authorId}`);
        return data;
    } catch (error) {
        console.error("Error fetching author " + authorId + " books", error);
        return [];
    }
}

export const getBooks = async (): Promise<Book[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/books`);
        return data;
    } catch (error) {
        console.error("Error fetching books", error);
        return [];
    }
}

export const getBook = async (id: string): Promise<Book | undefined> => {
    try {
        const { data } = await axios.get(`${API_URL}/books/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching book", error);
        return undefined;
    }
}

export const addBook = async (newBook: Book) => {
    try {
        const { data } = await axios.post(`${API_URL}/books`, newBook);
        console.log(data, "added successfully");
        return data;
    } catch (error) {
        console.error("Error adding book", error);
    }
}

export const deleteBook = async (id: string): Promise<void> => {
    try {
        const { data } = await axios.delete(`${API_URL}/books/${id}`);
        console.log(data, "deleted successfully");
        return data;
    } catch (error) {
        console.error("Error deleting book", error);
    }
}

export const updateBook = async (id: string, updatedBook: Partial<Book>): Promise<Book | undefined> => {
    try {
        const { data } = await axios.put(`${API_URL}/books/${id}`, updatedBook);
        console.log(data, "updated successfully");
        return data;
    } catch (error) {
        console.error("Error updating book", error);
        return undefined;
    }
};