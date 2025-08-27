import React, { useState } from "react";
import { ArrowLeft, Plus, Image as ImageIcon } from "lucide-react";
import Header from "../components/Header";
import PizzaModal from "../components/PizzaModal";
import ImageModal from "../components/ImageModal";
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

  const openImageModal = (imageUrl: string | undefined, alt: string) => {
    if (imageUrl) {
      setSelectedImage({ url: imageUrl, alt });
      setShowImageModal(true);
    }
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        {/* Categories */}
        <div className="mb-3">
          <h1 className="text-lg font-bold text-dark-950 mb-2">Nuestro Menú</h1>
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {Object.entries(categories).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as CategoryKey)}
                className={`px-3 py-2 rounded-lg font-medium transition-all text-center ${
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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-dark-950 mb-2">
              Tamaños de Pizza
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Selecciona el tamaño y luego elige tus sabores favoritos
            </p>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pizzaSizes.map((size) => (
                <div
                  key={size.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-3"
                >
                  <div className="text-center">
                    <h3 className="text-base font-bold text-dark-950 mb-1">
                      {size.name}
                    </h3>
                    <div className="text-gray-600 text-xs mb-2">
                      <p>{size.portions} porciones</p>
                      <p>Hasta {size.maxFlavors} sabores</p>
                    </div>
                    <div className="text-lg font-bold text-primary-600 mb-2">
                      {formatPrice(size.price)}
                    </div>
                    <button
                      onClick={() => openPizzaModal(size)}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-1 px-2 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors text-xs"
                    >
                      <Plus className="w-3 h-3" />
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
            <h2 className="text-base font-bold text-dark-950 mb-2">
              {categories[activeCategory]}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 auto-rows-fr">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-2 flex flex-col"
                >
                  <div className="text-center flex flex-col flex-grow">
                    {product.imageUrl ? (
                      <div
                        className="w-full h-24 mb-1.5 overflow-hidden rounded-lg cursor-pointer"
                        onClick={() =>
                          openImageModal(product.imageUrl, product.name)
                        }
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-1.5">
                        <span className="text-sm">
                          {activeCategory === "hamburguesas" && "🍔"}
                          {activeCategory === "picadas" && "🍖"}
                          {activeCategory === "perros" && "🌭"}
                          {activeCategory === "especiales" && "🍟"}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xs font-bold text-dark-950 mb-0.5">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-[10px] text-gray-600 mb-1 leading-tight">
                        {product.description}
                      </p>
                    )}
                    <div className="text-xs font-bold text-primary-600 mb-1 mt-auto">
                      {formatPrice(product.price!)}
                    </div>
                    <button
                      onClick={() => addToCart(product, product.price!)}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-1 px-1 rounded-md font-medium flex items-center justify-center gap-0.5 transition-colors text-[10px]"
                    >
                      <Plus className="w-2 h-2" />
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

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={showImageModal}
          onClose={closeImageModal}
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
        />
      )}
    </div>
  );
};

export default Menu;
