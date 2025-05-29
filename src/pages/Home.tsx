import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductList } from "@/components/Products/ProductList";

export const Home = () => {
  return (
    <div className="bg-soft min-h-screen text-dark font-sans">
      <Header />
      <Hero />
      <ProductList />
      <Footer />
    </div>
  );
};
