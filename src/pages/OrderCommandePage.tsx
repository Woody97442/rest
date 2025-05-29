import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartItem } from "@/Types/ProductType";

export const OrderCommandePage = () => {
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = localStorage.getItem("pendingOrder");
    if (orderData) {
      setOrderItems(JSON.parse(orderData));
    }
  }, []);

  const total = orderItems.reduce(
    (sum, item) => sum + item.unitPrice * item.days,
    0
  );

  const handleValidatePayment = () => {
    // Ici tu peux ajouter une logique de création de commande via API
    localStorage.removeItem("pendingOrder");
    navigate("/ordervalidee");
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft text-dark font-sans">
      <Header />

      <main className="flex-grow p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Récapitulatif de votre commande
        </h1>

        {orderItems.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            <p className="text-xl">Aucune commande en attente.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.days} jour(s) × {item.unitPrice.toFixed(2)} €
                    </p>
                  </div>
                  <div className="text-right font-medium text-pink-600">
                    {(item.unitPrice * item.days).toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-4 text-right">
              <p className="text-2xl font-semibold mb-2">
                Total à régler :{" "}
                <span className="text-pink-600">{total.toFixed(2)} €</span>
              </p>

              <button
                onClick={handleValidatePayment}
                className="mt-4 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition">
                Valider le paiement
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};
