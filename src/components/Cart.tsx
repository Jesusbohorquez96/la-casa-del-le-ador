import React, { useState } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Customer } from "../types";
import toast from "react-hot-toast";

const Cart: React.FC = () => {
  const { state, dispatch, getTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
    observations: "",
  });

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    toast.success("Producto eliminado del carrito");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const generateWhatsAppMessage = () => {
    let message = `🍕 *NUEVO PEDIDO - LA LEÑA*\n\n`;
    message += `👤 *Cliente:* ${customer.name}\n`;
    message += `📱 *Teléfono:* ${customer.phone}\n`;
    message += `📍 *Dirección:* ${customer.address}\n\n`;
    if (customer.observations && customer.observations.trim()) {
      message += `📝 *Observaciones:* ${customer.observations}\n\n`;
    }
    message += `🛍️ *DETALLE DEL PEDIDO:*\n`;

    state.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}`;
      if (item.size) message += ` (${item.size})`;
      if (item.flavors && item.flavors.length > 0) {
        message += ` - Sabores: ${item.flavors.join(", ")}`;
      }
      message += `\n   Cantidad: ${item.quantity} x ${formatPrice(
        item.price
      )} = ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    message += `💰 *TOTAL: ${formatPrice(getTotal())}*\n\n`;
    message += `¡Gracias por tu pedido! 🙏`;

    // Optimizar para compatibilidad con iOS y Android
    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const whatsappMessage = generateWhatsAppMessage();
    const whatsappNumber = "573222461238"; // Número actualizado

    // URLs para diferentes plataformas - wa.me funciona mejor para compatibilidad cross-platform
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Usar un enfoque más simple y compatible con iOS
    window.location.href = whatsappUrl;

    // Limpiar carrito y mostrar confirmación
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "SET_CUSTOMER", payload: customer });
      setShowCheckout(false);
      setCustomer({ name: "", phone: "", address: "", observations: "" });
      toast.success("¡Pedido enviado por WhatsApp!");
    }, 1000); // Pequeño retraso para asegurar que la redirección ocurra primero
  };

  if (!state.isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={() => dispatch({ type: "TOGGLE_CART" })}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && dispatch({ type: "TOGGLE_CART" })}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-lg sm:rounded-lg max-h-[90vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-lg font-bold flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4" />
            Tu Carrito ({state.items.length})
          </h2>
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="p-3 space-y-2">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-2">
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        {item.size && (
                          <p className="text-xs text-gray-600">
                            Tamaño: {item.size}
                          </p>
                        )}
                        {item.flavors && item.flavors.length > 0 && (
                          <p className="text-xs text-gray-600">
                            Sabores: {item.flavors.join(", ")}
                          </p>
                        )}
                        <p className="text-primary-600 font-bold text-xs">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full bg-primary-500 hover:bg-primary-600 text-dark-950 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base font-bold">Total:</span>
                  <span className="text-lg font-bold text-primary-600">
                    {formatPrice(getTotal())}
                  </span>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-2 rounded-lg font-bold text-base transition-colors"
                >
                  Finalizar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div
          className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={() => setShowCheckout(false)}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={(e) => e.key === "Escape" && setShowCheckout(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md p-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Datos de Entrega</h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="customer-name"
                  className="block text-xs font-medium mb-1"
                >
                  Nombre completo
                </label>
                <input
                  id="customer-name"
                  type="text"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent text-sm"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="customer-phone"
                  className="block text-xs font-medium mb-1"
                >
                  Teléfono
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent text-sm"
                  placeholder="322 246 1238"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="customer-address"
                  className="block text-xs font-medium mb-1"
                >
                  Dirección de entrega
                </label>
                <textarea
                  id="customer-address"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                  rows={2}
                  placeholder="Calle, carrera, número, barrio..."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="customer-observations"
                  className="block text-xs font-medium mb-1"
                >
                  Observaciones{" "}
                  <span className="text-gray-400">(opcional)</span>
                </label>
                <textarea
                  id="customer-observations"
                  value={customer.observations || ""}
                  onChange={(e) =>
                    setCustomer({ ...customer, observations: e.target.value })
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                  rows={2}
                  placeholder="Instrucciones especiales, alergias, preferencias..."
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="flex justify-between font-bold text-base">
                  <span>Total a pagar:</span>
                  <span className="text-primary-600">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-colors text-sm"
              >
                <span>📱</span>
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
