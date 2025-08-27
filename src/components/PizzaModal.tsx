import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, Plus } from "lucide-react";
import { PizzaSize } from "../types";
import { pizzaFlavorCategories } from "../data/menu";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import ImageModal from "./ImageModal";

interface PizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  size: PizzaSize;
}

const PizzaModal: React.FC<PizzaModalProps> = ({ isOpen, onClose, size }) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);
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

  const openImageModal = (imageUrl: string, alt: string) => {
    setSelectedImage({ url: imageUrl, alt });
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
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
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header - Fixed */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          {/* Pizza info */}
          <div className="flex items-center justify-between p-3">
            <div>
              <h2 className="text-lg font-bold">Pizza {size.name}</h2>
              <p className="text-gray-600 text-xs">
                {size.portions} porciones - Máximo {size.maxFlavors} sabores
              </p>
              <p className="text-primary-600 font-bold text-sm">
                {formatPrice(size.price)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Flavor selection info - Fixed */}
          <div className="px-3 pb-2 pt-1 bg-white bg-gradient-to-b from-white to-gray-50">
            <h3 className="text-sm font-semibold">
              Selecciona tus sabores ({selectedFlavors.length}/{size.maxFlavors}
              )
            </h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-3 overflow-y-auto">
          <div>
            <div className="space-y-3">
              {pizzaFlavorCategories.map((category) => (
                <div key={category.name} className="space-y-1.5">
                  <h4 className="text-sm font-bold text-primary-600 border-b border-primary-200 pb-0.5">
                    {category.name}
                  </h4>
                  <div className="space-y-1.5">
                    {category.flavors.map((flavor) => (
                      <button
                        key={flavor.name}
                        onClick={() => toggleFlavor(flavor.name)}
                        className={`w-full p-2 rounded-lg border text-left transition-all ${
                          selectedFlavors.includes(flavor.name)
                            ? "border-primary-500 bg-primary-50 text-primary-800"
                            : "border-gray-200 hover:border-primary-300 hover:bg-primary-25"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          {flavor.imageUrl && (
                            <button
                              type="button"
                              className="w-14 h-14 overflow-hidden rounded-lg cursor-pointer mr-2 flex-shrink-0 border-0 p-0"
                              onClick={(e) => {
                                // Muy importante: detener la propagación y prevenir el comportamiento predeterminado
                                e.stopPropagation();
                                e.preventDefault();
                                openImageModal(flavor.imageUrl!, flavor.name);
                                return false; // Evitar cualquier propagación adicional
                              }}
                            >
                              <img
                                src={flavor.imageUrl}
                                alt={flavor.name}
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                              />
                            </button>
                          )}
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm mb-0.5">
                              {flavor.name}
                            </h5>
                            <p className="text-xs text-gray-600 leading-tight">
                              {flavor.description}
                            </p>
                          </div>
                          {selectedFlavors.includes(flavor.name) && (
                            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
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
          <div className="mb-3">
            <label className="block text-xs font-semibold mb-1">Cantidad</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <span className="text-sm">-</span>
              </button>
              <span className="text-base font-bold w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 rounded-full bg-primary-500 hover:bg-primary-600 text-dark-950 flex items-center justify-center transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Selected Flavors Summary */}
          {selectedFlavors.length > 0 && (
            <div className="mb-3 p-2 bg-primary-50 rounded-lg">
              <h4 className="font-semibold mb-1 text-xs">
                Sabores seleccionados:
              </h4>
              <div className="flex flex-wrap gap-1">
                {selectedFlavors.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-1.5 py-0.5 bg-primary-500 text-dark-950 rounded-full text-xs font-medium"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold">Total:</span>
              <span className="text-base font-bold text-primary-600">
                {formatPrice(size.price * quantity)}
              </span>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-1.5 rounded-lg font-bold text-sm transition-colors"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal - Renderizado fuera del componente principal para evitar propagación de eventos */}
      {selectedImage &&
        createPortal(
          <ImageModal
            isOpen={showImageModal}
            onClose={closeImageModal}
            imageUrl={selectedImage.url}
            alt={selectedImage.alt}
          />,
          document.body
        )}
    </div>
  );
};

export default PizzaModal;
