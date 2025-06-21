import { useRedirect } from "@/context/RedirectContext";
import { CategoryService } from "@/services/category.service";
import { Category } from "@/Types/CategoryType";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CategoryCard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { redirectTo } = useRedirect();
  const LoadCategories = async () => {
    try {
      const res = await CategoryService.getAllCategories();
      if (res) setCategories(res);
    } catch (err: any) {}
  };

  useEffect(() => {
    LoadCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6 max-w-6xl mx-8 md:mx-auto">
      {categories.map((category) => (
        <motion.div
          onClick={() => redirectTo(`/products/category/` + category.slug)}
          className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={category.id}>
          <img
            src={category.image || ""}
            alt={category.name}
            className="w-full h-[180px] object-cover rounded-t-xl"
          />
          <div className="p-4">
            <h3 className="item-center flex justify-center text-xl font-bold text-gray-800">
              {category.name}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
