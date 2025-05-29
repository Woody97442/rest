import { Link } from "react-router-dom";
import { Auth } from "@/components/Users/Auth";

export const Header = () => {
  return (
    <header className="relative z-50 bg-dark backdrop-blur-md text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-3xl font-bold text-primary">
          Rest
        </Link>
        <Link
          to="/discount"
          title="Promo">
          <span className="text-accent font-medium hidden sm:inline">
            🔥 Les Bon Plan
          </span>
        </Link>
      </div>
      <Auth />
    </header>
  );
};
