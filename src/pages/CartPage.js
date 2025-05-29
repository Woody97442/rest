import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCartItem } from "@/components/Products/ProductCartItem";
import { CartService } from "@/services/cart.service";
import { useNavigate } from "react-router-dom";
export const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const loadCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await CartService.getUserCart(token);
            if (response.success) {
                setCart(response.data);
            }
        }
        catch (error) {
            console.error("Error loading cart:", error);
        }
    };
    useEffect(() => {
        loadCart();
    }, []);
    const handleDaysChange = async (index, newDays) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        if (index < 0 || index >= cart.length) {
            console.warn(`Index ${index} invalide pour cart de longueur ${cart.length}`);
            return;
        }
        const updatedCart = [...cart];
        const currentItem = updatedCart[index];
        const previousDays = currentItem.days;
        // Optimistic UI update
        updatedCart[index].days = newDays;
        setCart(updatedCart);
        try {
            const response = await CartService.updateCartItem(currentItem.product.id, newDays, token);
            if (!response.success) {
                throw new Error(response.message || "Échec de la mise à jour du panier.");
            }
            // Si la nouvelle quantité est 0 ou moins, supprimer l'élément localement
            if (newDays <= 0) {
                const updatedCart = cart.filter((_, i) => i !== index);
                setCart(updatedCart);
                return;
            }
        }
        catch (error) {
            // En cas d'erreur, revert les modifications locales
            updatedCart[index].days = previousDays;
            setCart(updatedCart);
            alert(error.message || "Erreur inconnue lors de la mise à jour du panier.");
        }
    };
    const handleCheckout = () => {
        if (cart.length === 0)
            return;
        localStorage.setItem("pendingOrder", JSON.stringify(cart));
        setCart([]);
        navigate("/ordercommande");
    };
    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.days, 0);
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-soft text-dark font-sans", children: [_jsx(Header, {}), _jsxs("main", { className: "flex-grow p-8 max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-6", children: "Votre Panier" }), cart.length === 0 ? (_jsx("div", { className: "text-center text-gray-600 py-20", children: _jsx("p", { className: "text-xl", children: "Votre panier est vide \uD83D\uDED2" }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "space-y-6", children: cart.map((item, index) => (_jsx("div", { className: "relative flex bg-white rounded-lg shadow-lg overflow-hidden", children: _jsx(ProductCartItem, { itemCart: item, handleDaysChange: handleDaysChange, index: index }) }, index))) }), _jsxs("div", { className: "mt-8 border-t pt-4 text-right", children: [_jsxs("p", { className: "text-2xl font-semibold mb-2", children: ["Total g\u00E9n\u00E9ral :", " ", _jsxs("span", { className: "text-pink-600", children: [total.toFixed(2), " \u20AC"] })] }), _jsx("button", { onClick: handleCheckout, className: "mt-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition", children: "Passer commande" })] })] }))] }), _jsx(Footer, {})] }));
};
