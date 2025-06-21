import { useEffect, useState } from "react";
import { Auth } from "./Users/Auth";
import { useRedirect } from "@/context/RedirectContext";
import { CategoryService } from "@/services/category.service";
import { Category } from "@/Types/CategoryType";

export const Header = () => {
  const { redirectTo } = useRedirect();
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

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
    <header className="relative z-50 bg-dark backdrop-blur-md text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center ">
        <button
          onClick={() => redirectTo("/")}
          className="hover:scale-110 cursor-pointer flex items-center mx-4">
          <div className="flex items-center space-y-2 flex-col">
            <span className="text-3xl font-bold text-primary">Rest</span>
          </div>
        </button>
        {/* Bouton Nos Produits */}
        <div className="relative">
          <button
            onClick={() => setShowCategories((prev) => !prev)}
            className="cursor-pointer hover:scale-105 px-3 py-1 rounded-md bg-primary hover:bg-primary-dark transition"
            aria-expanded={showCategories}
            aria-controls="categories-dropdown">
            Nos Produits
          </button>

          {showCategories && (
            <div
              id="categories-dropdown"
              className="absolute left-0 mt-2 w-48 bg-dark border border-gray-700 rounded-md shadow-lg text-white"
              role="menu"
              aria-label="Liste des catégories">
              <ul>
                {categories.length === 0 && (
                  <li className="px-4 py-2 text-sm">Chargement...</li>
                )}
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="px-4 py-2 hover:bg-primary cursor-pointer"
                    onClick={() => {
                      setShowCategories(false);
                      redirectTo(`/products/category/${cat.slug}`); // adapte l'URL selon routing
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setShowCategories(false);
                        redirectTo(`/products/category/${cat.slug}`);
                      }
                    }}>
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex items-center z-10">
        <Auth />
      </div>
    </header>
  );
};
