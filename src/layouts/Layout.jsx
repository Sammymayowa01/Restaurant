import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

const Layout = ({ children, cartItems, isCartOpen, onToggleCart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  return (
    <div style={{ backgroundImage: "url('/images/res bg.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
      <Navbar cartItems={cartItems} onToggleCart={onToggleCart} />
      <Cart 
        cartItems={cartItems} 
        isOpen={isCartOpen} 
        onToggleCart={onToggleCart} 
        onUpdateQuantity={onUpdateQuantity} 
        onRemoveItem={onRemoveItem} 
        onCheckout={onCheckout} 
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;