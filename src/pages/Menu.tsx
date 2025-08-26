import React, { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import Header from "../components/Header";
import PizzaModal from "../components/PizzaModal";
import { products, categories, pizzaSizes } from "../data/menu";
import { CategoryKey, PizzaSize } from "../types";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

interface MenuProps {
  onNavigateHome: () => void;
}

const Menu: React.FC<MenuProps> = ({ onNavigateHome }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("pizzas");
  const [showPizzaModal, setShowPizzaModal] = useState(false);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<PizzaSize | null>(
    null
  );
  const { dispatch } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = (product: any, price: number) => {
    const cartItem = {
      id: Date.now().toString(),
      productId: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      category: product.category,
    };

    dispatch({ type: "ADD_ITEM", payload: cartItem });
    toast.success(`${product.name} agregado al carrito`);
  };

  const openPizzaModal = (size: PizzaSize) => {
    setSelectedPizzaSize(size);
    setShowPizzaModal(true);
  };

  const closePizzaModal = () => {
    setShowPizzaModal(false);
    setSelectedPizzaSize(null);
  };

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-950 mb-6">
            Nuestro Menú
          </h1>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {Object.entries(categories).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as CategoryKey)}
                className={`px-4 py-3 rounded-lg font-medium transition-all text-center ${
                  activeCategory === key
                    ? "bg-primary-500 text-dark-950 shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Pizza Sizes */}
        {activeCategory === "pizzas" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-950 mb-4">
              Tamaños de Pizza
            </h2>
            <p className="text-gray-600 mb-6">
              Selecciona el tamaño y luego elige tus sabores favoritos
            </p>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pizzaSizes.map((size) => (
                <div
                  key={size.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-dark-950 mb-2">
                      {size.name}
                    </h3>
                    <div className="text-gray-600 mb-4">
                      <p>{size.portions} porciones</p>
                      <p>Hasta {size.maxFlavors} sabores</p>
                    </div>
                    <div className="text-2xl font-bold text-primary-600 mb-4">
                      {formatPrice(size.price)}
                    </div>
                    <button
                      onClick={() => openPizzaModal(size)}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-1.5 px-3 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Elegir Sabores
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Products */}
        {activeCategory !== "pizzas" && (
          <div>
            <h2 className="text-2xl font-bold text-dark-950 mb-6">
              {categories[activeCategory]}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
                >
                  <div className="text-center flex flex-col flex-grow">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">
                        {activeCategory === "hamburguesas" && "🍔"}
                        {activeCategory === "picadas" && "🍖"}
                        {activeCategory === "perros" && "🌭"}
                        {activeCategory === "especiales" && "🍟"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-950 mb-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                      </p>
                    )}
                    <div className="text-xl font-bold text-primary-600 mb-3 mt-auto">
                      {formatPrice(product.price!)}
                    </div>
                    <button
                      onClick={() => addToCart(product, product.price!)}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-1.5 px-3 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && activeCategory !== "pizzas" && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay productos disponibles en esta categoría
            </p>
          </div>
        )}
      </div>

      {/* Pizza Modal */}
      {selectedPizzaSize && (
        <PizzaModal
          isOpen={showPizzaModal}
          onClose={closePizzaModal}
          size={selectedPizzaSize}
        />
      )}
    </div>
  );
};

export default Menu;
