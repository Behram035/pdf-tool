import { useState, useEffect } from "react";

const Modal = ({ isOpen, title, message, onClose, type = "info" }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 w-full max-w-md animate-in fade-in zoom-in duration-200">
        {/* Gradient Top Border */}
        <div className="bg-linear-to-r from-purple-600 to-pink-600 h-2"></div>

        <div className="p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
