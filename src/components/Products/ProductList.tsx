import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { Product } from "@/Types/ProductType";
import { ProductService } from "@/services/product.service";

export const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const LoadProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await ProductService.getAllProducts(token || "");

      if (res) setProducts(res);
    } catch (err: any) {}
  };

  useEffect(() => {
    LoadProducts();
  }, []);

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        {" "}
        {/* Centrer la grille avec max-w-4xl */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Nos compagnies pour vous
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.name} // ou une autre clé unique
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={true}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};
