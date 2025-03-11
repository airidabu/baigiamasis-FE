import axios from "axios";
import {API_URL} from "../config.ts";

export const getGenres = async () => {
    try {
        const {data} = await axios.get(`${API_URL}/genres`);
        return data;
    } catch (error) {
        console.error("Error fetching authors",error);
        return [];
    }
}

export const getGenre = async (id: string) => {
    try {
        const {data} = await axios.get(`${API_URL}/genres/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching genre",error);
        return undefined;
    }
}