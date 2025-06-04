import { parseProductValue } from "@/tools/tools";
import { Product } from "@/Types/ProductType";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_MODE === "development"
    ? "http://localhost:3000/api"
    : import.meta.env.VITE_API_BASE_URL;

export const ProductService = {
    getAllProducts: async (token: string): Promise<Product[]> => {
        try {
            const response = await axios.get(apiBaseUrl + "/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });



            if (response.status === 200) {
                const rawProducts = response.data.result;

                const products: Product[] = rawProducts.map((product: any) => {
                    return parseProductValue(product);
                });

                return products;
            } else {
                console.error("❌ Erreur API interne :", response.data.error);
                return [];
            }
        } catch (error) {
            console.error("❌ Erreur requête axios :", error);
            return [];
        }
    },


};
