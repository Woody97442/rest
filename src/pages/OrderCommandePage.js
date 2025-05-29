import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const OrderCommandePage = () => {
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const orderData = localStorage.getItem("pendingOrder");
        if (orderData) {
            setOrderItems(JSON.parse(orderData));
        }
    }, []);
    const total = orderItems.reduce((sum, item) => sum + item.unitPrice * item.days, 0);
    const handleValidatePayment = () => {
        // Ici tu peux ajouter une logique de création de commande via API
        localStorage.removeItem("pendingOrder");
        navigate("/ordervalidee");
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-soft text-dark font-sans", children: [_jsx(Header, {}), _jsxs("main", { className: "flex-grow p-8 max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-6", children: "R\u00E9capitulatif de votre commande" }), orderItems.length === 0 ? (_jsx("div", { className: "text-center text-gray-600 py-20", children: _jsx("p", { className: "text-xl", children: "Aucune commande en attente." }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "space-y-4", children: orderItems.map((item, index) => (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: item.product.name }), _jsxs("p", { className: "text-sm text-gray-500", children: [item.days, " jour(s) \u00D7 ", item.unitPrice.toFixed(2), " \u20AC"] })] }), _jsxs("div", { className: "text-right font-medium text-pink-600", children: [(item.unitPrice * item.days).toFixed(2), " \u20AC"] })] }, index))) }), _jsxs("div", { className: "mt-8 border-t pt-4 text-right", children: [_jsxs("p", { className: "text-2xl font-semibold mb-2", children: ["Total \u00E0 r\u00E9gler :", " ", _jsxs("span", { className: "text-pink-600", children: [total.toFixed(2), " \u20AC"] })] }), _jsx("button", { onClick: handleValidatePayment, className: "mt-4 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition", children: "Valider le paiement" })] })] }))] }), _jsx(Footer, {})] }));
};
