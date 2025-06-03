import axios from "axios";
import { Products } from "@/types/types";

export const fetchProducts = async (): Promise<Products[]> => {
    try {
        const response = await axios.get<Products[]>('https://server-zzcb.onrender.com/get-orders');
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};