import { Category } from "@/Types/CategoryType";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_MODE === "development"
    ? "http://localhost:3000/api"
    : import.meta.env.VITE_API_BASE_URL;

export const CategoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        try {
            const response = await axios.get(apiBaseUrl + "/category/get");

            if (response.status === 200) {
                const rawCategories: Category[] = response.data.categories;
                return rawCategories;
            } else {
                console.error("❌ Erreur API interne :", response.data.error);
                return [];
            }
        } catch (error) {
            console.error("❌ Erreur requête axios :", error);
            return [];
        }
    },

    getCategoryById: async (id: number): Promise<Category | null> => {
        try {
            const response = await axios.get(apiBaseUrl + `/category/get?id=${id}`);

            if (response.status === 200) {
                return response.data.category as Category;
            } else {
                console.error("❌ Erreur API interne :", response.data.error);
                return null;
            }
        } catch (error) {
            console.error("❌ Erreur requête axios :", error);
            return null;
        }
    },

    getCategoryBySlug: async (slug: string): Promise<Category | null> => {
        try {
            const response = await axios.get(apiBaseUrl + `/category/get?slug=${slug}`);

            if (response.status === 200) {
                return response.data.category as Category;
            } else {
                console.error("❌ Erreur API interne :", response.data.error);
                return null;
            }
        } catch (error) {
            console.error("❌ Erreur requête axios :", error);
            return null;
        }
    },
};
