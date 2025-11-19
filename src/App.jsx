
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import MenuDetailPage from './pages/MenuDetailPage';
import ReservationsPage from './pages/ReservationsPage';
import ContactPage from './pages/ContactPage';
import OnlineOrderingPage from './pages/OnlineOrderingPage';
import { useCart } from './context/CartContext';
import WhatsAppButton from './components/WhatsAppButton';

const App = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeItem, checkout, addToCart } = useCart();
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: "-100vw" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100vw" }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Layout 
      cartItems={cart.items} 
      isCartOpen={isCartOpen} 
      onToggleCart={toggleCart} 
      onUpdateQuantity={updateQuantity} 
      onRemoveItem={removeItem} 
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div 
                initial="initial" 
                animate="in" 
                exit="out" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <HomePage onAddToCart={addToCart} />
              </motion.div>
            }
          />
          <Route 
            path="/menu" 
            element={
              <motion.div 
                initial="initial" 
                animate="in" 
                exit="out" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <MenuPage />
              </motion.div>
            }
          />
          <Route 
            path="/menu/:id" 
            element={
              <motion.div 
                initial="initial" 
                animate="in" 
                exit="out" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <MenuDetailPage />
              </motion.div>
            }
          />
          <Route 
            path="/reservations" 
            element={
              <motion.div 
                initial="initial" 
                animate="in" 
                exit="out" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <ReservationsPage />
              </motion.div>
            }
          />
          <Route 
            path="/contact" 
            element={
              <motion.div 
                initial="initial" 
                animate="in" 
                exit="out" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <ContactPage />
              </motion.div>
            }
          />
          <Route 
            path="/online-ordering" 
            element={
              <motion.div 
                initial="initial" 
                animate="in" 
                exit="out" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <OnlineOrderingPage 
                  cartItems={cart.items} 
                  onUpdateQuantity={updateQuantity} 
                  onRemoveItem={removeItem} 
                  onCheckout={checkout} 
                />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <WhatsAppButton />
    </Layout>
  );
};

export default App;
