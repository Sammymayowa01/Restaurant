
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import OpeningHours from './OpeningHours';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-4 mt-5">
      <Newsletter />
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left mt-4">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2025 HIGH Y KITCHEN. All Rights Reserved.</p>
          <p>Erigo street ijebuode Ogunstate</p>
          <strong className="text-black-800">Email:</strong> <a href="mailto:info@highykitchen.com" className="text-amber-600 hover:underline">info@highykitchen.com</a>
        </div>
        <OpeningHours />
        <div className="flex items-center">
          <a
            href="https://www.instagram.com/your_instagram_handle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition-colors duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://wa.me/08056300046"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500 transition-colors duration-300 ml-4"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
        <div className="text-white">
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li><NavLink to="/menu" className="hover:text-amber-500 transition-colors duration-300">Menu</NavLink></li>
            <li><NavLink to="/reservations" className="hover:text-amber-500 transition-colors duration-300">Reservations</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-amber-500 transition-colors duration-300">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
