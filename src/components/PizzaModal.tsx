import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { PizzaSize } from "../types";
import { pizzaFlavorCategories } from "../data/menu";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

interface PizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  size: PizzaSize;
}

const PizzaModal: React.FC<PizzaModalProps> = ({ isOpen, onClose, size }) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleFlavor = (flavor: string) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavor));
    } else if (selectedFlavors.length < size.maxFlavors) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    } else {
      toast.error(`Máximo ${size.maxFlavors} sabores para este tamaño`);
    }
  };

  const addToCart = () => {
    if (selectedFlavors.length === 0) {
      toast.error("Selecciona al menos un sabor");
      return;
    }

    const cartItem = {
      id: Date.now().toString(),
      productId: `pizza-${size.id}`,
      name: `Pizza ${size.name}`,
      price: size.price,
      quantity,
      size: size.name,
      flavors: selectedFlavors,
      category: "pizzas",
    };

    dispatch({ type: "ADD_ITEM", payload: cartItem });
    toast.success(`Pizza ${size.name} agregada al carrito`);
    onClose();
    setSelectedFlavors([]);
    setQuantity(1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Pizza {size.name}</h2>
            <p className="text-gray-600">
              {size.portions} porciones - Máximo {size.maxFlavors} sabores
            </p>
            <p className="text-primary-600 font-bold text-lg">
              {formatPrice(size.price)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Selecciona tus sabores ({selectedFlavors.length}/{size.maxFlavors}
              )
            </h3>
            <div className="space-y-6">
              {pizzaFlavorCategories.map((category) => (
                <div key={category.name} className="space-y-3">
                  <h4 className="text-lg font-bold text-primary-600 border-b border-primary-200 pb-2">
                    {category.name}
                  </h4>
                  <div className="space-y-2">
                    {category.flavors.map((flavor) => (
                      <button
                        key={flavor.name}
                        onClick={() => toggleFlavor(flavor.name)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedFlavors.includes(flavor.name)
                            ? "border-primary-500 bg-primary-50 text-primary-800"
                            : "border-gray-200 hover:border-primary-300 hover:bg-primary-25"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-lg mb-1">
                              {flavor.name}
                            </h5>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {flavor.description}
                            </p>
                          </div>
                          {selectedFlavors.includes(flavor.name) && (
                            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                              <Plus className="w-3 h-3 text-white rotate-45" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Cantidad</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <span className="text-xl">-</span>
              </button>
              <span className="text-2xl font-bold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 text-dark-950 flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Selected Flavors Summary */}
          {selectedFlavors.length > 0 && (
            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <h4 className="font-semibold mb-2">Sabores seleccionados:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedFlavors.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-3 py-1 bg-primary-500 text-dark-950 rounded-full text-sm font-medium"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-primary-600">
                {formatPrice(size.price * quantity)}
              </span>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
