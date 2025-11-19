
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MenuItem = ({ item, onAddToCart }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      variants={itemVariants} 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group border border-stone-200"
    >
      <div className="overflow-hidden relative">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-500"></div>
        <Link to={`/menu/${item._id}`} className="absolute top-4 right-4 bg-white text-stone-800 rounded-full px-4 py-2 text-sm font-semibold shadow-md hover:bg-amber-500 hover:text-white transition-colors">
          View Details
        </Link>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-stone-800">{item.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-extrabold text-amber-600">&#8358;{item.price.toFixed(2)}</p>
          <button 
            onClick={() => onAddToCart(item)}
            className="bg-amber-600 text-white rounded-full w-11 h-11 flex items-center justify-center transform hover:scale-110 transition-transform shadow-sm hover:shadow-md">
            <i className="bi bi-plus text-2xl"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;
