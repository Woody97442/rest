import { parseProductValue } from "@/tools/tools";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const ProductService = {
    getAllProducts: async (token) => {
        try {
            const response = await axios.get(apiBaseUrl + "/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const rawProducts = response.data.result;
                const products = rawProducts.map((product) => {
                    return parseProductValue(product);
                });
                return products;
            }
            else {
                console.error("❌ Erreur API interne :", response.data.error);
                return [];
            }
        }
        catch (error) {
            console.error("❌ Erreur requête axios :", error);
            return [];
        }
    },
};
