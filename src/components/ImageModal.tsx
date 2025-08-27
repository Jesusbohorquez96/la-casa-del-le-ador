import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt,
}) => {
  if (!isOpen) return null;

  // Esta función maneja el cierre del modal de imagen
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo cerrar si se hizo clic exactamente en el fondo (no en la imagen)
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  return (
    // Usamos z-index más alto para asegurar que esté por encima del modal principal
    <div
      className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-3xl w-full max-h-full flex items-center justify-center">
        {/* Botón de cierre en la esquina */}
        <button
          className="absolute top-0.5 right-0.5 bg-white rounded-full p-0.5 shadow-md z-10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* La imagen */}
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-[90vh] rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageModal;
