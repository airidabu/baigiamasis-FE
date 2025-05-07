import axios from "axios";
import User from "../types/User";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getUsers = async (): Promise<User[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/users`);
        return data;
    } catch (error) {
        console.error("Error fetching users", error);
        return [];
    }
}

export const getUser = async (id: string): Promise<User | undefined> => {
    try {
        const { data } = await axios.get(`${API_URL}/users/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching user", error);
        return undefined;
    }
}

export interface UpdateUserData {
    name?: string;
    surname?: string;
    email?: string;
    birthday?: Date | null;
    password?: string;
    currentPassword?: string;
}

export const updateUser = async (id: string, userData: UpdateUserData): Promise<User | undefined> => {
    try {
        const { data } = await axios.put(`${API_URL}/users/update/${id}`, userData);
        return data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}