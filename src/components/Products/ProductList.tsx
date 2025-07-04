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
      const res = await ProductService.getProducts({ minRating: 4 });

      if (res) setProducts(res as Product[]);
    } catch (err: any) {}
  };

  useEffect(() => {
    LoadProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-white py-10 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300">
        Nos produits les plus populaires
      </h1>
      <div className="p-8 flex justify-center">
        <div className="w-full max-w-6xl">
          {" "}
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
    </div>
  );
};
