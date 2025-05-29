import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductList } from "@/components/Products/ProductList";
export const Home = () => {
    return (_jsxs("div", { className: "bg-soft min-h-screen text-dark font-sans", children: [_jsx(Header, {}), _jsx(Hero, {}), _jsx(ProductList, {}), _jsx(Footer, {})] }));
};
