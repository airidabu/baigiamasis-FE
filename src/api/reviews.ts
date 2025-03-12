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