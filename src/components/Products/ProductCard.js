import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion"; // Importer motion de Framer Motion
import { ShoppingCart } from "lucide-react";
import { CartService } from "@/services/cart.service";
import { ParseJwt } from "@/tools/tools";
export const ProductCard = ({ product, onClick, }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Utilisateur non connecté.");
                return;
            }
            const userId = ParseJwt(token).id;
            if (!userId) {
                console.warn("ID utilisateur non trouvé dans le token.");
                return;
            }
            setIsAdding(true);
            const res = await CartService.addToCart(userId, productId, token);
            if (res.success) {
                setAddedToCart(true);
                setTimeout(() => {
                    setAddedToCart(false);
                    setIsAdding(false);
                }, 2000);
            }
            else {
                console.error("❌ Échec ajout panier :", res.message);
                setIsAdding(false);
            }
        }
        catch (err) {
            console.error("❌ Erreur lors de l'ajout au panier :", err);
        }
    };
    return (_jsxs(motion.div, { className: "cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsx("img", { src: product.images[0], alt: product.name, onClick: onClick, className: "w-full h-auto object-cover rounded-t-lg" }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: product.name }), _jsx("p", { className: "text-sm text-gray-600", children: product.shortDescription }), _jsxs("div", { className: "flex items-center justify-between mt-2", children: [_jsxs("span", { className: "text-pink-600 font-bold", children: [product.price.toFixed(2), " \u20AC /jour"] }), _jsx("span", { className: "text-yellow-500", children: "★".repeat(product.rating) })] }), _jsx("p", { className: "text-xs text-gray-400 my-2", children: product.country }), _jsx("button", { onClick: () => handleAddToCart(product.id), disabled: isAdding, className: `mt-4 w-full flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 ${isAdding
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-pink-600 hover:bg-pink-700 text-white"}`, children: addedToCart ? (_jsx(_Fragment, { children: "En cours..." })) : (_jsxs(_Fragment, { children: [_jsx(ShoppingCart, { className: "w-4 h-4" }), "Ajouter au panier"] })) })] })] }));
};
