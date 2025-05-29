import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Auth } from "@/components/Users/Auth";
export const Header = () => {
    return (_jsxs("header", { className: "relative z-50 bg-dark backdrop-blur-md text-white px-6 py-4 flex items-center justify-between shadow-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Link, { to: "/", className: "text-3xl font-bold text-primary", children: "Rest" }), _jsx(Link, { to: "/discount", title: "Promo", children: _jsx("span", { className: "text-accent font-medium hidden sm:inline", children: "\uD83D\uDD25 Les Bon Plan" }) })] }), _jsx(Auth, {})] }));
};
