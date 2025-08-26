import React from "react";
import { MapPin } from "lucide-react";

interface MapComponentProps {
  googleMapsUrl: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ googleMapsUrl }) => {
  // URL para el iframe del mapa (versión embebida)
  const embeddedMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.2486964554098!2d-71.7483732!3d6.4517513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6ec78d2f320575%3A0x74a40a3a75753523!2sLA%20CASA%20DEL%20LE%C3%91ADOR%20(Foods%20pizza)!5e0!3m2!1ses!2sco!4v1693061525489!5m2!1ses!2sco";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xl">
      <div className="w-full h-64 md:h-80 relative">
        <iframe
          src={embeddedMapUrl}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de La Casa del Leñador"
        ></iframe>
      </div>
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-bold text-dark-950 mb-2">
          La Casa del Leñador
        </h3>
        <p className="text-gray-600 mb-4">Barrio Centro, Aragua de Barcelona</p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-primary-500 hover:bg-primary-600 text-dark-950 py-3 px-4 rounded-lg font-medium transition-all duration-200"
        >
          <MapPin className="w-5 h-5 mr-2" />
          Cómo llegar
        </a>
      </div>
    </div>
  );
};

export default MapComponent;
