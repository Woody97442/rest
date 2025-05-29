// ValideOrderPage.tsx
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartService } from "@/services/cart.service";
import { useEffect } from "react";

export const ValideOrderPage = () => {
  const clear = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await CartService.clearCart(token);

      if (!response.success) {
        throw new Error(
          response.message || "Échec de la mise à jour du panier."
        );
      }
    } catch (error: any) {
      alert(
        error.message || "Erreur inconnue lors de la mise à jour du panier."
      );
    }
  };

  useEffect(() => {
    clear();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-soft text-dark font-sans">
      <Header />

      <main className="flex-grow p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          Merci pour votre commande 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Votre commande a bien été enregistrée. Vous recevrez une confirmation
          par email.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition">
          Retour à l'accueil
        </a>
      </main>

      <Footer />
    </div>
  );
};
