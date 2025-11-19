
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { AnimatePresence, motion } from "framer-motion";

const Navbar = ({ cartItems, onToggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const totalItems = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = "relative text-lg tracking-wider";
  const activeLinkClasses = "text-amber-500";
  const inactiveLinkClasses = "text-gray-200 hover:text-amber-500 transition-colors duration-300";

  const NavItem = ({ to, children }) => (
    <motion.div className="relative" whileHover={{ scale: 1.1, y: -2 }}>
      <NavLink to={to} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
        {children}
      </NavLink>
      <motion.div 
        className="absolute bottom-[-5px] left-0 h-[3px] bg-amber-500 w-full" 
        initial={{ scaleX: 0 }} 
        whileHover={{ scaleX: 1 }} 
        transition={{ duration: 0.3 }} 
        style={{ transformOrigin: 'left' }} 
      />
    </motion.div>
  );

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${hasScrolled ? 'bg-black bg-opacity-70 backdrop-blur-lg shadow-xl' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-5">
          <NavLink to="/" className="text-amber-500 font-bold text-4xl tracking-widest">
            HYK
          </NavLink>
          <div className="hidden md:flex items-center space-x-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/menu">Menu</NavItem>
            <NavItem to="/reservations">Reservations</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            <NavItem to="/online-ordering">Online Ordering & Delivery</NavItem>
          </div>
          <div className="flex items-center">
            <button onClick={onToggleCart} className="text-white hover:text-amber-500 transition-colors relative mr-6">
              <i className="bi bi-cart-fill text-3xl"></i>
              {totalItems > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} text-3xl`}></i>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden flex flex-col items-center space-y-6 py-6 text-lg bg-black bg-opacity-80 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClasses : inactiveLinkClasses} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/menu" className={({ isActive }) => isActive ? activeLinkClasses : inactiveLinkClasses} onClick={() => setIsMenuOpen(false)}>Menu</NavLink>
              <NavLink to="/reservations" className={({ isActive }) => isActive ? activeLinkClasses : inactiveLinkClasses} onClick={() => setIsMenuOpen(false)}>Reservations</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? activeLinkClasses : inactiveLinkClasses} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
              <NavLink to="/online-ordering" className={({ isActive }) => isActive ? activeLinkClasses : inactiveLinkClasses} onClick={() => setIsMenuOpen(false)}>Online Ordering & Delivery</NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
