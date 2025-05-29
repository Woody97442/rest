import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/Types/ProductType";

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
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl">
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700 mb-2">{product.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Spécialité :</strong> {product.specialty}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Pays :</strong> {product.country}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Prix :</strong> {product.price.toFixed(2)} €
            </p>
            <p className="text-yellow-500 mb-4">{"★".repeat(product.rating)}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-pink-600 mb-1">
                  Préférences
                </h4>
                <ul className="list-disc list-inside text-gray-700">
                  {product.preferences &&
                    product.preferences.map((pref, idx) => (
                      <li key={idx}>{pref}</li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-1">
                  Ce qu'elle aime
                </h4>
                <ul className="list-disc list-inside text-gray-700">
                  {product.likes &&
                    product.likes.map((like, idx) => <li key={idx}>{like}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-1">
                  Ce qu'elle n'aime pas
                </h4>
                <ul className="list-disc list-inside text-gray-700">
                  {product.dislikes &&
                    product.dislikes.map((dislike, idx) => (
                      <li key={idx}>{dislike}</li>
                    ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
