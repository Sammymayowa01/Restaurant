
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '2348056300046';
  const message = encodeURIComponent("Hello! I’d like to place an order.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={30} />
      <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Chat on WhatsApp
      </div>
    </a>
  );
};

export default WhatsAppButton;
