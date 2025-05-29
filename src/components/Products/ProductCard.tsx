import { Product } from "@/Types/ProductType";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Importer motion de Framer Motion
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { CartService } from "@/services/cart.service";
import { ParseJwt } from "@/tools/tools";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Utilisateur non connecté.");
        return;
      }

      const userId = ParseJwt(token).id;
      if (!userId) {
        console.warn("ID utilisateur non trouvé dans le token.");
        return;
      }
      setIsAdding(true);
      const res = await CartService.addToCart(userId, productId, token);

      if (res.success) {
        setAddedToCart(true);
        setTimeout(() => {
          setAddedToCart(false);
          setIsAdding(false);
        }, 2000);
      } else {
        console.error("❌ Échec ajout panier :", res.message);
        setIsAdding(false);
      }
    } catch (err) {
      console.error("❌ Erreur lors de l'ajout au panier :", err);
    }
  };

  return (
    <motion.div
      className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
      initial={{ opacity: 0, y: 20 }} // Initialement invisible et légèrement décalé
      animate={{ opacity: 1, y: 0 }} // Devient visible et se replace à sa position
      transition={{ duration: 0.5 }} // Durée de l'animation
    >
      <img
        src={product.images[0]}
        alt={product.name}
        onClick={onClick}
        className="w-full h-auto object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.shortDescription}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-pink-600 font-bold">
            {product.price.toFixed(2)} € /jour
          </span>
          <span className="text-yellow-500">{"★".repeat(product.rating)}</span>
        </div>

        <p className="text-xs text-gray-400 my-2">{product.country}</p>

        {/* Bouton Ajouter au panier */}
        <button
          onClick={() => handleAddToCart(product.id)}
          disabled={isAdding}
          className={`mt-4 w-full flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 ${
            isAdding
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}>
          {addedToCart ? (
            <>En cours...</>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Ajouter au panier
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
