import axios from "axios";
import Publisher from "../types/Publisher.ts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getPublishers = async (): Promise<Publisher[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/publishers`);
        return data;
    } catch (error) {
        console.error("Error fetching publishers", error);
        return [];
    }
}

export const getPublisher = async (id: string): Promise<Publisher | undefined> => {
    try {
        const { data } = await axios.get(`${API_URL}/publishers/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching publisher", error);
        return undefined;
    }
}

export const addPublisher = async (publisher: Omit<Publisher, "_id">): Promise<Publisher | undefined> => {
    try {
        const { data } = await axios.post(`${API_URL}/publishers`, publisher);
        return data;
    } catch (error) {
        console.error("Error adding publisher", error);
        return undefined;
    }
}
