import axios from "axios";
import { Operators } from "@/types/types";

export const fetchOperators = async (): Promise<Operators[]> => {
    try {
        const response = await axios.get<Operators[]>('https://server-zzcb.onrender.com/get-operators');
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchColor = async (username: string) => {
    try {
        const response = await axios.get(`https://server-zzcb.onrender.com/get-operator-color`, {
            params: { username }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching operator color:", error);
        throw error;
    }
};

export const deleteOperator = async (username: string) => {
    try {
        const response = await axios.delete(`https://server-zzcb.onrender.com/delete-user/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting operator:", error);
        throw error;
    }
};