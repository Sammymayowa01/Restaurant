
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api/axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await apiClient.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (itemToAdd) => {
    try {
      await apiClient.post('/cart', {
        menuItem: itemToAdd,
        quantity: 1
      });
      await fetchCart(); // Re-fetch the cart
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    try {
      await apiClient.put(`/cart/${itemId}`, { quantity: newQuantity });
      await fetchCart(); // Re-fetch the cart
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await apiClient.delete(`/cart/${itemId}`);
      await fetchCart(); // Re-fetch the cart
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const checkout = async (deliveryDetails) => {
    try {
      const orderPayload = {
        customer: deliveryDetails,
        items: cart.items,
        total: cart.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
      };
      await apiClient.post('/order', orderPayload);
      await fetchCart(); // Re-fetch the cart, which should be empty now
      return true;
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      isCartOpen, 
      toggleCart, 
      addToCart, 
      updateQuantity, 
      removeItem, 
      checkout 
    }}>
      {children}
    </CartContext.Provider>
  );
};
