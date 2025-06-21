import { parseProductValue } from "@/tools/tools";
import { Product } from "@/Types/ProductType";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_MODE === "development"
    ? "http://localhost:3000/api"
    : import.meta.env.VITE_API_BASE_URL;

/**
 * GET /api/products/get
 * exemple de corps de requête :
    /api/products/get → tous les produits
    /api/products/get?id=1 → produit par ID
    /api/products/get?reference=PROD-001-XXX → produit par référence
    /api/products/get?category=3 → produits d’une catégorie
 * exemple d'utilisation :
    const allProducts = await ProductService.getProducts();
    const byId = await ProductService.getProducts( { id: 2 });
    const byRef = await ProductService.getProducts( { reference: "PROD-001-XXX" });
    const byCategory = await ProductService.getProducts( { categoryId: 3 });
*/

export const ProductService = {
    getProducts: async (
        options?: {
            id?: number;
            reference?: string;
            categoryId?: number;
            minRating?: number;
        }
    ): Promise<Product[] | Product | null> => {
        try {
            // Construction dynamique de l'URL avec les query params
            const params = new URLSearchParams();
            if (options?.id) params.append("id", String(options.id));
            if (options?.reference) params.append("reference", options.reference);
            if (options?.categoryId) params.append("categoryId", String(options.categoryId));
            if (options?.minRating) params.append("minRating", String(options.minRating));

            const url = `${apiBaseUrl}/products/get${params.toString() ? `?${params.toString()}` : ""}`;

            const response = await axios.get(url);

            if (response.status === 200) {
                const result = response.data.products;

                // Si on a un produit unique (par ID ou reference)
                if (options?.id || options?.reference) {
                    return parseProductValue(result as Product);
                }

                // Si on a plusieurs produits (all / par category)
                const products: Product[] = result.map((product: any) => parseProductValue(product));
                return products;
            } else {
                console.error("❌ Erreur API :", response.data.error);
                return null;
            }
        } catch (error) {
            console.error("❌ Erreur Axios :", error);
            return null;
        }
    },

};
