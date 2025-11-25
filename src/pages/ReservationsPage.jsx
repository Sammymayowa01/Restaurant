import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ReservationsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    time: '',
    notes: ''
  });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('https://restaurant-production-f0e2.up.railway.app/api/reservation', formData);
      setStatus('success');
      setFormData({
        name: '', email: '', phone: '', guests: '2', date: '', time: '', notes: ''
      });
    } catch (error) {
      console.error('Reservation submission error:', error);
      setStatus('error');
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
            Make a Reservation
          </motion.h1>
        </div>
      </motion.header>

      <main className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-stone-50 rounded-xl shadow-2xl p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2 text-center mb-6">
                    <h2 className="text-4xl font-bold text-stone-800">Book Your Table</h2>
                    <div className="w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
                </div>
                <div>
                  <label htmlFor="inputName" className="block text-gray-700 font-bold mb-2 text-lg">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500"><i className="bi bi-person-fill text-xl"></i></span>
                    <input type="text" id="inputName" name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="inputEmail" className="block text-gray-700 font-bold mb-2 text-lg">Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500"><i className="bi bi-envelope-fill text-xl"></i></span>
                    <input type="email" id="inputEmail" name="email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="inputPhone" className="block text-gray-700 font-bold mb-2 text-lg">Phone</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500"><i className="bi bi-telephone-fill text-xl"></i></span>
                    <input type="tel" id="inputPhone" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="inputGuests" className="block text-gray-700 font-bold mb-2 text-lg">Number of Guests</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500"><i className="bi bi-people-fill text-xl"></i></span>
                    <input type="number" id="inputGuests" name="guests" value={formData.guests} onChange={handleChange} min="1" className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="inputDate" className="block text-gray-700 font-bold mb-2 text-lg">Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500"><i className="bi bi-calendar-event-fill text-xl"></i></span>
                    <input type="date" id="inputDate" name="date" value={formData.date} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="inputTime" className="block text-gray-700 font-bold mb-2 text-lg">Time</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500"><i className="bi bi-clock-fill text-xl"></i></span>
                    <input type="time" id="inputTime" name="time" value={formData.time} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors" required />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="inputNotes" className="block text-gray-700 font-bold mb-2 text-lg">Special Requests (optional)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 top-0 flex items-center pl-4 pt-3 text-stone-500"><i className="bi bi-card-text text-xl"></i></span>
                    <textarea id="inputNotes" name="notes" value={formData.notes} onChange={handleChange} rows="4" className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"></textarea>
                  </div>
                </div>
                <div className="md:col-span-2 text-center mt-6">
                  <button type="submit" disabled={status === 'sending'} className="bg-amber-600 text-white py-4 px-10 rounded-lg text-xl font-semibold hover:bg-amber-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400">
                    {status === 'sending' ? 'Booking...' : 'Book Your Table'}
                  </button>
                </div>
                {status === 'success' && <p className="text-green-500 text-center md:col-span-2">Reservation successful!</p>}
                {status === 'error' && <p className="text-red-500 text-center md:col-span-2">Something went wrong. Please try again.</p>}
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ReservationsPage;
