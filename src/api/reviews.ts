import Review from "../types/Review.ts";
import axios from "axios";
import {API_URL} from "../config.ts";

export const getReviews = async (): Promise<Review[]> => {
    try {
        const {data} = await axios.get(`${API_URL}/reviews`);
        return data;
    } catch (error) {
        console.error(error);
        return[];
    }
}

export const getReview = async (id: string): Promise<Review | undefined> => {
    try {
        const {data} = await axios.get(`${API_URL}/reviews/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getBookReviews = async (id: string) => {
    try {
        const {data} = await axios.get(`${API_URL}/books/${id}?_embed=reviews`);
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const addReview = async (newReview: Review) => {
    try {
        const {data} = await axios.post(`${API_URL}/reviews`, newReview);
        return data;
    } catch (error) {
        console.error("Error adding review",error);
    }
}

export const deleteReview = async (id: string) => {
    try {
        const {data} = await axios.delete(`${API_URL}/reviews/${id}`);
        console.log(data, "deleted successfully");
        return data;
    } catch (error) {
        console.error("Error deleting review",error);
    }
}