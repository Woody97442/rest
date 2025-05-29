import { parseProductValue } from "@/tools/tools";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const CartService = {
    addToCart: async (userId, productId, token, quantity = 1) => {
        try {
            const response = await axios.post(apiBaseUrl + "/cart/item", {
                userId,
                productId,
                quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return { success: true };
            }
            else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
    getUserCart: async (token) => {
        try {
            const response = await axios.get(apiBaseUrl + "/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const cart = response.data;
                const cartItems = cart.items.map((item) => ({
                    itemId: item.id,
                    product: parseProductValue(item.product),
                    days: item.quantity,
                    unitPrice: item.unitPrice
                }));
                return { success: true, data: cartItems };
            }
            else {
                return { success: false, data: [], message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                data: [],
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
    updateCartItem: async (productId, quantity, token) => {
        try {
            const response = await axios.patch(apiBaseUrl + "/cart/item/update", {
                productId,
                quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return { success: true };
            }
            else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
    clearCart: async (token) => {
        try {
            const response = await axios.delete(apiBaseUrl + "/cart/clear", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return { success: true };
            }
            else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
};
