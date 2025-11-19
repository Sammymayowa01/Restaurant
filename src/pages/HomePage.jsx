
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import apiClient from '../api/axios';

const HomePage = ({ onAddToCart }) => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await apiClient.get('/menu');
        // Select a few items to feature, e.g., the first 3
        setFeatured(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };
    fetchFeatured();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div>
      <motion.header 
        className="h-[90vh] bg-cover bg-center text-white text-center flex flex-col justify-center items-center relative overflow-hidden" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/res bg.jpg')" }}
          initial={{ scale: 1.1, x: 0, y: 0 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        <div className="container mx-auto px-4 z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-white tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            HIGH Y KITCHEN
          </motion.h1>
          <motion.p 
            className="text-lg md:text-2xl my-6 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Experience the art of flavor, where every dish tells a story.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Link to="/reservations" className="bg-amber-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-amber-700 transition-transform transform hover:scale-105 shadow-lg">Make a Reservation</Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="bg-white">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-stone-800">Featured Dishes</h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-3 gap-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {featured.map(item => (
                <motion.div key={item.id} variants={itemVariants} className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col group">
                  <div className="overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h5 className="text-2xl font-bold text-stone-800">{item.name}</h5>
                    <p className="text-gray-600 my-3 flex-grow">{item.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-bold text-amber-600 text-2xl">&#8358;{item.price.toFixed(2)}</p>
                      <button onClick={() => onAddToCart(item)} className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center transform hover:scale-110 transition-transform"><i className="bi bi-plus-lg text-xl"></i></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-stone-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">Our Story</h2>
                <div className="w-24 h-1 bg-amber-600 mb-6"></div>
                <p className="text-gray-700 text-lg mb-4">HIGH Y KITCHEN is from a passion for authentic, high-quality cuisine. Our founder envisioned a place where people could enjoy exquisite food in a warm and inviting atmosphere.</p>
                <p className="text-gray-700 text-lg">We believe in using only the freshest, locally-sourced ingredients to create dishes that are both innovative and timeless. Come and join us for an unforgettable dining experience.</p>
              </motion.div>
              <motion.div
                className="h-80 rounded-xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                 <img src="/images/jollof rice and plantain.jpg" alt="Restaurant Interior" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-stone-800">What Our Guests Say</h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-3 gap-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={itemVariants} className="bg-stone-50 rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600 italic text-lg">"The food was absolutely wonderful, from preparation to presentation, very pleasing."</p>
                <footer className="mt-6 font-bold text-stone-700">- Racheal</footer>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-stone-50 rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600 italic text-lg">"This is my absolute favorite restaurant. The food is always fantastic and no matter what I order I am always delighted with my meal!"</p>
                <footer className="mt-6 font-bold text-stone-700">- Jane Smith</footer>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-stone-50 rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600 italic text-lg">"The ambiance is very charming and the service was impeccable. Will definitely be back!"</p>
                <footer className="mt-6 font-bold text-stone-700">- Peter Jones</footer>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
