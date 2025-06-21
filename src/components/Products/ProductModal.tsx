import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/Types/ProductType";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCart } from "lucide-react";
import { ParseJwt } from "@/tools/tools";
import { CartService } from "@/services/cart.service";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Utilisateur non connecté.");
        return;
      }

      const userId = ParseJwt(token).id;
      if (!userId) {
        setError("ID utilisateur non trouvé dans le token.");
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 overflow-y-auto max-h-[90vh] shadow-xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <button
              onClick={onClose}
              className="absolute cursor-pointer hover:scale-110 top-4 right-4 text-gray-600 hover:text-gray-900">
              <XMarkIcon className="w-8 h-8 text-white bg-black rounded-full shadow-md" />
            </button>

            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[200px] object-contain rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700 mb-2">{product.description}</p>
            <p className="text-yellow-500 ">{"★".repeat(product.rating)}</p>
            <p className="text-xl text-gray-500 mb-2">
              <strong>Prix :</strong> {product.price.toFixed(2)} €
            </p>
            {/* Bouton Ajouter au panier */}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              onClick={() => handleAddToCart(product.id)}
              disabled={isAdding}
              className={`cursor-pointer hover:scale-110 w-auto mx-auto flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 ${
                isAdding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-secondary text-white"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
