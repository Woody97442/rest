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
        className="w-40 m-4 h-auto object-contain"
      />

      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-primary">
            {itemCart.product.name}
          </h2>
          <button
            onClick={() => handleDaysChange(index, 0)}
            className="text-gray-400 hover:text-primary">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-1">
          {itemCart.product.shortDescription}
        </p>

        <div className="mt-3 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Quantité :</label>
            <input
              type="number"
              min={0}
              className="w-16 px-2 py-1 border rounded"
              value={itemCart.quantity}
              onChange={(e) =>
                handleDaysChange(index, parseInt(e.target.value))
              }
            />
            <span className="text-sm text-gray-700">
              à {itemCart.product.price.toFixed(2)} €/u
            </span>
          </div>
          <p className="text-primary font-bold text-lg">
            Total : {(itemCart.quantity * itemCart.product.price).toFixed(2)} €
          </p>
        </div>
      </div>
    </>
  );
};
