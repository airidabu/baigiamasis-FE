import Review from "../types/Review.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getReviews = async (): Promise<Review[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/reviews`);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getReview = async (id: string): Promise<Review | undefined> => {
    try {
        const { data } = await axios.get(`${API_URL}/reviews/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getBookReviews = async (id: string): Promise<Review[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/reviews?bookId=${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const addReview = async (newReview: Review): Promise<Review> => {
    try {
        const { data } = await axios.post(`${API_URL}/reviews`, newReview);
        return data;
    } catch (error) {
        console.error("Error adding review", error);
        throw error;
    }
}

export const deleteReview = async (id: string) => {
    try {
        const { data } = await axios.delete(`${API_URL}/reviews/${id}`);
        console.log(data, "deleted successfully");
        return data;
    } catch (error) {
        console.error("Error deleting review", error);
        throw error;
    }
}