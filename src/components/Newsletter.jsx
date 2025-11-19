
import React, { useState } from 'react';
import axios from '../api/axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      const response = await axios.post('/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8">
      <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
      <p className="mb-4">Get the latest news, updates, and offers from High-Y Kitchen.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-2 rounded-l text-gray-900 flex-grow"
        />
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 p-2 rounded-r">
          Subscribe
        </button>
      </form>
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Newsletter;
