import React from "react";
import { ShoppingCart, Menu as MenuIcon } from "lucide-react";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  showMenuButton = false,
}) => {
  const { dispatch, getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="bg-dark-950 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-primary-500">
              <img
                src="/logo.jpg"
                alt="Logo La Casa del Leñador"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">La casa</h1>
              <p className="text-sm text-gray-300">Del leñador</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showMenuButton && (
              <button
                onClick={onMenuClick}
                className="bg-primary-500 hover:bg-primary-600 text-dark-950 px-2 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Ver Menú
              </button>
            )}

            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 hover:bg-dark-800 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-dark-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
