import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { Product } from "@/Types/ProductType";

export const ProductCategory = ({ products }: { products: Product[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div>
      <div className="p-8 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.name}
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
