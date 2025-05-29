import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { ProductService } from "@/services/product.service";
export const ProductList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const LoadProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await ProductService.getAllProducts(token || "");
            if (res)
                setProducts(res);
        }
        catch (err) { }
    };
    useEffect(() => {
        LoadProducts();
    }, []);
    return (_jsx("div", { className: "p-8 flex justify-center", children: _jsxs("div", { className: "w-full max-w-6xl", children: [" ", _jsx("h1", { className: "text-3xl font-bold text-center text-gray-800 mb-10", children: "Nos compagnies pour vous" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8", children: products.map((product) => (_jsx(ProductCard, { product: product, onClick: () => setSelectedProduct(product) }, product.name))) }), selectedProduct && (_jsx(ProductModal, { product: selectedProduct, isOpen: true, onClose: () => setSelectedProduct(null) }))] }) }));
};
