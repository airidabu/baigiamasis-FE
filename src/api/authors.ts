import Author from "../models/Author.ts";
import axios from "axios";
import {API_URL} from "../config.ts";

export const getAuthors = async (): Promise<Author[]> => {
    try {
        const {data} = await axios.get(`${API_URL}/authors`);
        return data;
    } catch (error) {
        console.error("Error fetching authors", error);
        return [];
    }
}

export const getAuthor = async (id: string): Promise<Author | undefined> => {
    try {
        const {data} = await axios.get(`${API_URL}/authors/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching author", error);
        return undefined;
    }
}