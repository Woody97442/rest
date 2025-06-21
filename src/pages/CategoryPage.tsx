// src/pages/CategoryPage.tsx
import { ProductCategory } from "@/components/Products/ProductCategory";
import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product.service";
import { Category } from "@/Types/CategoryType";
import { Product } from "@/Types/ProductType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>();
  const { slug } = useParams<{ slug: string }>();

  const LoadCategories = async () => {
    try {
      const res = await CategoryService.getCategoryBySlug(slug || "");
      if (res) setCategory(res);
    } catch (err: any) {
      console.error(err);
    }
  };

  const LoadProducts = async (categoryId: number) => {
    try {
      const res = await ProductService.getProducts({ categoryId });
      if (res) setProducts(res as Product[]);
    } catch (err: any) {
      console.error(err);
    }
  };

  // 1. Charger la catégorie au montage ou quand slug change
  useEffect(() => {
    if (slug) LoadCategories();
  }, [slug]);

  // 2. Charger les produits uniquement quand la catégorie est chargée
  useEffect(() => {
    if (category?.id) {
      LoadProducts(category.id);
    }
  }, [category]);

  if (!category) {
    return <p className="text-center text-red-500">Catégorie introuvable.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-white py-8 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 rounded-lg">
        {category.name}
      </h1>

      <div className="max-w-3xl mx-auto mt-6">
        <img
          src={category.image}
          alt={category.name}
          className="rounded-xl w-full h-64 object-cover mb-4"
        />
      </div>
      <ProductCategory products={products} />
    </div>
  );
};

export default CategoryPage;
