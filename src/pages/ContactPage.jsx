import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' }); // '', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'sending', message: '' });
    try {
      const response = await axios.post('https://restaurant-production-f0e2.up.railway.app/api/contact', formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      console.error('Contact form submission error:', error);
    }
  };

  return (
    <div className="bg-white">
      <motion.header 
        className="h-[50vh] bg-cover bg-center text-white text-center flex flex-col justify-center items-center relative"
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/res bg.jpg')" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-white tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Contact Us
          </motion.h1>
        </div>
      </motion.header>

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div 
              className="bg-stone-50 rounded-xl shadow-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-stone-800 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2 text-lg">Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-lg">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                </div>
                <div className="mb-5">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2 text-lg">Message</label>
                  <textarea id="message" rows="5" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required></textarea>
                </div>
                <button type="submit" disabled={status.type === 'sending'} className="bg-amber-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400">
                  {status.type === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {status.message && (
                  <p className={`mt-4 text-lg ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-stone-50 rounded-xl shadow-2xl p-8 mb-8">
                <h2 className="text-4xl font-bold text-stone-800 mb-6">Our Location</h2>
                <address className="not-italic text-lg text-gray-700">
                  <strong className="text-stone-800 text-xl">HIGH Y KITCHEN</strong><br />
                  Erigo street ijebuode Ogun-state<br /><br />
                  <strong className="text-stone-800">Phone:</strong> 08088705420, 08056300046<br />
                  <strong className="text-stone-800">Email:</strong> <a href="mailto:info@highykitchen.com" className="text-amber-600 hover:underline">info@highykitchen.com</a>
                </address>
              </div>
              <div className="rounded-xl shadow-2xl overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086418232236!2d-122.4194154846813!3d37.77492957975815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d6c93a65%3A0x49d38f2c9a357a4!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1616000000000!5m2!1sen!2sus" width="100%" height="350" style={{ border:0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;