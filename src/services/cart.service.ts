import { parseProductValue } from "@/tools/tools";
import { Cart, CartItem } from "@/Types/ProductType";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const CartService = {
    addToCart: async (userId: number, productId: number, token: string, quantity: number = 1): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await axios.post(
                apiBaseUrl + "/cart/item",
                {
                    userId,
                    productId,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }


    },

    getUserCart: async (token: string): Promise<{ success: boolean; data: CartItem[], message?: string }> => {
        try {
            const response = await axios.get(apiBaseUrl + "/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            if (response.status === 200) {

                const cart: Cart = response.data;

                const cartItems: CartItem[] = cart.items.map((item: any) => ({
                    itemId: item.id,
                    product: parseProductValue(item.product),
                    days: item.quantity,
                    unitPrice: item.unitPrice
                }));

                return { success: true, data: cartItems };
            } else {
                return { success: false, data: [], message: response.data?.message || "Erreur inconnue" };
            }
        } catch (error: any) {
            return {
                success: false,
                data: [],
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },

    updateCartItem: async (productId: number, quantity: number, token: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await axios.patch(
                apiBaseUrl + "/cart/item/update",
                {
                    productId,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },

    clearCart: async (token: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await axios.delete(apiBaseUrl + "/cart/clear", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
};
