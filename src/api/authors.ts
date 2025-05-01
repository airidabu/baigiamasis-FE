import Author from "../types/Author.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAuthors = async (): Promise<Author[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/authors`);
        return data;
    } catch (error) {
        console.error("Error fetching authors", error);
        return [];
    }
}

export const getAuthor = async (id: string): Promise<Author | undefined> => {
    try {
        const { data } = await axios.get(`${API_URL}/authors/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching author", error);
        return undefined;
    }
}

export const addAuthor = async (newAuthor: Author) => {
    try {
        const { data } = await axios.post(`${API_URL}/authors`, newAuthor);
        console.log(data, "added successfully");
        return data;
    } catch (error) {
        console.error("Error adding author", error);
        return undefined;
    }
}

export const deleteAuthor = async (id: string): Promise<void> => {
    try {
        const { data } = await axios.delete(`${API_URL}/authors/${id}`);
        console.log(data, "deleted successfully");
        return data;
    } catch (error) {
        console.error("Error deleting author", error);
    }
}

export const updateAuthor = async (editedAuthor: Author) => {
    try {
        const { data } = await axios.put(`${API_URL}/authors/${editedAuthor._id}`, editedAuthor);
        console.log(data, "added successfully");
        return data;
    } catch (error) {
        console.error("Error adding author", error);
        return undefined;
    }
}