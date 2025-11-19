
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../api/axios';
import MenuItem from '../components/MenuItem';
import { useCart } from '../context/CartContext';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await apiClient.get('/menu');
        console.log(response.data);
        setMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-stone-800">Our Menu</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
        </motion.div>
        
        {loading && <p className="text-center">Loading menu...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && Array.isArray(menu) && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {menu.map(item => (
              <MenuItem key={item._id} item={item} onAddToCart={addToCart} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;




