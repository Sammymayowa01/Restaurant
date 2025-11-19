
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../api/axios';
import { useCart } from '../context/CartContext';

const MenuDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await apiClient.get(`/menu/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching menu item:', error);
        setError('Failed to load menu item. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <p className="text-center py-20">Loading item...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  if (!item) {
    return <p className="text-center py-20">Item not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/menu" className="text-amber-600 hover:underline mb-4 inline-block">&larr; Back to Menu</Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <img src={item.image} alt={item.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-stone-800 mb-4">{item.name}</h1>
            <p className="text-stone-600 mb-4">{item.description}</p>
            <p className="text-3xl font-extrabold text-amber-600 mb-6">&#8358;{item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(item)}
              className="bg-amber-600 text-white py-3 px-8 rounded-lg text-lg font-bold hover:bg-amber-700 transition-colors duration-300 shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuDetailPage;
