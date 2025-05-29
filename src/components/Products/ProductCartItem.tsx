import { CartItem } from "@/Types/ProductType";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const ProductCartItem = ({
  itemCart,
  handleDaysChange,
  index,
}: {
  itemCart: CartItem;
  handleDaysChange: (index: number, newDays: number) => void;
  index: number;
}) => {
  return (
    <>
      <img
        src={itemCart.product.images[0]}
        alt={itemCart.product.name}
        className="w-32 h-auto object-cover"
      />

      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-pink-700">
            {itemCart.product.name}
          </h2>
          <button
            onClick={() => handleDaysChange(index, 0)}
            className="text-gray-400 hover:text-red-500">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-1">
          {itemCart.product.shortDescription}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold">Spécialité :</span>{" "}
          {itemCart.product.specialty}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold">Préférences :</span>{" "}
          {itemCart.product.preferences &&
            itemCart.product.preferences.join(", ")}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold">Ce qu'elle aime :</span>{" "}
          {itemCart.product.likes && itemCart.product.likes.join(", ")}
        </p>

        <div className="mt-3 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Jours :</label>
            <input
              type="number"
              min={0}
              className="w-16 px-2 py-1 border rounded"
              value={itemCart.days}
              onChange={(e) =>
                handleDaysChange(index, parseInt(e.target.value))
              }
            />
            <span className="text-sm text-gray-700">
              à {itemCart.product.price.toFixed(2)} €/jour
            </span>
          </div>
          <p className="text-pink-600 font-bold text-lg">
            Total : {(itemCart.days * itemCart.product.price).toFixed(2)} €
          </p>
        </div>
      </div>
    </>
  );
};
