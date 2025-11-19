
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onToggleCart, isOpen }) => {
  const totalPrice = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + ((item?.menuItem?.price ?? 0) * (item?.quantity ?? 0)), 0) : 0;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50" 
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            variants={backdropVariants} 
            onClick={onToggleCart}
          ></motion.div>
          <motion.div 
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col"
            variants={cartVariants}
          >
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-3xl font-bold text-stone-800">Your Cart</h2>
              <button onClick={onToggleCart} className="text-stone-500 hover:text-stone-800">
                <i className="bi bi-x-lg text-2xl"></i>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {cartItems === undefined ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-stone-500 text-xl mt-4">Loading cart...</p>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <i className="bi bi-cart-x text-8xl text-stone-300"></i>
                  <p className="text-stone-500 text-xl mt-4">Your cart is empty.</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-200">
                  {cartItems.map(item => (
                    <CartItem 
                      key={item._id} 
                      item={item} 
                      onUpdateQuantity={onUpdateQuantity} 
                      onRemoveItem={onRemoveItem} 
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-stone-200 bg-stone-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-stone-800">Total:</span>
                <span className="text-3xl font-bold text-amber-600">&#8358;{totalPrice.toFixed(2)}</span>
              </div>
              <Link to="/online-ordering" onClick={onToggleCart}>
                <button 
                  disabled={!cartItems || cartItems.length === 0}
                  className="w-full bg-amber-600 text-white py-4 px-4 rounded-xl text-lg font-bold hover:bg-amber-700 transition-colors duration-300 disabled:bg-stone-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;