
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CheckoutForm from '../components/CheckoutForm';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

const OnlineOrderingPage = () => {
  const { cart, updateQuantity, removeItem, checkout } = useCart();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async (deliveryDetails) => {
    try {
      const success = await checkout(deliveryDetails);
      if (success) {
        setIsOrderConfirmed(true);
        setError(null);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setError('There was an error placing your order. Please try again.');
    }
  };

  const totalPrice = cart.items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);

  return (
    <div className="bg-stone-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-800 text-center mb-10">Review Your Order</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side: Delivery Details */}
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">Delivery Information</h2>
              <CheckoutForm onCheckout={handleCheckout} />
            </div>

            {/* Right Side: Order Summary */}
            <div className="bg-stone-50 rounded-xl p-8 shadow-inner">
              <h2 className="text-3xl font-bold text-stone-800 mb-6">Your Items</h2>
              <div className="divide-y divide-stone-200">
                {cart.items.length > 0 ? (
                  cart.items.map(item => (
                    <CartItem 
                      key={item._id} 
                      item={item} 
                      onUpdateQuantity={updateQuantity} 
                      onRemoveItem={removeItem} 
                    />
                  ))
                ) : (
                  <p className="text-stone-500 py-4">Your cart is empty.</p>
                )}
              </div>
              <div className="mt-8 pt-6 border-t-2 border-dashed border-stone-300">
                <div className="flex justify-between items-center text-2xl font-bold text-stone-800">
                  <span>Total:</span>
                  <span className="text-amber-600">&#8358;{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {isOrderConfirmed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-lg mx-4"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2, type: 'spring'} }} className="text-green-500 text-8xl mb-6">
                <i className="bi bi-check-circle-fill"></i>
              </motion.div>
              <h2 className="text-4xl font-extrabold text-stone-800 mb-4">Order Confirmed!</h2>
              <p className="text-stone-600 text-lg mb-8">Thank you for your purchase. Your order is being prepared and will be delivered shortly.</p>
              <a href="/" className="bg-amber-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-amber-700 transition-transform transform hover:scale-105 shadow-lg">
                Back to Home
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnlineOrderingPage;
