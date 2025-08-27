import React from "react";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";

interface HomeProps {
  onNavigateToMenu: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToMenu }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Header onMenuClick={onNavigateToMenu} showMenuButton />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 to-dark-800/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8 animate-bounce-in">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 overflow-hidden border-4 border-primary-500">
                <img
                  src="/logo.jpg"
                  alt="Logo La Casa del Leñador"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              La <span className="text-primary-500">Casa</span> del{" "}
              <span className="text-primary-500">Leñador</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
              Auténticas pizzas al horno de leña con el sabor tradicional que
              amas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
              <button
                onClick={onNavigateToMenu}
                className="bg-primary-500 hover:bg-primary-600 text-dark-950 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Ver Nuestro Menú
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-950 mb-4">
              La Tradición del{" "}
              <span className="text-primary-500">Horno de Leña</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              En La Leña, cada pizza es una obra maestra cocinada en nuestro
              auténtico horno de leña, que le da ese sabor ahumado único que no
              puedes encontrar en ningún otro lugar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl text-dark-950">🔥</span>
              </div>
              <h3 className="text-xl font-bold text-dark-950 mb-2">
                Horno de Leña
              </h3>
              <p className="text-gray-600">
                Cocción tradicional a altas temperaturas para el sabor auténtico
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl text-dark-950">🍅</span>
              </div>
              <h3 className="text-xl font-bold text-dark-950 mb-2">
                Ingredientes Frescos
              </h3>
              <p className="text-gray-600">
                Solo los mejores ingredientes seleccionados para nuestras
                recetas
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl text-dark-950">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-dark-950 mb-2">
                Entrega Rápida
              </h3>
              <p className="text-gray-600">
                Tu pizza favorita lista en tiempo récord, directa a tu puerta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-950 mb-4">
              Encuéntranos <span className="text-primary-500">Aquí</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Visítanos y disfruta de la mejor experiencia gastronómica en La
              Casa del Leñador
            </p>

            <div className="max-w-3xl mx-auto">
              <MapComponent googleMapsUrl="https://www.google.com/maps/place/LA+CASA+DEL+LE%C3%91ADOR+(Foods+pizza)/@6.4517513,-71.7483732,19z/data=!4m6!3m5!1s0x8e6ec78d2f320575:0x74a40a3a75753523!8m2!3d6.4517543!4d-71.7477307!16s%2Fg%2F11q4k4f34j" />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-dark-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Clock className="w-8 h-8 text-primary-500 mr-3" />
                <h3 className="text-2xl font-bold">Horarios</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Lunes a Jueves:</strong> 5:00 PM - 11:00 PM
                </p>
                <p>
                  <strong>Viernes a Domingo:</strong> 4:00 PM - 12:00 AM
                </p>
                <p className="text-primary-400 font-medium">
                  ¡Abierto todos los días!
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <MapPin className="w-8 h-8 text-primary-500 mr-3" />
                <h3 className="text-2xl font-bold">Ubicación</h3>
              </div>
              <div className="text-gray-300">
                <p>Calle 123 #45-67</p>
                <p>Barrio Centro, Medellín</p>
                <p className="text-primary-400 font-medium mt-2">
                  Servicio a domicilio disponible
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Phone className="w-8 h-8 text-primary-500 mr-3" />
                <h3 className="text-2xl font-bold">Contacto</h3>
              </div>
              <div className="text-gray-300">
                <p className="text-xl font-bold text-primary-400">
                  322 246 1238
                </p>
                <p>WhatsApp disponible</p>
                <p className="text-sm mt-2">Pedidos y reservas</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={`star-${index}`}
                  className="w-6 h-6 text-primary-500 fill-current"
                />
              ))}
            </div>
            <p className="text-lg text-gray-300">
              "La mejor pizza de la ciudad con el auténtico sabor del horno de
              leña"
            </p>
            <p className="text-primary-400 font-medium mt-2">
              - Nuestros clientes
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-dark-950 border-t border-dark-800 text-center py-4">
        <div className="text-gray-500 text-xs">
          <p>© 2025 La Leña. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ y mucha leña</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
