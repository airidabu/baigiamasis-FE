import axios from "axios";
import Publisher from "../types/Publisher";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getPublishers = async (): Promise<Publisher[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/publishers`);
        return data;
    } catch (error) {
        console.error("Error fetching publishers", error);
        return [];
    }
};

export const getPublisher = async (id: string): Promise<Publisher | undefined> => {
    try {
        const { data } = await axios.get(`${API_URL}/publishers/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching publisher", error);
        return undefined;
    }
};

export const addPublisher = async (
    newPublisher: Omit<Publisher, "_id" | "createdAt" | "updatedAt" | "__v">
): Promise<Publisher | undefined> => {
    try {
        const { data } = await axios.post(`${API_URL}/publishers`, newPublisher);
        return data;
    } catch (error) {
        console.error("Error adding publisher", error);
        throw error;
    }
};

export const updatePublisher = async (
    id: string,
    updatedPublisher: Partial<Publisher>
): Promise<Publisher | undefined> => {
    try {
        const { data } = await axios.put(`${API_URL}/publishers/${id}`, updatedPublisher);
        return data;
    } catch (error) {
        console.error("Error updating publisher", error);
        throw error;
    }
};

export const deletePublisher = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/publishers/${id}`);
    } catch (error) {
        console.error("Error deleting publisher", error);
        throw error;
    }
};
