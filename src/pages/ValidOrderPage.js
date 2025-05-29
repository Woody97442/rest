import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ValideOrderPage.tsx
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartService } from "@/services/cart.service";
import { useEffect } from "react";
export const ValideOrderPage = () => {
    const clear = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            const response = await CartService.clearCart(token);
            if (!response.success) {
                throw new Error(response.message || "Échec de la mise à jour du panier.");
            }
        }
        catch (error) {
            alert(error.message || "Erreur inconnue lors de la mise à jour du panier.");
        }
    };
    useEffect(() => {
        clear();
    }, []);
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-soft text-dark font-sans", children: [_jsx(Header, {}), _jsxs("main", { className: "flex-grow p-8 max-w-2xl mx-auto text-center", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Merci pour votre commande \uD83C\uDF89" }), _jsx("p", { className: "text-lg text-gray-700 mb-8", children: "Votre commande a bien \u00E9t\u00E9 enregistr\u00E9e. Vous recevrez une confirmation par email." }), _jsx("a", { href: "/", className: "inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition", children: "Retour \u00E0 l'accueil" })] }), _jsx(Footer, {})] }));
};
