import { useEffect, useState } from "react";
import { ProductCartItem } from "@/components/Products/ProductCartItem";
import { CartService } from "@/services/cart.service";
import { CartItem } from "@/Types/ProductType";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const loadCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await CartService.getUserCart(token);

      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleDaysChange = async (index: number, newQuantity: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    if (index < 0 || index >= cart.length) {
      console.warn(
        `Index ${index} invalide pour cart de longueur ${cart.length}`
      );
      return;
    }

    const updatedCart = [...cart];
    const currentItem = updatedCart[index];

    const previousDays = currentItem.quantity;

    // Optimistic UI update
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    try {
      const response = await CartService.updateCartItem(
        currentItem.product.id,
        newQuantity,
        token
      );

      if (!response.success) {
        throw new Error(
          response.message || "Échec de la mise à jour du panier."
        );
      }

      // Si la nouvelle quantité est 0 ou moins, supprimer l'élément localement
      if (newQuantity <= 0) {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        return;
      }
    } catch (error: any) {
      // En cas d'erreur, revert les modifications locales
      updatedCart[index].quantity = previousDays;
      setCart(updatedCart);
      alert(
        error.message || "Erreur inconnue lors de la mise à jour du panier."
      );
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    localStorage.setItem("pendingOrder", JSON.stringify(cart));
    setCart([]);
    navigate("/ordercommande");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-soft text-dark font-sans">
      <main className="flex-grow p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Votre Panier</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            <p className="text-xl">Votre panier est vide 🛒</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="relative flex bg-white rounded-lg shadow-lg overflow-hidden">
                  <ProductCartItem
                    itemCart={item}
                    handleDaysChange={handleDaysChange}
                    index={index}
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-4 text-right">
              <p className="text-2xl font-semibold mb-2">
                Total général :{" "}
                <span className="text-primary">{total.toFixed(2)} €</span>
              </p>
              <button
                onClick={handleCheckout}
                className="mt-2 px-6 py-3 cursor-pointer bg-primary hover:bg-secondary text-white rounded-md transition">
                Passer commande
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
