import axios from "axios";
import {API_URL} from "../config.ts";
import Genre from "../types/Genre";

export const getGenres = async ():Promise<Genre[]> => {
    try {
        const {data} = await axios.get(`${API_URL}/genres`);
        return data;
    } catch (error) {
        console.error("Error fetching authors",error);
        return [];
    }
}

export const getGenre = async (id: string): Promise<Genre | undefined> => {
    try {
        const {data} = await axios.get(`${API_URL}/genres/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching genre",error);
        return undefined;
    }
}

export const addGenre = async (newGenre: Genre)=> {
    try {
        const {data} = await axios.post(`${API_URL}/genres`, newGenre);
        console.log(data, "added successfully");
    } catch (error) {
        console.error("Error adding genre",error);
    }
}