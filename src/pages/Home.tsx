import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { ProductList } from "@/components/Products/ProductList";

export const Home = () => {
  return (
    <div className="bg-soft min-h-screen text-dark font-sans">
      <Hero />
      <CategoryCard />
      <ProductList />
    </div>
  );
};
